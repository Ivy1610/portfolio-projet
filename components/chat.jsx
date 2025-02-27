"use client"

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

const ChatComponent = ({ user, eventId }) => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance('n3esdddgvfpz'); // Votre API Key

      // Récupérer le token côté serveur
      const response = await fetch(`/api/token?userId=${user.id}`);
      const { token } = await response.json();

      await client.connectUser(
        {
          id: user.id,
          name: user.name,
        },
        token
      );

      setChatClient(client);
    };

    initChat();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, [user.id, user.name]);

  if (!chatClient) return <div>Loading chat...</div>;

  // Créez un canal de chat pour l'événement
  const channel = chatClient.channel('event', eventId, {
    name: `Événement ${eventId}`,
    members: [user.id],
  });

  return (
    <Chat client={chatClient}>
      <Channel channel={channel}>
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