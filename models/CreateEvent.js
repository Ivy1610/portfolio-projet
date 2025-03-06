import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID de l'utilisateur créateur
  password: { type: String, required: true }, // Mot de passe de l'événement
  date: { type: Date, required: true }, // Date de l'événement
  startTime: { type: String, required: true }, // Heure de début
  endTime: { type: String, required: true }, // Heure de fin
  numberOfGuests: { type: Number, required: true }, // Nombre d'invités
  guests: [{ guestId: String, email: String }], // Liste des invités avec leur ID et e-mail
});

const CreateEvent = mongoose.models.CreateEvent || mongoose.model('CreateEvent', eventSchema);

export default CreateEvent;
