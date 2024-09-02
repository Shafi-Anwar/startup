// app/api/songs/route.js

import { NextResponse } from 'next/server';
import { searchSongs } from '../../../lib/spotify';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const searchResults = await searchSongs(query);

    if (!searchResults || !searchResults.tracks || !Array.isArray(searchResults.tracks.items)) {
      return NextResponse.json({ error: 'No results found or unexpected format' }, { status: 404 });
    }

    const songs = searchResults.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      album: track.album ? track.album.name : 'Unknown Album',
      artists: track.artists ? track.artists.map(artist => artist.name).join(', ') : 'Unknown Artist',
    }));

    return NextResponse.json(songs);
  } catch (error) {
    console.error('Error handling request:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
