import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export default function middleware(req) {
  // Check if the runtime environment supports Clerk or not
  if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_RUNTIME !== 'edge') {
    return clerkMiddleware()(req);
  }

  // For environments that don't support Clerk
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
