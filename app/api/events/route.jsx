import { connectToMongoose } from '@/lib/mongodb';
import CreateEvent from '@/models/CreateEvent';

export async function POST(request) {
  try {
    // Connexion à MongoDB
    await connectToMongoose();

    // Récupérer les données de la requête
    const { userId, password, date, startTime, endTime, numberOfGuests } = await request.json();

    // Créer un nouvel événement
    const newCreateEvent = new CreateEvent({
      userId,
      password,
      date,
      startTime,
      endTime,
      numberOfGuests,
      guests: [], // Initialiser une liste vide d'invités
    });

    // Sauvegarder l'événement dans la base de données
    await newCreateEvent.save();

    // Générer des liens pour les invités
    const guestLinks = [];
    for (let i = 0; i < numberOfGuests; i++) {
      const guestId = `guest-${newCreateEvent._id}-${i}`; // Générer un ID unique pour chaque invité
      const guestLink = `https://votresite.com/join-event?eventId=${newCreateEvent._id}&guestId=${guestId}&password=${password}`;
      guestLinks.push(guestLink);

      // Ajouter l'invité à la liste des invités de l'événement
      newCreateEvent.guests.push({ guestId });
    }

    // Mettre à jour l'événement avec les invités
    await newCreateEvent.save();

    // Retourner les liens générés (pour les envoyer par e-mail ou autre)
    return new Response(JSON.stringify({ event: newCreateEvent, guestLinks }), { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
}
