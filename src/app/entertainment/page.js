"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Entertainment = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/movies?category=popular');
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setMovies(data.results || []);
        } catch (error) {
            setError('Error fetching movies');
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white">
                        Entertainment
                    </h1>
                    <div className="flex space-x-4">
                        <Link href="/favorites" className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-500 transition-colors">
                            Favorite Media
                        </Link>
                        <Link href="/songs" className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 transition-colors">
                            Songs
                        </Link>
                    </div>
                </header>
                <section className="mt-6">
                    <h2 className="text-2xl font-semibold text-white">Movies</h2>
                    {loading && <p className="text-white">Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {movies.map(movie => (
                            <div key={movie.id} className="relative group">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-auto rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="text-center text-white p-4">
                                        <h3 className="text-lg font-semibold">{movie.title}</h3>
                                        <p>{movie.release_date || 'No release date'}</p>
                                        <Link
                                            href={`/movies/${movie.id}`}
                                            className="mt-2 inline-block bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-500 transition-colors"
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Entertainment;
