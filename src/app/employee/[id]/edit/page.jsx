"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Function to generate a background color based on the name
const getBackgroundColor = (name) => {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// Function to get initials from the name
const getInitials = (name) => {
  const names = name.split(" ");
  if (names.length > 1) {
    return names[0][0] + names[1][0];
  }
  return names[0][0];
};

const EditEmployeePage = ({ params }) => {
  const { id } = params;
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateJoined: "",
    salary: 0,
    paymentDone: false,
    url: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(`/api/employees/${id}`);
        if (!response.ok) throw new Error("Failed to fetch employee data");
        const data = await response.json();
        setEmployee(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        alert("Failed to fetch employee details.");
      }
    }

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to update employee"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleCreateMeetLink = () => {
    // Redirect to Google Meet's meeting creation page
    window.open("https://meet.google.com/new", "_blank");
  };

  if (!employee) return <p className="text-center text-gray-700">Loading...</p>;

  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Employee
      </h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="mb-6 flex justify-center items-center">
          <div
            className={`w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full text-white ${getBackgroundColor(
              employee.name
            )}`}
          >
            <span className="text-xl md:text-3xl font-bold">
              {getInitials(employee.name)}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Date Joined:
            </label>
            <input
              type="date"
              name="dateJoined"
              value={formData.dateJoined}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Salary:
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="paymentDone"
              checked={formData.paymentDone}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700 font-semibold">Payment Done</label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
          >
            Update Employee
          </button>
          <button
            type="button"
            onClick={handleCreateMeetLink}
            className="w-full mt-4 py-2 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition-colors"
          >
            Create Google Meet Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePage;
