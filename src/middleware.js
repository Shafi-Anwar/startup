import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Apply Clerk middleware only if in a supported environment
const middleware = process.env.NEXT_PUBLIC_RUNTIME === 'edge' 
  ? (req) => NextResponse.next() 
  : clerkMiddleware();

export default function middleware(req) {
  return middleware(req);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
