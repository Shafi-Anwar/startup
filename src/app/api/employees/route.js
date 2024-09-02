// src/app/api/employees/route.js

import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// Fetch all employees
export async function GET() {
    const db = await connectToDatabase();
    const collection = db.collection('employees');
    const employees = await collection.find({}).toArray();
    return new Response(JSON.stringify(employees), {
        headers: { 'Content-Type': 'application/json' }
    });
}

// Add a new employee
export async function POST(request) {
    const { name, position, department } = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('employees');
    const result = await collection.insertOne({ name, position, department });
    return new Response(JSON.stringify(result.insertedId), {
        headers: { 'Content-Type': 'application/json' }
    });
}

// Update an existing employee
export async function PUT(request) {
    const { id, name, position, department } = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('employees');
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, position, department } }
    );
    return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
    });
}

// Delete an employee
export async function DELETE(request) {
    const { id } = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('employees');
    await collection.deleteOne({ _id: new ObjectId(id) });
    return new Response(JSON.stringify({ message: 'Employee deleted' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
