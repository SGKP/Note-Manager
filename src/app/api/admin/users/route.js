import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { withAdminAuth } from '@/lib/adminMiddleware';

// GET all users (admin only)
async function handleGET(request) {
  try {
    await connectDB();
    
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      users,
      count: users.length,
    }, { status: 200 });

  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return withAdminAuth(request, handleGET);
}