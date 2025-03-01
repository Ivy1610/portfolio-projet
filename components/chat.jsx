"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput } from "stream-chat-react";

const ChatComponent = ({ user, eventId }) => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance("n3esdddgvfpz"); // Votre API Key

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

      const channel = client.channel("messaging", `event-${eventId}`, {
        name: `Event ${eventId}`,
        members: [user.id],
      });

      await channel.watch();

      setChatClient(client);
    };

    initChat();

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