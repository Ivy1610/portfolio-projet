"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useRouter } from "next/navigation";

export default function EventPage({ params }) {
  const { id } = params; // Récupère l'ID de l'événement depuis l'URL
  const router = useRouter();
  
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error("Événement non trouvé");
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
        router.push("/404");
      }
    };

    const initChat = async () => {
      const client = new StreamChat(process.env.NEXT_PUBLIC_GETSTREAM_API_KEY);
      const response = await fetch("/api/chat/token");
      const { token, userId } = await response.json();
      setUserId(userId);

      await client.connectUser({ id: userId, name: userId }, token);

      const chatChannel = client.channel("messaging", `event-${id}`, {
        name: `Chat de l'événement ${id}`,
      });

      await chatChannel.watch();
      setChannel(chatChannel);
      setChatClient(client);

      chatChannel.on("message.new", (event) => {
        setMessages((prev) => [...prev, event.message]);
      });
    };

    fetchEvent();
    initChat();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, [id]);

  const sendMessage = async () => {
    if (channel && newMessage.trim() !== "") {
      await channel.sendMessage({ text: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div className="p-6">
      {event ? (
        <>
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="text-gray-600">{event.description}</p>

          {/* 📡 Intégration du Live Stream YouTube */}
          {event.stream_url && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Live Streaming</h2>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${event.stream_url}`}
                title="Live Streaming"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* 💬 Chat en temps réel */}
          <div className="mt-6 p-4 border rounded-lg bg-gray-100">
            <h2 className="text-lg font-semibold">Chat en direct</h2>
            <p className="text-sm text-gray-500">Connecté en tant que : {userId}</p>

            <div className="h-64 overflow-auto border p-2 bg-white">
              {messages.map((msg, index) => (
                <p key={index} className="bg-gray-200 p-1 rounded-md my-1">
                  <strong>{msg.user.name}:</strong> {msg.text}
                </p>
              ))}
            </div>

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écris un message..."
              className="w-full border p-2 mt-2"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white p-2 mt-2 rounded">
              Envoyer
            </button>
          </div>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}