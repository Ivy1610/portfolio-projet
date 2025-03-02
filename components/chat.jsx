"use client";
import React from "react"; // Importez React une seule fois
import { StreamChat } from "stream-chat";
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput } from "stream-chat-react";

const ChatComponent = ({ user, eventId }) => {
  const [chatClient, setChatClient] = React.useState(null); // Utilisez React.useState

  React.useEffect(() => { // Utilisez React.useEffect
    const initChat = async () => {
      const client = StreamChat.getInstance("n3esdddgvfpz"); // Votre API Key

      // Récupérer le token côté serveur
      const response = await fetch(`/api/token/video?userId=Ivy24`);
      const { token } = await response.json();

      // Connecter l'utilisateur avec le token
      await client.connectUser(
        {
          id: user.id,
          name: user.name,
        },
        token
      );

      // Créer ou rejoindre un canal de chat
      const channel = client.channel("messaging", `event-${eventId}`, {
        name: `Event ${eventId}`,
        members: [user.id],
      });

      await channel.watch(); // S'abonner au canal

      setChatClient(client);
    };

    initChat();

    // Nettoyer à la destruction du composant
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [eventId, user.id, user.name]);

  if (!chatClient) return <div>Loading chat...</div>;

  return (
    <Chat client={chatClient}>
      <Channel channel={`event-${eventId}`}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default ChatComponent;