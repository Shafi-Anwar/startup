'use client'; // Mark this as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EditEmployeeForm = ({ employee }) => {
    const [name, setName] = useState(employee.name);
    const [position, setPosition] = useState(employee.position);
    const [department, setDepartment] = useState(employee.department);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/employees`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: employee._id, name, position, department }),
        });
        if (response.ok) {
            alert('Employee updated successfully');
            router.push('/dashboard');
        } else {
            alert('Error updating employee');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="position" className="block text-gray-700">Position:</label>
                <input
                    type="text"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="department" className="block text-gray-700">Department:</label>
                <input
                    type="text"
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Update Employee
            </button>
        </form>
    );
};

export default EditEmployeeForm;
