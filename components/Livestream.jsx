"use client"; // Indique que ce composant est côté client

import React from "react"; // utilisée pour créer des composants

const TwitchLive = () => {
  const channelName = "selii_mllr"; // stoker le nom de la chaîne Twitch

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", position: "relative", paddingTop: "56.25%" }}>
      <iframe
        src={`https://player.twitch.tv/?channel=${channelName}&parent=localhost`}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          border: "none"
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default TwitchLive;