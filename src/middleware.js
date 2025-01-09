import { NextResponse } from "next/server";

export function middleware(req) {
  // Get the token from cookies
  const token = req.cookies.get("token")?.value;

  // Define protected routes
  const protectedRoutes = ["/", "/notes"]; // Add your protected routes

  // If the user is trying to access a protected route
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    // If the user is not logged in (no token), redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If the user is already logged in and trying to access the login page, redirect them to the home page
  if (req.nextUrl.pathname === ("/login", "/register") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}
