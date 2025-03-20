// components/GalleryManager.jsx
import { useState } from 'react';
import cloudinary from 'cloudinary-core';

const cl = new cloudinary.Cloudinary({ cloud_name: 'dhgpzkoiz',
  secure: true });

export default function GalleryManager() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [videos, setVideos] = useState([]);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    formData.append('fileName', file.name);
    
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur de réseau ou de reponse serveur');
      }

      const data = await response.json();
      setUrl(data.secure_url);

      console.log('Upload reussi. PID:', data.pid);
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      console.log('PID de la requete:', '4a575598-eebb-4415-9d67-e80aafe22808');
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/get-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, password }),
      });

      if (!response.ok) {
        throw new Error('Erreur de réseau ou de reponse serveur');
      }

      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      console.error("Erreur lors de la recuperation des vidéo:", error);
      alert('Une erreur est survenue lors de la récupération des vidéos.');
    }
  };

  return (
    <div>
      {/* Formulaire d'upload */}
      <form onSubmit={handleUploadSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Télécharger</button>
      </form>
      {url && (
        <div>
          <h3>Fichier téléchargé :</h3>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Voir le fichier
          </a>
        </div>
      )}

      {/* Formulaire de récupération des vidéos */}
      <form onSubmit={handleVideoSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit">Récupérer les vidéos</button>
      </form>
      <div>
        {videos.map((video, index) => (
          <div key={index}>
            <video width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
              Votre navigateur ne supporte pas la balise vidéo.
            </video>
            <a href={video.url} download>
              Télécharger
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
