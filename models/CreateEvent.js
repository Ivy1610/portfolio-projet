import { name } from '@stream-io/video-client';
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID de l'utilisateur créateur
  name: { type: String, required: true }, // Nom de l'événement
  password: { type: String, required: true }, // Mot de passe de l'événement
  date: { type: Date, required: true }, // Date de l'événement
  startTime: { type: String, required: true }, // Heure de début
  endTime: { type: String, required: true }, // Heure de fin
  numberOfGuests: { type: Number, required: true }, // Nombre d'invités
  guests: [{ guestId: String, email: String }], // Liste des invités
  streamUrl: { type: String }, // URL du live-stream (rempli après la création du stream)
  playbackUrl: { type: String }, // URL de la vidéo après la fin du stream (rempli par Cloudinary)
  isStreamActive: { type: Boolean, default: false }, // Statut du stream (actif/inactif)
});

const CreateEvent = mongoose.models.CreateEvent || mongoose.model('CreateEvent', eventSchema);

export default CreateEvent;
