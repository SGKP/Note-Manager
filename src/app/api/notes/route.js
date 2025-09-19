import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';
import { withAuth } from '@/lib/middleware';

// GET all notes for authenticated user
async function handleGET(request) {
  try {
    await connectDB();
    
    const notes = await Note.find({ userId: request.user._id })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      notes,
      count: notes.length,
    }, { status: 200 });

  } catch (error) {
    console.error('Get notes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

// POST create new note
async function handlePOST(request) {
  try {
    await connectDB();
    
    const { title, description } = await request.json();

    // Validation
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    if (title.length > 100) {
      return NextResponse.json(
        { error: 'Title cannot be more than 100 characters' },
        { status: 400 }
      );
    }

    const note = new Note({
      title: title.trim(),
      description: description.trim(),
      userId: request.user._id,
    });

    await note.save();

    return NextResponse.json({
      message: 'Note created successfully',
      note,
    }, { status: 201 });

  } catch (error) {
    console.error('Create note error:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return withAuth(request, handleGET);
}

export async function POST(request) {
  return withAuth(request, handlePOST);
}