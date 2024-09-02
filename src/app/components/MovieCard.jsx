'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MovieCard = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleClick = () => {
        router.push(`/movies/${movie.id}`); // Redirect to detailed movie page
    };

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div
            className="relative bg-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <Image
                src={posterUrl}
                alt={movie.title}
                width={500}
                height={750}
                className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div
                className={`absolute inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center text-white transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                    <p className="mt-2">{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
