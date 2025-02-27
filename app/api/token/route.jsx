import db from '@/utils/db'; // Connexion à la DB
import { NextResponse } from "next/server";

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
  


  const events = [
    { id: "1", title: "DemoDay", date: "20 Mars", description: "Présentation des projets." },
    { id: "2", title: "Mariage de Sophie et Paul", date: "25 Novembre", description: "Un mariage mémorable." },
    { id: "3", title: "Concert Live", date: "5 Décembre", description: "Soirée musicale incroyable." }
  ];
  
  export async function GET() {
    return NextResponse.json(events);
  }
  