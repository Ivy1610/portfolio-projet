import jwt from 'jsonwebtoken';

// Clé secrète stockée dans les variables d'environnement
const SECRET_KEY = process.env.JWT_SECRET || 'uzumakinaruto19283';

// 🔹 Générer un token pour un utilisateur/invité
export const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '2h' });
};

// 🔹 Vérifier un token JWT reçu (ex: accès à un événement)
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
