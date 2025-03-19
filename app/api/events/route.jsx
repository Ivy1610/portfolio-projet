import { connectToMongoose } from '@/lib/mongodb';
import CreateEvent from '@/models/CreateEvent';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configurer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Gérer la requête GET pour récupérer les événements
export async function GET() {
  try {
    await connectToMongoose();
    const events = await CreateEvent.find().lean(); // Récupère tous les événements depuis MongoDB
    events.forEach(event => event.id = event._id.toString());

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Connexion à MongoDB
    await connectToMongoose();

    // Récupérer les données de la requête
    const { userId, name, password, date, startTime, endTime, numberOfGuests } = await request.json();
    console.log('Données de la requête:', { userId, name, password, date, startTime, endTime, numberOfGuests });

    if (!userId || !name || !password || !date || !startTime || !endTime || !numberOfGuests) {
      return NextResponse.json({ error: 'Veuillez remplir tous les champs' }, { status: 400 });
    }

    // Créer un nouvel événement
    const newEvent = new CreateEvent({
      userId,
      name,
      password,
      date,
      startTime,
      endTime,
      numberOfGuests,
      guests: [], // Initialiser une liste vide d'invités
    });

    console.log('Sauvegarde de l\'événement dans la base de données...');
    await newEvent.save();

    // Envoyer les médias à Cloudinary si il y a des fichier a uploader et obtenir les URL
    if (newEvent.streamURL && newEvent.playbackURl) {
      console.log('Envoi des médias à Cloudinary...');
      const mediaUrls = await uploadMediaToCloudinary(newEvent);

      // Mettre à jour l'événement avec les URL des médias
      newEvent.streamUrl = mediaUrls.streamUrl;
      newEvent.playbackUrl = mediaUrls.playbackUrl;
      await newEvent.save();
    }

    // Retourner les liens générés (pour les envoyer par e-mail ou autre)
    return NextResponse.json({ event: newEvent }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

async function uploadMediaToCloudinary(event) {
  // Vérifier si les URL des médias sont présentes
  if (!event.streamUrl || !event.playbackUrl) {
    console.log('Aucun fichier média trouvé.');
    return {
      streamUrl: null,
      playbackUrl: null,
    };
  }

  try {
    // Fonction pour envoyer des médias à Cloudinary
    const streamUrl = await cloudinary.uploader.upload(event.streamUrl, {
      resource_type: 'video',
      public_id: 'stream_${event._id}', // Dossier dans Cloudinary
    });

    const playbackUrl = await cloudinary.uploader.upload(event.playbackUrl, {
      resource_type: 'video',
      public_id: `playback_${event._id}`,
    });

    return {
      streamUrl: streamUrl.secure_url,
      playbackUrl: playbackUrl.secure_url,
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi des médias à Cloudinary:', error);
    return {
      streamUrl: null,
      playbackUrl: null,
    };
  }
}
