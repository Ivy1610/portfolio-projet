"use client";
import { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion au chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Entrez votre nom"
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;