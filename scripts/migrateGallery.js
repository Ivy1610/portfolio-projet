import { CreateGalleryItem } from '../models/Gallery';
import { uploadImageToCloudinary, uploadVideoToCloudinary } from '../lib/cloudinary';

const migrateGallery = async () => {
  const items = await CreateGalleryItem.find();

  for (const item of items) {
    try {
      let cloudinaryUrl;

      if (item.type === 'image') {
        cloudinaryUrl = await uploadImageToCloudinary(item.url);
      } else if (item.type === 'video') {
        cloudinaryUrl = await uploadVideoToCloudinary(item.url);
      }

      if (cloudinaryUrl) {
        item.url = cloudinaryUrl;
        await item.save();
        console.log(`Migré : ${item._id}`);
      }
    } catch (error) {
      console.error(`Erreur lors de la migration de ${item._id}:`, error);
    }
  }

  console.log('Migration terminée');
};

migrateGallery();
