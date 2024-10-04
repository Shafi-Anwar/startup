import { NextResponse } from 'next/server';
import { searchSongs } from '../../../lib/spotify';

export async function GET(request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    // Check if the query parameter is provided
    if (!query) {
        return NextResponse.json(
            { error: 'Query parameter is required' },
            { status: 400 }
        );
    }

    try {
        // Call the function to search for songs
        const searchResults = await searchSongs(query);

        // Validate the format of the search results
        if (!searchResults || !searchResults.tracks || !Array.isArray(searchResults.tracks.items)) {
            return NextResponse.json(
                { error: 'No results found or unexpected format' },
                { status: 404 }
            );
        }

        // Map through the results to extract necessary fields
        const songs = searchResults.tracks.items.map(track => ({
            id: track.id || 'Unknown ID',
            name: track.name || 'Unknown Name',
            album: track.album?.name || 'Unknown Album',
            artists: track.artists ? track.artists.map(artist => artist.name).join(', ') : 'Unknown Artist',
        }));

        // Return the formatted song data
        return NextResponse.json(songs);
    } catch (error) {
        console.error('Error handling request:', error.message);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
