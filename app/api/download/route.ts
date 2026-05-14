import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  const filename = req.nextUrl.searchParams.get('filename') ?? 'download';

  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 });
  }

  const response = await fetch(url);
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: response.status });
  }

  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get('content-type') ?? 'application/octet-stream';

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
