// src/app/api/auth/route.js

import { NextResponse } from 'next/server';

const CLIENT_ID = 'b56b761c06c840a89acb1cc2a7fea400';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback'; // Replace with your redirect URI

export async function GET() {
  const scope = 'user-read-private user-read-email'; // Add other scopes as needed
  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  return NextResponse.redirect(url);
}
