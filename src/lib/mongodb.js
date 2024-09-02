import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to connect to the database
export async function connectToDatabase() {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const db = client.db('your-database-name'); // Replace with your database name
    return { db, client };
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Database connection error');
  }
}
