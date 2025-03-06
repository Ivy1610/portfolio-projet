import { StreamVideoClient } from "@stream-io/video-client";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "userId est requis" }), {
      status: 400,
    });
  }

  const serverClient = new StreamVideo({
    apiKey: process.env.STREAM_API_KEY,
    secret: process.env.STREAM_API_SECRET,
  });

  try {
    const token = serverClient.createToken(userId);
    await serverClient.updateUser({ id: userId, role: "viewer" });
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (err) {
    console.error("Erreur lors de la génération du token :", err);
    return new Response(
      JSON.stringify({ error: "Erreur lors de la génération du token" }),
      { status: 500 }
    );
  }
}