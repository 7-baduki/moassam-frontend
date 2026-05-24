import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const fetchSite = req.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin') {
    return NextResponse.json({ accessToken: null }, { status: 403 });
  }

  const accessToken = (await cookies()).get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse.json({ accessToken: null }, { status: 401 });
  }

  return NextResponse.json({ accessToken });
}
