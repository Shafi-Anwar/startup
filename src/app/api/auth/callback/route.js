// src/app/api/auth/callback/route.js

import axios from 'axios';
import { NextResponse } from 'next/server';

const CLIENT_ID = 'b56b761c06c840a89acb1cc2a7fea400';
const CLIENT_SECRET = '432897501dc1457c87eff36971a91b08';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback'; // Same as above

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No authorization code found' }, { status: 400 });
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }), {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Store the new refresh token and access token (e.g., in a database or session)
    const { access_token, refresh_token, expires_in } = response.data;
    // Save refresh_token to a secure location
    // Save access_token and token expiration (for your app's session or database)

    return NextResponse.json({ message: 'Authentication successful' });
  } catch (error) {
    console.error('Error handling authorization code:', error.message);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
