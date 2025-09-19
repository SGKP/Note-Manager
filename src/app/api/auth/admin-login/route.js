import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if it's the default admin credentials
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const ADMIN_NAME = process.env.ADMIN_NAME;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create or find admin user
      let adminUser = await User.findOne({ email: ADMIN_EMAIL });
      
      if (!adminUser) {
        // Create admin user if doesn't exist
        const hashedPassword = await bcryptjs.hash(ADMIN_PASSWORD, 12);
        adminUser = new User({
          name: ADMIN_NAME,
          email: ADMIN_EMAIL,
          password: hashedPassword,
          role: 'admin',
        });
        await adminUser.save();
      }

      // Generate JWT token
      const token = generateToken({
        userId: adminUser._id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      });

      const { password: _, ...userWithoutPassword } = adminUser.toObject();

      return NextResponse.json({
        message: 'Admin login successful',
        user: userWithoutPassword,
        token,
      }, { status: 200 });
    }

    // Check for regular admin users in database
    const user = await User.findOne({ email, role: 'admin' });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({
      message: 'Admin login successful',
      user: userWithoutPassword,
      token,
    }, { status: 200 });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}