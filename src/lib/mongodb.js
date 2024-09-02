import { MongoClient } from 'mongodb';

// Load MongoDB URI from environment variable
const uri = process.env.MONGODB_URI;

// Create a new MongoClient instance
const client = new MongoClient(uri);

// Initialize clientPromise
let clientPromise;

// Function to create or return a connected MongoClient promise
function getClientPromise() {
  if (!clientPromise) {
    clientPromise = client.connect()
      .then(() => client)
      .catch((error) => {
        console.error('Failed to connect to database:', error);
        throw new Error('Database connection error');
      });
  }
  return clientPromise;
}

// Function to connect to the database
export async function connectToDatabase() {
  try {
    const connectedClient = await getClientPromise();
    const db = connectedClient.db('your-database-name'); // Replace with your database name
    return { db, client: connectedClient };
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Database connection error');
  }
}

// Export the client instance and clientPromise
export default { client, getClientPromise };
