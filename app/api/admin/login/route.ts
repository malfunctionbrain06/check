import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, createAdminSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Password is required',
        },
        { status: 400 }
      );
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid password',
        },
        { status: 401 }
      );
    }

    const token = createAdminSession();

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie with session token
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Login failed',
      },
      { status: 500 }
    );
  }
}
