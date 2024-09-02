"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateCompanyPage = () => {
    const [companyName, setCompanyName] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const userId = 'your-logged-in-user-id'; // Retrieve this from your auth context or other source

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, companyName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create company');
            }

            router.push('/company-details'); // Redirect after successful creation
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create New Company</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-400"
                    >
                        Create Company
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCompanyPage;
