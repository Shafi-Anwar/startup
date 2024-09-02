import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get('id'); // Fetch movie details by ID
    const category = searchParams.get('category'); // Fetch a list of movies by category
    const API_KEY = process.env.TMDB_API_KEY;

    if (movieId) {
        // Fetch details for a single movie
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return NextResponse.json(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return NextResponse.error(); // Optionally handle errors here
        }
    } else if (category) {
        // Fetch a list of movies
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return NextResponse.json(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            return NextResponse.error(); // Optionally handle errors here
        }
    } else {
        return NextResponse.json({ error: 'Category or ID is required' });
    }
}
