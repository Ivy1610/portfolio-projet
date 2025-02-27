// components/LiveStream.js
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';

const LiveStream = ({ eventId }) => {
  // Init du client Stream Video
  const videoClient = new StreamVideoClient({
    apiKey: 'n3esdddgvfpz', // API Key
    user: {
      id: 'Ivy24', 
      name: 'Yveline', 
    },
    token: 'USER_TOKEN', // Générez un token côté serveur pour la sécurité
  });

  // rejoindre le canal de streaming
  const call = videoClient.call('livestream', eventId);
  call.join({ create: true });

  return (
    <StreamVideo client={videoClient}>
      <div className="bg-black aspect-video rounded-lg overflow-hidden">
        <video
          controls
          autoPlay
          src={call.camera.url} // URL du flux vidéo
          className="w-full h-full"
        />
      </div>
    </StreamVideo>
  );
};

export default LiveStream;