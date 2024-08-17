// pages/api/insert-data.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    const result = await collection.insertOne({ name: 'John Doe', salary: 50000 });

    res.status(200).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
