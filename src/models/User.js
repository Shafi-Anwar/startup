import { Schema, model, models } from 'mongoose';
import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

// Check if the model exists to prevent overwriting the compiled model
const User = models.User || model('User', UserSchema);

// Connect to the database and export the model
async function connectDb() {
  try {
    await clientPromise; // Wait for the MongoClient to be connected
    mongoose.connection.readyState; // Check the connection state (optional)
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

connectDb();

export default User;
