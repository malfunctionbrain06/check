import { NextRequest, NextResponse } from 'next/server';
import { clearAdminSession, getAdminSessionFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = getAdminSessionFromRequest(request);

    if (token) {
      clearAdminSession(token);
    }

    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout successful',
      },
      { status: 200 }
    );

    // Clear the session cookie
    response.cookies.delete('admin_session');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Logout failed',
      },
      { status: 500 }
    );
  }
}
