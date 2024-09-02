"use client"
import { useState, useEffect } from 'react';

// Function to fetch an access token from Spotify
async function getAccessToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to get access token');
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
}

// Function to fetch song details by ID
async function fetchSong(id) {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            console.error('No access token obtained');
            return null;
        }

        const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch song details:', response.status, await response.text());
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching song details:', error);
        return null;
    }
}

// SongPlayer Component
export default function SongPlayer({ songId }) {
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        async function loadSong() {
            try {
                const songData = await fetchSong(songId);
                if (songData) {
                    setSong(songData);
                } else {
                    setError('Song not found');
                }
            } catch (err) {
                setError('Error loading song');
            } finally {
                setLoading(false);
            }
        }

        loadSong();
    }, [songId]);

    useEffect(() => {
        if (song && song.preview_url) {
            const audioElement = new Audio(song.preview_url);
            setAudio(audioElement);

            return () => {
                audioElement.pause();
                setAudio(null);
            };
        }
    }, [song]);

    const handlePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleDownload = () => {
        if (song && song.preview_url) {
            const link = document.createElement('a');
            link.href = song.preview_url;
            link.download = `${song.name}.mp3`; // Adjust the file extension or format based on the preview URL
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (loading) {
        return <p className="text-center text-white text-lg mt-6">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-white text-lg mt-6">{error}</p>;
    }

    if (!song) {
        return <p className="text-center text-white text-lg mt-6">Song not found</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-6">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                <img
                    src={song.album.images[0]?.url}
                    alt={song.album.name}
                    className="w-full md:w-64 h-64 rounded-lg object-cover shadow-lg"
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-4">{song.name}</h1>
                    <p className="text-xl text-gray-300 mb-2">
                        <strong>Artist:</strong> {song.artists.map(artist => artist.name).join(', ')}
                    </p>
                    <p className="text-xl text-gray-300 mb-2">
                        <strong>Album:</strong> {song.album.name}
                    </p>
                    <p className="text-xl text-gray-300 mb-4">
                        <strong>Release Date:</strong> {song.album.release_date}
                    </p>
                    <a
                        href={song.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-700 transition"
                    >
                        Listen on Spotify
                    </a>
                    <div className="mt-6">
                        <button
                            onClick={handlePlayPause}
                            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="ml-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-700 transition"
                        >
                            Download
                        </button>
                    </div>
                    {song.preview_url && (
                        <audio src={song.preview_url} controls className="mt-4">
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            </div>
        </div>
    );
}
