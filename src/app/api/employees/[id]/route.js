import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId directly

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db('employeeDB');
    const collection = db.collection('employees');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ message: 'Employee removed successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Employee not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error removing employee:', error);
    return new Response(JSON.stringify({ message: 'Error removing employee' }), { status: 500 });
  }
}
