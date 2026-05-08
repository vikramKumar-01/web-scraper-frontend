import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    points: {
      type: Number,
      default: 0
    },
    author: {
      type: String,
      default: "Unknown",
      trim: true
    },
    postedAt: {
      type: String,
      default: "Unknown"
    }
  },
  {
    timestamps: true
  }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
