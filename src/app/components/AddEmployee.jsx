import { useState } from 'react';
import { useNavigate } from 'next/navigation';

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateJoined: '',
    salary: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle adding employee logic here (e.g., API call or context update)
    // Redirect back to home page after adding
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Employee</h1>
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
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Employee
        </button>
      </form>
    </div>
  );
}