import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "live", "completed"],
      default: "upcoming", // L'événement commence à "à venir"
    },
    liveStream: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LiveStream", // Associer un live à un événement
    },
    media: [
      {
        type: { type: String, enum: ["image", "video"] },
        url: String,
        public_id: String, // ID Cloudinary
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
