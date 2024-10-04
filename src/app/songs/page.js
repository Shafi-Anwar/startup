"use client";
import { useState } from 'react';
import Link from 'next/link';

const SongsPage = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    const searchSongs = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/songs?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 401) {
                    setError('Session expired. Please log in again.');
                    window.location.href = '/api/auth'; // Redirect to auth page or login
                } else {
                    throw new Error(errorText || 'Failed to fetch songs');
                }
            }
            const data = await response.json();
            setSongs(data || []);
        } catch (err) {
            setError('Error fetching songs');
            console.error('Error fetching songs:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-black text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Songs</h1>
                    <Link href="/" className="text-green-400 hover:text-green-300 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </header>
            <main className="container mx-auto p-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex mb-6">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for songs..."
                            className="p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                        />
                        <button
                            onClick={searchSongs}
                            className="ml-4 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                    {loading && <p className="text-center text-green-400">Loading...</p>}
                    {error && <p className="text-center text-red-400">{error}</p>}
                    {songs.length === 0 ? (
                        <p className="text-center text-gray-400">Search for songs.</p>
                    ) : (
                        <ul>
                            {songs.map(song => (
                                <li key={song.id} className="flex items-center mb-6 p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors">
                                    {song.album.images?.[0]?.url ? (
                                        <img
                                            src={song.album.images[0].url}
                                            alt={song.name}
                                            className="w-24 h-24 rounded-lg mr-4"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-500 flex items-center justify-center rounded-lg mr-4">
                                            <p>No image</p>
                                        </div>
                                    )}
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold">{song.name}</h2>
                                        <p className="text-gray-300">by {song.artists?.[0]?.name} ({song.album.release_date})</p>
                                    </div>
                                    <Link
                                        href={`/songs/${song.id}`}
                                        className="text-green-500 hover:text-green-400"
                                    >
                                        View Details
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
            <footer className="bg-black text-white p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Music App</p>
                </div>
            </footer>
        </div>
    );
};

export default SongsPage;
