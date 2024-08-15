import { useState } from 'react';
import { useNavigate } from 'next/navigation';

export default function RemoveEmployeePage() {
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle removing employee logic here (e.g., API call or context update)
    // Redirect back to home page after removing
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Remove Employee</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <label className="block mb-2">
          Employee ID:
          <input
            type="number"
            value={employeeId}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <button type="submit" className="p-2 bg-red-500 text-white rounded">
          Remove Employee
        </button>
      </form>
    </div>
  );
}
