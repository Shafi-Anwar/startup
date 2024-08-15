import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to store the client
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, use a local variable
  clientPromise = client.connect();
}

export default clientPromise;
