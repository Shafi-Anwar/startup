// src/app/edit-employee/[id]/page.jsx

import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import EditEmployeeForm from "../../components/EditEmployeeForm"

export async function getEmployeeById(id) {
    const db = await connectToDatabase();
    const collection = db.collection('employees');
    const employee = await collection.findOne({ _id: new ObjectId(id) });
    return employee;
}

const EditEmployee = async ({ params }) => {
    const { id } = params;
    const employee = await getEmployeeById(id);

    return (
        <div className="min-h-screen bg-indigo-50 p-8">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Employee</h1>
                <EditEmployeeForm employee={employee} />
            </div>
        </div>
    );
};

export default EditEmployee;
