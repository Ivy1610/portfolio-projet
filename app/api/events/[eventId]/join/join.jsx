import { NextResponse } from 'next/server';
import { connectToMongoose } from '../../../lib/mongodb';
import CreateEvent from '../../../models/CreateEvent';

export async function GET(request, { params }) {
  try {
    // Connexion à MongoDB
    await connectToMongoose();
    const event = await CreateEvent.findById(params.eventId);

    // Vérifier l'accès à l'événement
    if (!event) {
      return NextResponse.json({ error: 'Événement non trouvé' },
        { status: 404 });
    }

    // Vérifier le mot de passe (pour les invités)
    const { guestId, password } = request.query;
    const guest = event.guests.find(g => g.guestId === guestId && g.password === password);
    if (!guest) {
      return NextResponse.json({ message: 'Mot de passe incorrect' }, { status: 401 });
    }

    // Ajouter le guest à l'événement (à adapter selon votre logique)
    event.guests.push({ guestId, password });
    await event.save();
    

    return NextResponse.json(event, { message: 'Rejoint avec succès' },
      { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' },
      { status: 500 });
  }
}

