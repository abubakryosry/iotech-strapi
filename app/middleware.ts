import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!/^\/(en|ar)\//.test(pathname)) {
    const url = new URL(`/en${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    
    "/((?!api|_next|favicon.ico|assets).*)",
  ],
};
