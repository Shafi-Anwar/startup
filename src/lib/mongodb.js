import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI || "mongodb+srv://Shafi:Sufiyan10%23shafi24@cluster0.irboebx.mongodb.net/employeeDB?retryWrites=true&w=majority") {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(); // Use the default database (from the MongoDB URI)
  return { client, db };
}

export default clientPromise;
