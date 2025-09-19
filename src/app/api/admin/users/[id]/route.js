import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Note from '@/models/Note';
import { withAdminAuth } from '@/lib/adminMiddleware';

// DELETE user and all their notes (admin only)
async function handleDELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    // Don't allow admin to delete themselves
    if (id === request.user._id.toString()) {
      return NextResponse.json(
        { error: 'Cannot delete your own admin account' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete all notes by this user
    await Note.deleteMany({ userId: id });
    
    // Delete the user
    await User.findByIdAndDelete(id);

    return NextResponse.json({
      message: `User ${user.name} and all their notes have been deleted successfully`,
    }, { status: 200 });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  return withAdminAuth(request, (req) => handleDELETE(req, context));
}