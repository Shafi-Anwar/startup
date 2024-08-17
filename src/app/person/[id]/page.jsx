"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function PersonDetails() {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract the ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(`/api/employees/${id}`);
        if (!response.ok) {
          throw new Error('Employee not found');
        }
        const data = await response.json();
        setEmployee(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!employee) {
    return <div className="text-center">Employee not found</div>;
  }

  return (
    <div className="container mx-auto p-6 lg:max-w-2xl">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4">{employee.name}</h1>
        <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
          <div className="flex-1 mb-4 md:mb-0">
            <p className="text-lg font-medium mb-2">Phone:</p>
            <p className="text-gray-700">{employee.phone}</p>
          </div>
          <div className="flex-1 mb-4 md:mb-0">
            <p className="text-lg font-medium mb-2">Date Joined:</p>
            <p className="text-gray-700">{new Date(employee.dateJoined).toLocaleDateString()}</p>
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium mb-2">Salary:</p>
            <p className="text-gray-700">${employee.salary}</p>
          </div>
        </div>
        <div className="mb-6">
          <Link
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
            href="/dashboard"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
