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

export async function GET(request) {
  try {
    // Connexion à MongoDB
    await connectToMongoose();
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    console.log('Recherche des événements de l\'utilisateur:', userId);

    if (!userId) {
      return NextResponse.json({ error: 'Veuillez fournir un ID d\'utilisateur' },
        { status: 400 });
    }

    // Récupérer les événements de l'utilisateur
    const events = await CreateEvent.find({ userId });
    console.log('Événements trouvés:', events);

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    return NextResponse.json({ error: 'Erreur serveur' },
      { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToMongoose();
    const body = await request.json();
    const eventDate = new Date(body.date);

    // Vérifier si la date de l'événement est dans le futur
    if (eventDate < new Date()) {
      return NextResponse.json({ error: 'La date de l\'événement doit être dans le futur' },
        { status: 400 });
    }

    // Récupérer les données de la requête
    const requiredFields = ['name', 'password', 'date', 'startTime',
      'endTime', 'numberOfGuests'];
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({
        error: `Veuillez remplir les champs:
          ${missingFields.join(', ')}`
      },
        { status: 400 });
    }

    // Créer un nouvel événement
    const newEvent = new CreateEvent({
      ...body,
      date: new Date(body.date).toISOString().split("T")[0],
      guests: [], // Initialiser une liste vide d'invités
      streamUrl: null,
      playbackUrl: null,
    });

    await newEvent.save();
    console.log('Sauvegarde de l\'événement dans la base de données...');

    // Envoyer les médias à Cloudinary si il y a des fichier a uploader et obtenir les URL
    if (body.mediaFiles && body.mediaFiles.length > 0) {
      const uploadResults = await Promise.all(
        body.mediaFiles.map(file =>
          cloudinary.uploader.upload(file, {
            resource_type: 'auto',
            folder: 'event_media'
          })
        )
      );
      newEvent.mediaUrls = uploadResults.map(result => result.secure_url);
      await newEvent.save();
      console.log('URL des médias ajoutées à l\'événement:', newEvent);
    }

    // Retourner les liens générés (pour les envoyer par e-mail ou autre)
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// Recuperer les événements de l'utilisateur connecté
export async function GET_EVENT(request, { params }) {
  try {
    // Connexion à MongoDB
    await connectToMongoose();
    if (!params || !params.eventId) {
      return NextResponse.json({ error: 'Veuillez fournir un ID d\'événement' },
        { status: 400 });
    }

    const event = await CreateEvent.findById(params.eventId);
    // Vérifier l'accès à l'événement
    if (!event) {
      return NextResponse.json({ error: 'Événement non trouvé' },
        { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement:', error);
    return NextResponse.json({ error: 'Erreur serveur' },
      { status: 500 });
  }
}
