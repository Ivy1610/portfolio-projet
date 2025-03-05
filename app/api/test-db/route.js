import { connectToMongoose } from "@/lib/mongodb";

export async function GET(req) {
  try {
    await connectToMongoose();
    return Response.json({ message: "✅ Connexion MongoDB réussie !" });
  } catch (error) {
    return Response.json({ error: "❌ Erreur de connexion MongoDB" }, { status: 500 });
  }
}
