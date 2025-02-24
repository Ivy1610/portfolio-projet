import { useState } from "react";
import { useRouter } from "next/router";

export default function Auth() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { eventId } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("eventToken", data.token);
      router.push(`/eventPage?eventId=${eventId}`);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Connexion à l'événement</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full mt-2 p-2 bg-blue-600 text-white rounded">
          Valider
        </button>
      </form>
    </div>
  );
}
