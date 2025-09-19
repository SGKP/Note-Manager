import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';
import User from '@/models/User';
import { withAdminAuth } from '@/lib/adminMiddleware';

// GET all notes from all users (admin only)
async function handleGET(request) {
  try {
    await connectDB();
    
    const notes = await Note.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      notes,
      count: notes.length,
    }, { status: 200 });

  } catch (error) {
    console.error('Get all notes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return withAdminAuth(request, handleGET);
}