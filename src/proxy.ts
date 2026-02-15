// middleware.ts (at the root or /src)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const authHeader = request.headers.get('x-telegram-bot-api-secret-token');
  
  // High-leverage security check at the Edge
  if (request.nextUrl.pathname.startsWith('/api/webhook')) {
    if (authHeader !== process.env.TELEGRAM_SECRET_TOKEN) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};