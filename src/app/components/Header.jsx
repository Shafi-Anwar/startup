"use client";
import { useState } from 'react';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useUser();  // Ensure `useUser` hook is imported from @clerk/nextjs

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    window.location.href = '/dashboard'; // Redirect to dashboard
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Ensure signOut is awaited and handled properly
      window.location.href = '/'; // Redirect to home or login page after logout
    } catch (error) {
      console.error('Error during sign out:', error); // Log error if signOut fails
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={handleLogoClick}
        >
          MyApp
        </h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
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
        <nav className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {user ? (
              <>
                <li className="text-lg">
                  <span>Welcome, {user.fullName || user.username || 'User'}</span>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-gray-400 transition-colors">
                    Dashboard
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
