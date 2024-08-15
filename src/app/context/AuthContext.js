"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user data or session
    const fetchUser = async () => {
      // Simulate a user fetch; replace with actual logic
      const userData = await fetch('/api/auth/me').then(res => res.json());
      setUser(userData);
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    router.push('/dashboard'); // Redirect to dashboard after login
  };

  const logout = () => {
    setUser(null);
    router.push('/signin'); // Redirect to sign-in after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
