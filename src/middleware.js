import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export default function middleware(req) {
  // Check if the environment supports Clerk middleware
  const isEdge = process.env.NEXT_PUBLIC_RUNTIME === 'edge';
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction && isEdge) {
    // Return NextResponse if running in Edge runtime
    return NextResponse.next();
  }

  // Use Clerk middleware if not in an Edge environment or not in production
  return clerkMiddleware()(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
