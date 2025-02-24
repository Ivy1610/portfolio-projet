import { StreamChat } from "stream-chat";
import { randomUUID } from "crypto";

const API_KEY = process.env.GETSTREAM_API_KEY;
const API_SECRET = process.env.GETSTREAM_API_SECRET;

export async function GET() {
  try {
    const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

    // Générer un ID aléatoire pour un invité
    const guestId = `guest-${randomUUID().slice(0, 8)}`;

    // Générer un token
    const token = serverClient.createToken(guestId);

    return new Response(JSON.stringify({ token, userId: guestId }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erreur serveur", error: error.message }), { status: 500 });
  }
}
