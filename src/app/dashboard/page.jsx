
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch('/api/employees');
            const data = await response.json();
            setEmployees(data);
        };
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id) => {
        await fetch('/api/employees', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        setEmployees(employees.filter(employee => employee._id !== id));
    };

    const handleAdd = () => {
        router.push('/add-employee');
    };

    const handleEdit = (id) => {
        router.push(`/edit-employee/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">Employee Dashboard</h1>
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 mb-4 sm:mb-0 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                        />
                        <button 
                            onClick={handleAdd}
                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-400">
                            Add Employee
                        </button>
                    </div>
                </header>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                        <tr className="border-b bg-gray-200">
                            <th className="p-4 text-left text-gray-700">Name</th>
                            <th className="p-4 text-left text-gray-700">Position</th>
                            <th className="p-4 text-left text-gray-700">Department</th>
                            <th className="p-4 text-left text-gray-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map(employee => (
                                <tr key={employee._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 text-sm sm:text-base">{employee.name}</td>
                                    <td className="p-4 text-sm sm:text-base">{employee.position}</td>
                                    <td className="p-4 text-sm sm:text-base">{employee.department}</td>
                                    <td className="p-4 flex space-x-2">
                                        <button 
                                            onClick={() => handleEdit(employee._id)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-400">
                                                <FaPen />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(employee._id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-400">
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">No employees found</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
