"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, signOut } = useUser();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogoClick = () => {
        window.location.href = '/dashboard';
    };

    const handleLogout = async () => {
        try {
            await signOut();
            window.location.href = '/';
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4 md:p-6 lg:p-8 relative">
                <h1
                    className="text-2xl sm:text-3xl font-bold cursor-pointer"
                    onClick={handleLogoClick}
                >
                    Maneger
                </h1>
                <div className="md:hidden flex items-center">
                    <button 
                        onClick={toggleSidebar} 
                        className="text-white focus:outline-none">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isSidebarOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                {/* Sidebar */}
                <div 
                    className={`fixed inset-0 bg-gray-900 bg-opacity-80 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50 md:hidden`}
                >
                    <div className="relative w-64 h-full bg-gray-800 text-white">
                        <button 
                            onClick={toggleSidebar}
                            className="absolute top-4 right-4 text-white text-3xl">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <ul className="flex flex-col items-start mt-12 space-y-4 px-4">
                            {user ? (
                                <>
                                    <li>
                                        <Link href="/dashboard" className="block px-4 py-2 text-lg hover:text-gray-400 transition-colors" onClick={() => setIsSidebarOpen(false)}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/entertainment" className="block px-4 py-2 text-lg hover:text-gray-400 transition-colors" onClick={() => setIsSidebarOpen(false)}>
                                            Entertainment
                                        </Link>
                                    </li>
                                    <li>
                                        <UserButton />
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href="/" className="block px-4 py-2 text-lg hover:text-gray-400 transition-colors" onClick={() => setIsSidebarOpen(false)}>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/sign-up" className="block px-4 py-2 text-lg hover:text-gray-400 transition-colors" onClick={() => setIsSidebarOpen(false)}>
                                            Sign Up
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/sign-in" className="block px-4 py-2 text-lg hover:text-gray-400 transition-colors" onClick={() => setIsSidebarOpen(false)}>
                                            Sign In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="block px-4 py-2 text-lg hover:text-gray-400 transition-colors" onClick={() => setIsSidebarOpen(false)}>
                                            Email Us
                                        </Link>
                                    </li>
                                    <li>
                                        <UserButton />
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="md:flex md:items-center md:space-x-6 hidden">
                    <ul className="flex flex-row space-x-6">
                        {user ? (
                            <>
                                <li>
                                    <Link href="/dashboard" className="hover:text-gray-400 transition-colors">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/entertainment" className="hover:text-gray-400 transition-colors">
                                        Entertainment
                                    </Link>
                                </li>
                                <li>
                                    <UserButton />
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/" className="hover:text-gray-400 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sign-up" className="hover:text-gray-400 transition-colors">
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sign-in" className="hover:text-gray-400 transition-colors">
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-gray-400 transition-colors">
                                        Email Us
                                    </Link>
                                </li>
                                <li>
                                    <UserButton />
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
