"use client"
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { dummyEmployees } from '../data'; // Adjust path as needed

const EditEmployee = () => {
    const [employee, setEmployee] = useState(null);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const router = useRouter();
    const { id } = useParams(); // Extract ID from URL

    useEffect(() => {
        const employeeData = dummyEmployees.find(emp => emp.id === parseInt(id));
        if (employeeData) {
            setEmployee(employeeData);
            setName(employeeData.name);
            setPosition(employeeData.position);
            setDepartment(employeeData.department);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Normally, you'd send updated data to a backend here.
        // For simplicity, this simulates updating data and redirects to the dashboard.
        // Find and update the employee in the dummy data
        const updatedEmployees = dummyEmployees.map(emp =>
            emp.id === parseInt(id) ? { ...emp, name, position, department } : emp
        );
        // Assuming that `dummyEmployees` can be modified directly for this simulation
        // This won't persist changes across sessions in a real app.
        router.push('/');
    };

    if (!employee) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Employee</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Position</label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Department</label>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-indigo-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-400">
                        Update Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
