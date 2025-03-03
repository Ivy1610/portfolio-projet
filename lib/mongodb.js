import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Veuillez définir MONGODB_URI dans .env.local");
}

// --- ✅ Connexion avec MongoClient ---
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);

  global._mongoClientPromise = client.connect().then((client) => {
    console.log("✅ Connexion réussie à MongoDB avec MongoClient !");
    return client;
  }).catch((error) => {
    console.error("❌ Erreur MongoClient :", error);
    throw error;
  });
}

clientPromise = global._mongoClientPromise;

// --- ✅ Connexion avec Mongoose ---
let mongooseConnection;

async function connectToMongoose() {
  if (mongooseConnection) return mongooseConnection;

  try {
    mongooseConnection = await mongoose.connect(uri);
    console.log("✅ Connexion réussie à MongoDB avec Mongoose !");
    return mongooseConnection;
  } catch (error) {
    console.error("❌ Erreur de connexion Mongoose :", error);
    throw error;
  }
}

// --- Export des connexions ---
export { clientPromise, connectToMongoose };
