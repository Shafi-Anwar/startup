'use client'; // Ensure this component is treated as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Predefined options for Position and Department
const positions = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'UI/UX Designer',
    'Product Manager',
    'QA Engineer',
    'System Administrator',
    'Data Scientist',
];

const departments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Customer Support',
    'HR',
    'Finance',
    'Operations',
    'IT',
];

const AddEmployeeForm = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState(positions[0]); // Default to the first position
    const [department, setDepartment] = useState(departments[0]); // Default to the first department
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, position, department }),
        });

        if (response.ok) {
            alert('Employee added successfully');
            router.push('/dashboard');
        } else {
            alert('Error adding employee');
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
                <select
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {positions.map((pos) => (
                        <option key={pos} value={pos}>
                            {pos}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="department" className="block text-gray-700">Department:</label>
                <select
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {departments.map((dept) => (
                        <option key={dept} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Add Employee
            </button>
        </form>
    );
};

export default AddEmployeeForm;
