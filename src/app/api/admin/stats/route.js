import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Note from '@/models/Note';
import { withAdminAuth } from '@/lib/adminMiddleware';

// GET admin dashboard statistics
async function handleGET(request) {
  try {
    await connectDB();
    
    // Debug: Let's see all users in the database
    const allUsers = await User.find({}).select('email name role');
    console.log('All users in database:', allUsers);
    
    // Count users with explicit role 'user' OR users without admin role (fallback for old users)
    const totalUsers = await User.countDocuments({ 
      $or: [
        { role: 'user' },
        { role: { $exists: false } },
        { role: null }
      ]
    });
    
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalNotes = await Note.countDocuments();
    
    console.log('User counts - Total Users:', totalUsers, 'Total Admins:', totalAdmins, 'Total Notes:', totalNotes);
    
    // Get recent users (last 7 days) - include users without role field
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentUsers = await User.countDocuments({ 
      $or: [
        { role: 'user' },
        { role: { $exists: false } },
        { role: null }
      ],
      createdAt: { $gte: sevenDaysAgo } 
    });
    
    // Get recent notes (last 7 days)
    const recentNotes = await Note.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });

    // Get most active users (users with most notes)
    const topUsers = await Note.aggregate([
      {
        $group: {
          _id: '$userId',
          noteCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          name: '$user.name',
          email: '$user.email',
          noteCount: 1
        }
      },
      {
        $sort: { noteCount: -1 }
      },
      {
        $limit: 5
      }
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalAdmins,
        totalNotes,
        recentUsers,
        recentNotes,
        topUsers,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('Get admin stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return withAdminAuth(request, handleGET);
}