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

export async function POST(request) {
  try {
    // Connexion à MongoDB
    await connectToMongoose();

    // Récupérer les données de la requête
    const { userId, password, date, startTime, endTime, numberOfGuests } = await request.json();

    // Créer un nouvel événement
    const newEvent = new CreateEvent({
      userId,
      password,
      date,
      startTime,
      endTime,
      numberOfGuests,
      guests: [], // Initialiser une liste vide d'invités
    });

    // Sauvegarder l'événement dans la base de données
    await newEvent.save();

    // Générer des liens pour les invités
    const guestLinks = [];
    for (let i = 0; i < numberOfGuests; i++) {
      const guestId = `guest-${newEvent._id}-${i}`; // Générer un ID unique pour chaque invité
      const guestLink = `https://votresite.com/join-event?eventId=${newEvent._id}&guestId=${guestId}&password=${password}`;
      guestLinks.push(guestLink);

      // Ajouter l'invité à la liste des invités de l'événement
      newEvent.guests.push({ guestId });
    }

    // Mettre à jour l'événement avec les invités
    await newEvent.save();

    // Envoyer les médias à Cloudinary et obtenir les URL
    const mediaUrls = await uploadMediaToCloudinary(newEvent);

    // Mettre à jour l'événement avec les URL des médias
    newEvent.streamUrl = mediaUrls.streamUrl;
    newEvent.playbackUrl = mediaUrls.playbackUrl;
    await newEvent.save();

    // Retourner les liens générés (pour les envoyer par e-mail ou autre)
    return NextResponse.json({ event: newEvent, guestLinks }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

async function uploadMediaToCloudinary(event) {
  // Fonction pour envoyer des médias à Cloudinary
  // A adapter cette fonction selon vos besoins
  const streamUrl = await cloudinary.uploader.upload(event.streamUrl, {
    resource_type: 'video',
    public_id: `stream_${event._id}`,
  });

  const playbackUrl = await cloudinary.uploader.upload(event.playbackUrl, {
    resource_type: 'video',
    public_id: `playback_${event._id}`,
  });

  return {
    streamUrl: streamUrl.secure_url,
    playbackUrl: playbackUrl.secure_url,
  };
}
