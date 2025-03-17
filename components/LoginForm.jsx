"use client";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

const LoginForm = ({ onLogin }) => {
  const [inputUsername, setInputUsername] = useState("");
  const { setUsername } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(inputUsername);
    onLogin(inputUsername);
  };

  return (
    <div className="login-container">
      <h2>Connexion au chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Entrez votre nom"
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
