import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { accessToken } = await req.json();

  if (!accessToken || typeof accessToken !== 'string') {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
