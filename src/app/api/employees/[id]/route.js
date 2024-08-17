// src/app/api/employees/[id]/route.js
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const client = await clientPromise;
    const db = client.db();
    const employee = await db.collection('employees').findOne({ _id: new ObjectId(id) });
    if (!employee) {
      return new Response(JSON.stringify({ message: 'Employee not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, phone, dateJoined, salary, paymentDone, url } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('employees').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, phone, dateJoined, salary, paymentDone, url } }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: 'Employee not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Employee updated successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('employees').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Employee not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Employee deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
