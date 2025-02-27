import { useEffect, useState } from "react";
import { useRouter} from "next/navigation";
import { Navbar } from './navbar';

export default function Events() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/Event")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Erreur chargement événements", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Événements disponibles</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-3 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => router.push(`/auth?eventId=${event.id}`)}
            >
              Rejoindre
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}