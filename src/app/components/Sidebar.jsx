
"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

const Sidebar = () => {
    const router = useRouter();
    const { user } = useUser();
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        // Fetch the company name based on the user or a specific ID
        const fetchCompanyName = async () => {
            if (user) {
                const response = await fetch(`/api/company/${user.id}`);
                const data = await response.json();
                setCompanyName(data.companyName);
            }
        };

        fetchCompanyName();
    }, [user]);

    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <p className="text-sm">{companyName}</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <button
                            onClick={() => router.push('/projects')}
                            className="w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
                        >
                            Projects
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => router.push('/github-updates')}
                            className="w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
                        >
                            GitHub Updates
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => router.push('/settings')}
                            className="w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
                        >
                            Settings
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
