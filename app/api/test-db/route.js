import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("custer0"); // Change "cluster0" en "youlive" si c'est le vrai nom
    const collection = db.collection("gallery");

    // Vérifier que la collection existe
    const galleryItems = await collection.find({}).toArray();
    if (!galleryItems.length) {
      throw new Error("Aucune image/vidéo trouvée dans la base de données.");
    }

    return new Response(JSON.stringify(galleryItems), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
