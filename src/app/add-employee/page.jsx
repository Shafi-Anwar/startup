"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddEmployeePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateJoined: '',
    salary: 0,
    paymentDone: false,
    url: '' // Add URL to the form data state
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const generateRandomLink = () => {
    const randomString = Math.random().toString(36).substr(2, 9);
    return `/employee/${randomString}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomLink = generateRandomLink();
    const updatedFormData = { ...formData, url: randomLink };

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to add employee'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Employee</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <label className="block mb-2">
          Name:
          <input
            type="text"
            placeholder="Enter Employee name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Phone Number:
          <input
            type="number"
            placeholder="Enter Employee phone number"
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
            placeholder="Enter employee salary"
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
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
