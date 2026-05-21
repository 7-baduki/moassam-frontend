import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.nextUrl.searchParams.get('accessToken');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const response = NextResponse.redirect(new URL('/', req.url));

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  response.cookies.set('isLoggedIn', 'true', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
