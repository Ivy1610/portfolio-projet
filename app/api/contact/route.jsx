import { connectToMongoose } from "@/lib/mongodb";
import Contact from "@/models/contactEmail"; // Import du modèle Mongoose


export async function POST(req) {
  try {
    await connectToMongoose(); // 📌 Connexion via Mongoose

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json({ message: "Tous les champs sont requis." },
        { status: 400 });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return Response.json({ message: "Message enregistré avec succès !" },
      { status: 201 });

  } catch (error) {
    return Response.json({ message: "Erreur serveur", error: error.message },
      { status: 500 });
  }
}
