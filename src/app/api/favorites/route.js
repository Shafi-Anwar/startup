import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
    try {
        await client.connect();
        const database = client.db('test'); // Use 'test' database
        const collection = database.collection('favorites');

        const favorites = await collection.find().toArray();

        console.log('Fetched favorites:', favorites); // Debugging line
        return NextResponse.json(favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error); // Detailed error logging
        return NextResponse.json({ error: 'Failed to load favorites' }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function POST(request) {
    try {
        const { movieId } = await request.json();
        await client.connect();
        const database = client.db('test'); // Use 'test' database
        const collection = database.collection('favorites');
        
        await collection.updateOne(
            { movieId },
            { $set: { movieId } },
            { upsert: true }
        );

        return NextResponse.json({ message: 'Movie added to favorites' });
    } catch (error) {
        console.error('Error adding to favorites:', error); // Detailed error logging
        return NextResponse.json({ error: 'Failed to add to favorites' }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function DELETE(request) {
    try {
        const { movieId } = await request.json();
        await client.connect();
        const database = client.db('test'); // Use 'test' database
        const collection = database.collection('favorites');

        await collection.deleteOne({ movieId });

        return NextResponse.json({ message: 'Movie removed from favorites' });
    } catch (error) {
        console.error('Error removing from favorites:', error); // Detailed error logging
        return NextResponse.json({ error: 'Failed to remove from favorites' }, { status: 500 });
    } finally {
        await client.close();
    }
}
