import db from '@/utils/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { eventId, password } = req.body;

    try {
      const event = await db.event.findUnique({ where: { id: eventId } });

      if (!event || event.password !== password) {
        return res.status(401).json({ message: 'Accès refusé' });
      }

      const token = jwt.sign({ eventId }, process.env.JWT_SECRET, { expiresIn: '2h' });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}