"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const CompanyDetails = () => {
    const [companyName, setCompanyName] = useState('');
    const router = useRouter();
    const { user } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Save company details to your backend
            await fetch('/api/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id, companyName }),
            });

            // Redirect to the dashboard or another page
            router.push('/dashboard');
        } catch (error) {
            console.error('Error saving company details:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Enter Your Company Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            id="companyName"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-400"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyDetails;
