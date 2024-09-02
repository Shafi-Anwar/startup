// pages/api/employees/[id].js
import { connectToDatabase } from "../../../../lib/mongodb"
import { ObjectId } from 'mongodb';

export async function handler(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('employees');
    const { id } = req.query;

    switch (req.method) {
        case 'PUT':
            // eslint-disable-next-line no-case-declarations
            const { name, position, department } = req.body;
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { name, position, department } }
            );
            res.json({ message: 'Employee updated' });
            break;
        case 'GET':
            // eslint-disable-next-line no-case-declarations
            const employee = await collection.findOne({ _id: new ObjectId(id) });
            res.json(employee);
            break;
        default:
            res.status(405).end(); // Method Not Allowed
    }
}
