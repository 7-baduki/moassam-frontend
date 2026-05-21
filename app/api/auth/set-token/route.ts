import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.headers.get('origin') !== req.nextUrl.origin) {
    return NextResponse.json({ success: false }, { status: 403 });
  }

  let accessToken: unknown;
  try {
    ({ accessToken } = await req.json());
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

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
