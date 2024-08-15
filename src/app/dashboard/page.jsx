"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data);
    }

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees((prev) => prev.filter(emp => emp._id !== id));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to delete employee'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Dashboard</h1>
      <div className="flex justify-end mb-4">
        <Link href="/add-employee">
          <button className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors">Add Employee</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Phone</th>
              <th className="border-b px-4 py-2 text-left">Date Joined</th>
              <th className="border-b px-4 py-2 text-left">Salary</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.phone}</td>
                <td className="px-4 py-2">{employee.dateJoined}</td>
                <td className="px-4 py-2">{employee.salary}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Link href={`/employee/${employee._id}`}>
                    <button className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors">
                      View Details
                    </button>
                  </Link>
                  <button
                    className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition-colors"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
