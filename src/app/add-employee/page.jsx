// src/app/add-employee/page.js
import AddEmployeeForm from "../components/AddEmployeeForm";


const AddEmployeePage = () => {
    return (
        <div className="min-h-screen bg-indigo-50 p-8">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add New Employee</h1>
                <AddEmployeeForm />
            </div>
        </div>
    );
};

export default AddEmployeePage;
