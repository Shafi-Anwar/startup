import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('employeeDB');
    const collection = db.collection('employees');

    const employees = await collection.find({}).toArray();
    return new Response(JSON.stringify(employees), { status: 200 });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return new Response(JSON.stringify({ message: 'Error fetching employees' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('employeeDB');
    const collection = db.collection('employees');

    const data = await req.json();
    const result = await collection.insertOne(data);

    return new Response(JSON.stringify({ message: 'Employee added successfully', id: result.insertedId }), { status: 201 });
  } catch (error) {
    console.error('Error adding employee:', error);
    return new Response(JSON.stringify({ message: 'Error adding employee' }), { status: 500 });
  }
}
  