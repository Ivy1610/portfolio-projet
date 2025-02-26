import { connectToMongoose } from "../../lib/mongodb";
import Contact from "../../models/Contact"; // Import du modèle Mongoose

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    await connectToMongoose(); // 📌 Connexion via Mongoose

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return res.status(201).json({ message: "Message enregistré avec succès !" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}
