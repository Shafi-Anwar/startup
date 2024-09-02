// src/app/api/integration/route.js
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(request) {
    const { data } = await request.json();
    const db = await connectToDatabase();
    const result = await db.collection('integrations').insertOne(data);
    return new Response(JSON.stringify(result), { status: 201 });
}
