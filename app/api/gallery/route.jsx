import { clientPromise } from "@/lib/mongodb";


export async function GET() {
  try {
    console.log("📡 Connexion à MongoDB en cours...");

    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db("youlive"); // Remplace avec le vrai nom de ta base MongoDB
    const collection = db.collection("gallery");

    // Vérifie si la collection existe
    const count = await collection.countDocuments();
    console.log(`✅ La collection "gallery" contient ${count} documents.`);

    if (count === 0) {
      return new Response(JSON.stringify({ message: "Aucune donnée trouvée." }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Récupérer les images/vidéos
    const galleryItems = await collection.find({}).toArray();
    console.log("✅ Données récupérées :", galleryItems);

    return new Response(JSON.stringify(galleryItems), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error);
    return new Response(JSON.stringify({ error: "Erreur de connexion à MongoDB" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
