"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchMovieDetails = async () => {
                try {
                    const response = await fetch(`/api/movies?id=${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch movie details');
                    }
                    const data = await response.json();
                    setMovie(data);
                    checkIfFavorite(data.id);
                } catch (error) {
                    console.error('Error fetching movie details:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchMovieDetails();
        }
    }, [id]);

    const checkIfFavorite = (movieId) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(fav => fav.id === movieId));
    };

    const handleToggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorite) {
            const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            const updatedFavorites = [...favorites, { id: movie.id, title: movie.title, poster_path: movie.poster_path }];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(true);
        }
    };

    if (loading) return <p className="text-center text-gray-700">Loading...</p>;

    if (!movie) return <p className="text-center text-gray-700">No movie details available</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <header className="flex flex-col sm:flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">{movie.title || 'No title available'}</h1>
                    <button
                        onClick={handleToggleFavorite}
                        className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-500'} hover:text-red-600 mt-4 sm:mt-0`}
                    >
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </button>
                </header>
                <div className="flex flex-col sm:flex-row">
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full sm:w-64 h-auto rounded-lg shadow-md"
                        />
                    ) : (
                        <div className="w-full sm:w-64 h-auto bg-gray-300 flex items-center justify-center rounded-lg shadow-md">
                            <p>No image available</p>
                        </div>
                    )}
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <h2 className="text-lg sm:text-xl font-semibold">Overview</h2>
                        <p className="mt-2 text-sm sm:text-base">{movie.overview || 'No overview available'}</p>
                        <h3 className="text-md sm:text-lg font-semibold mt-4">Release Date</h3>
                        <p className="text-sm sm:text-base">{movie.release_date || 'No release date available'}</p>
                        <h3 className="text-md sm:text-lg font-semibold mt-4">Rating</h3>
                        <p className="text-sm sm:text-base">{movie.vote_average ? `${movie.vote_average} / 10` : 'No rating available'}</p>
                        <h3 className="text-md sm:text-lg font-semibold mt-4">Trailer</h3>
                        {movie.trailer ? (
                            <a
                                href={movie.trailer}
                                className="text-blue-500 hover:text-blue-700 text-sm sm:text-base"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Watch Trailer
                            </a>
                        ) : (
                            <p className="text-sm sm:text-base">No trailer available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
