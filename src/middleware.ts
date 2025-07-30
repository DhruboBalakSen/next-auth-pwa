// middleware.ts
import { auth } from "@/auth"; // Adjust if needed
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/home",
    "/blogs",
    "/trips",
  ];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !session?.user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|register|forgot-password|about|api/public|favicon.ico|_next|images|icons|manifest).*)",
  ],
};
