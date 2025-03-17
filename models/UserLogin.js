// models/UserLogin.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,

  },
  // Ajoutez d'autres champs si nécessaire
});

const UserLogin = mongoose.models.UserLogin || mongoose.model('UserLogin', UserSchema);

export default UserLogin;
