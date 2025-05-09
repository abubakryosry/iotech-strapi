import { NextRequest, NextResponse } from "next/server";

// Default language
const DEFAULT_LANGUAGE = "en";

export function middleware(request: NextRequest) {
  // Get the pathname from the request URL
  const { pathname } = request.nextUrl;

  // Check if the pathname is the root path "/"
  if (pathname === "/") {
    // Construct the new URL with the default language
    const newUrl = new URL(`/${DEFAULT_LANGUAGE}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}
