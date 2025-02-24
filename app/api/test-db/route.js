import clientPromise from "@/lib/mongodb";

// Exporter une fonction nommée pour la méthode GET
export async function GET(request) {
  try {
    // Connexion à la base de données
    const client = await clientPromise;
    const db = client.db("cluster0"); // Remplacez "cluster0" par le nom de votre base MongoDB

    // Vérifie si la connexion est active
    await db.command({ ping: 1 });

    return new Response(JSON.stringify({ message: "✅ Connexion réussie à MongoDB !" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "❌ Erreur de connexion à MongoDB", details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Vous pouvez ajouter d'autres méthodes (POST, PUT, DELETE, etc.) si nécessaire
