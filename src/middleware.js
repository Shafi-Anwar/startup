import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Function to return Clerk middleware or default response based on environment
export default function middleware(req) {
  // In Edge environments, skip Clerk middleware
  if (process.env.NEXT_PUBLIC_RUNTIME === 'edge') {
    return NextResponse.next();
  }

  // In other environments, use Clerk middleware
  return clerkMiddleware()(req);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
