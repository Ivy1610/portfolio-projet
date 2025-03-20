// Code to get videos from MongoDB
import cloudinary from 'cloudinary';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('youlive');
    const collection = db.collection('gallery'); // Changé 'events' -> 'gallery'

    const { user_id, password } = req.body;

    // Validation des identifiants
    if (user_id !== 'youlive' || password !== 'Azerty12') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Récupération des vidéos
    const videos = await collection.find({
      type: 'video',
      public_id: { $exists: true }
    }).toArray();

    return res.status(200).json({ videos });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
