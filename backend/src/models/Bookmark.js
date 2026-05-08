import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
