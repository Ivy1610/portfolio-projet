import { clientPromise } from "@/lib/mongodb";
import { uploadImageToCloudinary, uploadVideoToCloudinary } from "@/lib/cloudinary";
import { CreateGalleryItem } from "@/models/Gallery";

export async function GET() {
  try {
    console.log("📡 Connexion à MongoDB en cours...");

    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db("youlive"); // Remplacez avec le vrai nom de votre base MongoDB
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

export async function POST(req) {
  try { 
    const { type, url, fileName } = await req.json();

    let result;
    if (type === 'image') {
      result = await uploadImageToCloudinary(url);
    } else if (type === 'video') {
      result = await uploadVideoToCloudinary(url);
      // Ajoutez une catégorie spéciale pour video.mp4
      if (fileName === 'video.mp4') {
        result.category = 'special_video';
      }
    } else {
      return new Response(JSON.stringify({ message: 'Type non supporté' }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Enregistrez la ressource dans MongoDB
    const newItem = new CreateGalleryItem({
      type,
      url: result.url, // Utilisez l'URL Cloudinary
      public_id: result.public_id,
      category: result.category || 'regular'
    });

    await newItem.save();

    return new Response(JSON.stringify({ message: 'Ressource ajoutée avec succès', data: newItem }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la ressource:', error);
    return new Response(JSON.stringify({ message: 'Erreur interne du serveur', error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
