export default async function handler(req, res) {
    const { channelName } = req.query;
    const clientId = process.env.TWITCH_CLIENT_ID;
    const accessToken = process.env.TWITCH_ACCESS_TOKEN;
  
    if (!channelName) {
      return res.status(400).json({ error: "Le nom du canal est requis." });
    }
  
    try {
      const response = await fetch(
        `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
        {
          headers: {
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const data = await response.json();
      
      if (data.data.length === 0) {
        return res.status(404).json({ message: "Le stream est hors ligne." });
      }
  
      res.status(200).json(data.data[0]);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération du stream." });
    }
  }
  