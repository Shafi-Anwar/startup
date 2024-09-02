// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Make sure this is correctly set in your .env file
const client = new MongoClient(uri);

let clientPromise;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to hold the client
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, use a local variable
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    try {
        const client = await clientPromise;
        const db = client.db('test'); // Replace with your database name
        return db;
    } catch (error) {
        console.error('Failed to connect to database:', error);
        throw new Error('Database connection error');
    }
}
