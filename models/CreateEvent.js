import { name } from '@stream-io/video-client';
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
    }, // ID de l'utilisateur
  name: { 
    type: String,
    required: [true, 'Le nom est obligatoire'],
    tri: true
  }, // Nom de l'événement
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlenght: 6
  }, // Mot de passe de l'événement
  date: { 
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > Date.now();
      },
      message: 'La date doit être dans le futur'
    }
  }, // Date de l'événement
  startTime: {
    type: String,
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Heure invalide']
  }, // Heure de début
  endTime: {
    type: String,
    validate: {
      validator: function(value) {
        return this.startTime < value;
      },
      message: 'L\'heure de fin doit être après l\'heure de début'
    }
  }, // Heure de fin
 
  numberOfGuests: {
    type: Number,
    min: 1,
    max: 200
  }, // Nombre d'invités
  guests: [{
    guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    email: { type: String, match: [/\S+@\S+\.\S+/, 'Email invalide']} 
  }], // Liste des invités avec email
  streamUrl: {
    type: String
  }, // URL du live-stream (rempli après la création du stream)
  playbackUrl: {
    type: String 
  }, // URL de la vidéo après la fin du stream (rempli par Cloudinary)
  isStreamActive: {
    type: Boolean,
    default: false
  } // Statut du stream en cours
}, { timestamps: true });


const CreateEvent = mongoose.models.CreateEvent || mongoose.model('CreateEvent', eventSchema);

export default CreateEvent;
