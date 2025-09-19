import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';
import { withAuth } from '@/lib/middleware';

// GET single note
async function handleGET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    const note = await Note.findOne({ 
      _id: id, 
      userId: request.user._id 
    });

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ note }, { status: 200 });

  } catch (error) {
    console.error('Get note error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

// PUT update note
async function handlePUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
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

    const note = await Note.findOneAndUpdate(
      { _id: id, userId: request.user._id },
      { 
        title: title.trim(), 
        description: description.trim(),
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Note updated successfully',
      note,
    }, { status: 200 });

  } catch (error) {
    console.error('Update note error:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

// DELETE note
async function handleDELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    const note = await Note.findOneAndDelete({ 
      _id: id, 
      userId: request.user._id 
    });

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Note deleted successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Delete note error:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}

export async function GET(request, context) {
  return withAuth(request, (req) => handleGET(req, context));
}

export async function PUT(request, context) {
  return withAuth(request, (req) => handlePUT(req, context));
}

export async function DELETE(request, context) {
  return withAuth(request, (req) => handleDELETE(req, context));
}