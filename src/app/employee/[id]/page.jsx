"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditEmployeePage = ({ params }) => {
  const { id } = params;
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateJoined: '',
    salary: 0,
    paymentDone: false,
    url: ''
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchEmployee() {
      const response = await fetch(`/api/employees/${id}`);
      const data = await response.json();
      setEmployee(data);
      setFormData(data);
    }

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to update employee'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Employee</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Date Joined:
          <input
            type="date"
            name="dateJoined"
            value={formData.dateJoined}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Salary:
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Payment Done:
          <input
            type="checkbox"
            name="paymentDone"
            checked={formData.paymentDone}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployeePage;
