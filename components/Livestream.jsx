"use client";

const LiveStream = ({ eventId }) => {
  const streamUrl = ""; // ID de la vidéo YouTube

  return (
    <div className="w-full">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${streamUrl}`}
        title="Live Streaming"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default LiveStream;