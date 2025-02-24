import db from '@/utils/db'; // Connexion à la DB

export async function GET(req, { params }) {
    try {
      const event = await db.event.findUnique({
        where: { id: params.id },
      });
  
      if (!event) {
        return new Response(JSON.stringify({ message: "Événement introuvable" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(event), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Erreur serveur", error: error.message }), { status: 500 });
    }
  }
  