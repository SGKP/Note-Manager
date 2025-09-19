import { NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function withAdminAuth(request, handler) {
  try {
    await connectDB();
    
    const token = getTokenFromRequest(request);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Verify user still exists and is admin
    const user = await User.findById(decoded.userId).select('-password');
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Add user to request object for use in handler
    request.user = user;
    
    return await handler(request);
    
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}