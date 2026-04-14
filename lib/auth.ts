import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export interface AdminSession {
  authenticated: boolean;
  expiresAt: number;
}

// Simple in-memory session storage (in production, use Redis or database)
const sessions = new Map<string, AdminSession>();

export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function createAdminSession(): string {
  if (!ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD is not defined');
  }

  const token = generateSessionToken();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  sessions.set(token, {
    authenticated: true,
    expiresAt,
  });

  return token;
}

export function validateAdminSession(token: string | undefined): boolean {
  if (!token) return false;

  const session = sessions.get(token);
  if (!session) return false;

  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return false;
  }

  return session.authenticated;
}

export function verifyAdminPassword(password: string): boolean {
  if (!ADMIN_PASSWORD) return false;
  return password === ADMIN_PASSWORD;
}

export function getAdminSessionFromRequest(request: NextRequest): string | undefined {
  const cookies = request.cookies;
  return cookies.get('admin_session')?.value;
}

export function clearAdminSession(token: string): void {
  sessions.delete(token);
}
