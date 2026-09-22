import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_TOKEN_KEY = "accessToken";

const protectedPrefixes = [
  "/dashboard",
  "/repositories",
  "/ai-reviews",
  "/pull-requests",
  "/issues",
  "/analytics",
  "/settings",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ACCESS_TOKEN_KEY)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/repositories",
    "/repositories/:path*",
    "/ai-reviews",
    "/ai-reviews/:path*",
    "/pull-requests",
    "/pull-requests/:path*",
    "/issues",
    "/issues/:path*",
    "/analytics",
    "/analytics/:path*",
    "/settings",
    "/settings/:path*",
  ],
};
