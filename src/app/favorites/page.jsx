"use client";
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            console.log('Loaded favorites:', favorites);

            try {
                const movieDetails = await Promise.all(
                    favorites.map(async (fav) => {
                        const response = await fetch(`/api/movies?id=${fav.id}`);
                        if (!response.ok) {
                            throw new Error('Failed to fetch movie details');
                        }
                        const movie = await response.json();
                        return {
                            ...fav,
                            title: movie.title,
                            poster_path: movie.poster_path
                        };
                    })
                );
                setMovies(movieDetails);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    const handleRemoveFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        setMovies(updatedFavorites.filter(fav => fav.id !== id));
    };

    if (loading) return <p className="text-center text-gray-700">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <header className="bg-black text-white p-6 shadow-md mb-8">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-4xl font-bold">My Favorites</h1>
                    <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </header>
            <main className="container mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
                {movies.length === 0 ? (
                    <p className="text-center text-gray-300 text-lg">No favorites yet.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {movies.map(movie => (
                            <div key={movie.id} className="relative group rounded-lg overflow-hidden bg-gray-700">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-60 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity p-4">
                                    <h3 className="text-lg font-semibold text-white">{movie.title || 'No title'}</h3>
                                    <button
                                        onClick={() => handleRemoveFromFavorites(movie.id)}
                                        className="mt-2 text-red-500 hover:text-red-400 flex items-center"
                                    >
                                        <FaTrash className="mr-2" />
                                        Remove
                                    </button>
                                    <Link
                                        href={`/movies/${movie.id}`}
                                        className="mt-2 inline-block text-blue-400 hover:text-blue-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <footer className="bg-black text-white p-4 mt-8">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Movie App</p>
                </div>
            </footer>
        </div>
    );
};

export default FavoritesPage;
