import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  const { db } = await connectToDatabase(); // Get the database connection

  switch (req.method) {
    case 'GET':
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
      break;

    case 'POST':
      try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
