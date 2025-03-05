import { StreamChat } from 'stream-chat';

export const POST = async (req) => {
  try {
    // Récupérer les données de la requête (ici, l'ID de l'utilisateur)
    const { userId } = await req.json();

    // Vérifiez que l'ID de l'utilisateur est fourni
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'L\'ID de l\'utilisateur est requis' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Créer une instance du client Stream avec la clé API
    const chatClient = StreamChat.getInstance('votre_clé_api_stream');

    // Créer un token pour cet utilisateur
    const token = chatClient.createToken(userId);

    // Retourner le token dans la réponse
    return new Response(
      JSON.stringify({ token }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur lors de la création du token :', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création du token' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
