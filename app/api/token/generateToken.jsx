'use client'
import { StreamChat } from 'stream-chat';

export default function handler(req, res) {
  const { userId } = req.query;

  // Initialisez le client Stream Chat côté serveur
  const serverClient = StreamChat.getInstance(
    'n3esdddgvfpz', // Votre API Key
    'ukzx8hnm9yfxv626z98j5q4zv7sgxm48q4cgwaex4g4m6ztxwarnbteaprmhjyt6' // Remplacez par votre API Secret
  );

  // Créez un token pour l'utilisateur
  const token = serverClient.createToken(userId);
  res.status(200).json({ token });
}