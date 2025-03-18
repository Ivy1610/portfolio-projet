import { NextResponse } from 'next/server';
import { connectToMongoose } from '../../../lib/mongodb';
import CreateEvent from '../../../models/CreateEvent';

export async function POST(request, { params }) {
  try {
    const { eventId } = params;
    const { guestId, password } = await request.json();

    // Connexion à MongoDB
    await connectToMongoose();

    // Vérifier l'accès à l'événement
    const event = await CreateEvent.findById(eventId);
    if (!event) {
      return NextResponse.json({ message: 'Événement non trouvé' }, { status: 404 });
    }

    // Vérifier le mot de passe (à adapter selon votre logique)
    const guest = event.guests.find(g => g.guestId === guestId && g.password === password);
    if (!guest) {
      return NextResponse.json({ message: 'Mot de passe incorrect' }, { status: 401 });
    }

    // Ajouter le guest à l'événement (à adapter selon votre logique)
    event.guests.push({ guestId, password });
    await event.save();

    return NextResponse.json({ message: 'Rejoint avec succès' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

