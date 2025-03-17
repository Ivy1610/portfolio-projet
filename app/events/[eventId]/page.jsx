"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

// ✅ Chargement dynamique pour SSR
const LiveStream = dynamic(() => import('../../../components/Livestream'),
{
  ssr: false,
  loagind: () => <p>Chargement du lecteur vidéo...</p>
});

const Chat = dynamic(() => import('../../../components/chat'),
{
  ssr: false,
  loading: () => <p>Chargement du chat...</p>
});

export default function EventPage() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (!res.ok) throw new Error('Événement non trouvé');
        const data = await res.json();
        setEventDetails(data);
      } catch (error) {
        console.error(error);
        router.push('/events');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [eventId, router]);

  if (loading)
    return <div className="text-center p-8">Chargement en cours...</div>;

  if (!eventDetails)
    return <div className="text-center p-8 text-red-500">Événement non trouvé</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        {eventDetails?.name} -{" "}
        {eventDetails?.date
        ? new Date(eventDetails.date).toLocaleDateString('fr-FR')
      : "date inconnue"}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="mb-8">
          <LiveStream eventId={eventId} streamUrl={eventDetails.streamUrl}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md h-[500px] flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Chat en direct</h2>
          <div className="flex-grow">
            <Chat eventId={eventId} />
          </div>
        </div>
      </div>
    </div>
  );
}
