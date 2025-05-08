import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Redirect to default locale if no locale is present
    if (!pathname.startsWith('/en') && !pathname.startsWith('/ar')) {
        return NextResponse.redirect(new URL('/en' + pathname, request.url));
    }
    return NextResponse.next();
}
