import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';
import { withAdminAuth } from '@/lib/adminMiddleware';

// DELETE any note (admin only)
async function handleDELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    const note = await Note.findById(id).populate('userId', 'name email');
    
    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    await Note.findByIdAndDelete(id);

    return NextResponse.json({
      message: `Note "${note.title}" by ${note.userId.name} has been deleted successfully`,
    }, { status: 200 });

  } catch (error) {
    console.error('Admin delete note error:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  return withAdminAuth(request, (req) => handleDELETE(req, context));
}