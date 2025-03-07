import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

export function CreateGalleryItem(data) {
  return new Gallery(data);
}

export default Gallery;
