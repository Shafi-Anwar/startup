"use client";
import { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import Link from 'next/link';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      } finally {
        setLoading(false);
      }
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

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.phone.includes(searchQuery)
  );

  // Pie Chart Data (Salary Distribution)
  const pieChartData = {
    labels: filteredEmployees.map(employee => employee.name),
    datasets: [
      {
        label: 'Salary',
        data: filteredEmployees.map(employee => employee.salary),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: $${tooltipItem.raw}`,
        },
      },
    },
  };

  // Bar Chart Data (Experience)
  const barChartData = {
    labels: filteredEmployees.map(employee => employee.name),
    datasets: [
      {
        label: 'Experience (Years)',
        data: filteredEmployees.map(employee => {
          const joinDate = new Date(employee.dateJoined);
          const currentDate = new Date();
          return Math.floor((currentDate - joinDate) / (1000 * 60 * 60 * 24 * 365)); // Years of experience
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Experience in company: ${tooltipItem.raw} years`,
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Dashboard</h1>
      
      <div className="flex flex-col md:flex-row justify-between mb-6">
        {/* Search Bar */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search by name or phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add Employee Button */}
        <div className="flex justify-end w-full md:w-2/3">
          <Link href="/add-employee">
            <button className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors">
              Add Employee
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {/* Pie Chart */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Salary Distribution</h2>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            
            {/* Bar Chart */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Employee Experience</h2>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b px-2 py-1 text-left text-sm sm:text-base">Name</th>
                  <th className="border-b px-2 py-1 text-left text-sm sm:text-base">Phone</th>
                  <th className="border-b px-2 py-1 text-left text-sm sm:text-base">Date Joined</th>
                  <th className="border-b px-2 py-1 text-left text-sm sm:text-base">Salary</th>
                  <th className="border-b px-2 py-1 text-left text-sm sm:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id} className="border-b hover:bg-gray-50">
                    <td className="px-2 py-1 text-sm sm:text-base">{employee.name}</td>
                    <td className="px-2 py-1 text-sm sm:text-base">{employee.phone}</td>
                    <td className="px-2 py-1 text-sm sm:text-base">{new Date(employee.dateJoined).toLocaleDateString()}</td>
                    <td className="px-2 py-1 text-sm sm:text-base">{employee.salary}</td>
                    <td className="px-2 py-1 flex flex-wrap space-x-2 gap-y-2 text-sm sm:text-base">
                      <Link href={`/person/${employee._id}`}>
                        <button className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors">
                          View Details
                        </button>
                      </Link>
                      <Link href={`/employee/${employee._id}/edit`}>
                        <button className="p-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition-colors">
                          Edit
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
        </>
      )}
    </div>
  );
};

export default DashboardPage;
