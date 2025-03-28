import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Veuillez définir MONGODB_URI dans .env.local");
}

const client = new MongoClient(uri);

// Fonction pour insérer un utilisateur
export default async function insertUser(userData) {
  const { email, password, name } = userData;

  try {
    await client.connect();
    const db = client.db('youlive');
    const usersCollection = db.collection('users');

    // Hacher le mot de passe avant de l'insérer
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email: email,
      password: hashedPassword,
      name: name,
      createdAt: new Date().toISOString(),
    };

    const result = await usersCollection.insertOne(user);
    console.log(`Utilisateur inséré avec l'ID : ${result.insertedId}`);

    // Retourner un résultat de succès
    return { success: true, userId: result.insertedId };
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur :", error);

    // Retourner un résultat d'échec
    return { success: false, error: error.message };
  } finally {
    await client.close();
  }
}
