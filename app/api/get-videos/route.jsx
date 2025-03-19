// Code to get videos from MongoDB
import { MongoClient } from 'mongodb';
import cloudinary from 'cloudinary';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
      console.log('📡 Demande de recuperation des videos recue...');

      const { user_id, password } = await req.json();
      console.log('🔒 Verification des informations de connexion :', user_id);

      const client = await clientPromise;
      const db = client.db('youlive');
      const collection = db.collection('events');

      // verifie si l'utilisateur a un evenement correspondant
      const event = await collection.findOne({ user_id, password });

      if (!event) {
        console.warn('event not found for user_id:', user_id);
        return new Response(JSON.stringify({message: "event not found" }), { status: 404 });
      }

      // Recuperer les videos de l'evenement
      const cloudinaryResponse = await cloudinary.v2.search
        .expression('resource_type:video')
        .sort_by('created_at', 'desc')
        .max_results(30)  
        .execute();

        return new Response(JSON.stringify({ videos: cloudinaryResponse.resources }), { status: 200 });
      } catch (error) {
        console.error('Erreur lors de la recuperation des videos:', error);
        return new Response(JSON.stringify({ message: 'Erreur du server' }), { status: 500 });
      }
    }
  
