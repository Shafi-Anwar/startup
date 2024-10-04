// src/app/songs/[id]/page.js
import Image from "next/image"
import { fetchSong } from '@/lib/spotify';
import SongPlayer from '../SongPlayer';

const SongPage = async ({ params }) => {
    const { id } = params;
    let song = null;
    let errorMessage = null;

    try {
        song = await fetchSong(id);
        if (!song) {
            errorMessage = `No song data found for ID: ${id}`;
        }
    } catch (error) {
        console.error('Error fetching song data:', error.message);
        errorMessage = 'Error fetching song data';
    }

    if (errorMessage) {
        return (
            <p className="text-center text-white text-lg mt-6">
                {errorMessage}
            </p>
        );
    }

    if (!song) {
        return (
            <p className="text-center text-white text-lg mt-6">
                Song not found
            </p>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-6">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                <Image
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
                </div>
            </div>
            <SongPlayer song={song} />
        </div>
    );
};

export default SongPage;
