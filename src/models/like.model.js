import mongoose from "mongoose";

const likeSchema = new mongoose.model(
  {
    video: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    comment: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    tweet: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
    likedBy: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Like = mongoose.Schema("Like", likeSchema);
