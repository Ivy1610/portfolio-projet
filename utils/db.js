import mongoose from 'mongoose';

// 🔹 URL de connexion à MongoDB (ex: MongoDB Atlas)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/youlivevent';

// 🔹 Fonction pour se connecter à la base de données
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Si déjà connecté, ne pas reconnecter
  }
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connexion à MongoDB réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;