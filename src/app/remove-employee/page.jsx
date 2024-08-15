"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const generateRandomSalary = () => Math.floor(Math.random() * (100000 - 30000 + 1)) + 30000;

const dummyPeople = [
  { id: 1, name: "Alice Smith", phone: "555-1234", dateJoined: "2023-01-15", paymentDone: true, url: "/alice", salary: generateRandomSalary() },
  { id: 2, name: "Bob Johnson", phone: "555-5678", dateJoined: "2023-02-20", paymentDone: false, url: "/bob", salary: generateRandomSalary() },
  { id: 3, name: "Charlie Brown", phone: "555-8765", dateJoined: "2023-03-12", paymentDone: true, url: "/charlie", salary: generateRandomSalary() },
  { id: 4, name: "Diana Prince", phone: "555-4321", dateJoined: "2023-04-10", paymentDone: true, url: "/diana", salary: generateRandomSalary() },
  { id: 5, name: "Edward Norton", phone: "555-2468", dateJoined: "2023-05-05", paymentDone: false, url: "/edward", salary: generateRandomSalary() },
  { id: 6, name: "Fiona Green", phone: "555-1357", dateJoined: "2023-06-15", paymentDone: true, url: "/fiona", salary: generateRandomSalary() },
  { id: 7, name: "George Harris", phone: "555-2468", dateJoined: "2023-07-20", paymentDone: true, url: "/george", salary: generateRandomSalary() },
  { id: 8, name: "Hannah Adams", phone: "555-3579", dateJoined: "2023-08-22", paymentDone: false, url: "/hannah", salary: generateRandomSalary() },
  { id: 9, name: "Isaac Newton", phone: "555-4680", dateJoined: "2023-09-25", paymentDone: true, url: "/isaac", salary: generateRandomSalary() },
  { id: 10, name: "Julia Roberts", phone: "555-5791", dateJoined: "2023-10-10", paymentDone: false, url: "/julia", salary: generateRandomSalary() },
  { id: 11, name: "Kevin Smith", phone: "555-6802", dateJoined: "2023-11-01", paymentDone: true, url: "/kevin", salary: generateRandomSalary() },
  { id: 12, name: "Laura Jones", phone: "555-7913", dateJoined: "2023-12-05", paymentDone: true, url: "/laura", salary: generateRandomSalary() },
  { id: 13, name: "Michael Lee", phone: "555-8024", dateJoined: "2024-01-15", paymentDone: false, url: "/michael", salary: generateRandomSalary() },
  { id: 14, name: "Nina Williams", phone: "555-9135", dateJoined: "2024-02-10", paymentDone: true, url: "/nina", salary: generateRandomSalary() },
  { id: 15, name: "Oliver Brown", phone: "555-0246", dateJoined: "2024-03-20", paymentDone: false, url: "/oliver", salary: generateRandomSalary() },
  { id: 16, name: "Pamela Clark", phone: "555-1358", dateJoined: "2024-04-12", paymentDone: true, url: "/pamela", salary: generateRandomSalary() },
  { id: 17, name: "Quincy Adams", phone: "555-2469", dateJoined: "2024-05-18", paymentDone: false, url: "/quincy", salary: generateRandomSalary() },
  { id: 18, name: "Rachel Green", phone: "555-3570", dateJoined: "2024-06-25", paymentDone: true, url: "/rachel", salary: generateRandomSalary() },
  { id: 19, name: "Samuel Davis", phone: "555-4681", dateJoined: "2024-07-30", paymentDone: true, url: "/samuel", salary: generateRandomSalary() },
  { id: 20, name: "Tina Turner", phone: "555-5792", dateJoined: "2024-08-15", paymentDone: false, url: "/tina", salary: generateRandomSalary() },
  { id: 21, name: "Ulysses Grant", phone: "555-6803", dateJoined: "2024-09-10", paymentDone: true, url: "/ulysses", salary: generateRandomSalary() },
  { id: 22, name: "Vera Wang", phone: "555-7914", dateJoined: "2024-10-20", paymentDone: false, url: "/vera", salary: generateRandomSalary() },
  { id: 23, name: "Walter White", phone: "555-8025", dateJoined: "2024-11-15", paymentDone: true, url: "/walter", salary: generateRandomSalary() },
  { id: 24, name: "Xena Warrior", phone: "555-9136", dateJoined: "2024-12-05", paymentDone: false, url: "/xena", salary: generateRandomSalary() },
  { id: 25, name: "Yvonne Strahovski", phone: "555-0247", dateJoined: "2025-01-10", paymentDone: true, url: "/yvonne", salary: generateRandomSalary() }
];

const RemoveEmployee = () => {
  const [searchName, setSearchName] = useState('');
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const employeeData = dummyPeople.find(person =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setEmployee(employeeData);
  };

  const handleRemove = () => {
    if (employee) {
      // Simulate removing employee
      console.log(`Removing employee: ${employee.name}`);
      // Normally you'd make an API call here to remove the employee
      router.push('/'); // Redirect to home after removing
    }
  };

  const handleDMChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendDM = () => {
    if (employee && message) {
      // Simulate sending a direct message
      console.log(`Sending DM to ${employee.name}: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Remove Employee</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <label className="block mb-2">
          Employee Name:
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>

      {employee && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Employee Details</h2>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Date Joined:</strong> {employee.dateJoined}</p>
          <p><strong>Salary:</strong> ${employee.salary}</p>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleRemove}
              className="p-2 bg-red-500 text-white rounded mr-2"
            >
              Remove Employee
            </button>
          </div>
        </div>
      )}

      {employee && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Send Direct Message</h2>
          <textarea
            value={message}
            onChange={handleDMChange}
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            rows="4"
            placeholder="Write your message here..."
            required
          />
          <button
            onClick={handleSendDM}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Send Message
          </button>
        </div>
      )}
    </div>
  );
};

export default RemoveEmployee;
