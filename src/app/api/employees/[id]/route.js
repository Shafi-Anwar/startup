// pages/api/employees/[id].js
import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('employees');
    const { id } = req.query;

    switch (req.method) {
        case 'PUT':
            try {
                const { name, position, department } = req.body;
                await collection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { name, position, department } }
                );
                res.json({ message: 'Employee updated' });
            } catch (error) {
                console.error('Failed to update employee:', error);
                res.status(500).json({ message: 'Failed to update employee' });
            }
            break;
        case 'GET':
            try {
                const employee = await collection.findOne({ _id: new ObjectId(id) });
                if (employee) {
                    res.json(employee);
                } else {
                    res.status(404).json({ message: 'Employee not found' });
                }
            } catch (error) {
                console.error('Failed to fetch employee:', error);
                res.status(500).json({ message: 'Failed to fetch employee' });
            }
            break;
        default:
            res.status(405).end(); // Method Not Allowed
    }
}
