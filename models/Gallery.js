import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  category: { type: String, enum: ['regular', 'special_video' ], default: 'regular' },
  createdAt: { type: Date, default: Date.now },
});

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

export function CreateGalleryItem(data) {
  return new Gallery(data);
}

export default Gallery;
