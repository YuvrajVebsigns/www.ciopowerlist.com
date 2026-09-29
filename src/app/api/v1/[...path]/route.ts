import { NextRequest, NextResponse } from 'next/server';

// const BACKEND_API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://ciopowerlist.com').replace(
//   /\/$/,
//   '',
// );

const BACKEND_API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

function buildUpstreamUrl(request: NextRequest) {
  const requestUrl = new URL(request.url);
  return `${BACKEND_API_BASE}${requestUrl.pathname}${requestUrl.search}`;
}

async function proxyRequest(request: NextRequest) {
  if (!BACKEND_API_BASE) {
    return NextResponse.json(
      { message: 'NEXT_PUBLIC_API_URL is not configured for the API proxy.' },
      { status: 500 },
    );
  }

  const upstreamUrl = buildUpstreamUrl(request);
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('connection');
  headers.delete('content-length');

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: 'manual',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.arrayBuffer();
  }

  const response = await fetch(upstreamUrl, init);
  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete('content-encoding');
  responseHeaders.delete('content-length');
  responseHeaders.delete('transfer-encoding');

  return new NextResponse(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
