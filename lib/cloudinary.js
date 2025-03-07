import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (imageUrl) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'gallery', // Optionnel : dossier dans Cloudinary
    });
    return result.secure_url; // Retourne l'URL Cloudinary
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image:', error);
    throw error;
  }
};

export const uploadVideoToCloudinary = async (videoUrl) => {
  try {
    const result = await cloudinary.uploader.upload(videoUrl, {
      resource_type: 'video',
      folder: 'gallery', // Optionnel : dossier dans Cloudinary
    });
    return result.secure_url; // Retourne l'URL Cloudinary
  } catch (error) {
    console.error('Erreur lors de l\'upload de la vidéo:', error);
    throw error;
  }
};
