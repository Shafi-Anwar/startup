import { NextResponse } from 'next/server';

async function refreshAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
    })
  });

  const data = await response.json();

  if (response.ok) {
    return data.access_token;
  } else {
    throw new Error(`Failed to refresh token: ${data.error}`);
  }
}

async function fetchSong(songId) {
  try {
    let accessToken = await refreshAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.status === 401) {
      // Token expired, refresh it
      accessToken = await refreshAccessToken();
      const retryResponse = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!retryResponse.ok) {
        throw new Error(`Failed to fetch song: ${retryResponse.statusText}`);
      }

      return await retryResponse.json();
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch song: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching song:', error);
    throw error;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const songId = searchParams.get('songId');

  if (!songId) {
    return NextResponse.json({ error: 'Song ID is required' }, { status: 400 });
  }

  try {
    const songData = await fetchSong(songId);
    return NextResponse.json(songData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
