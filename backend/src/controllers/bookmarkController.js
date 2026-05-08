import Story from "../models/Story.js";
import Bookmark from "../models/Bookmark.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({})
    .populate("story")
    .lean();

  res.status(200).json({
    success: true,
    bookmarks
  });
});

export const toggleStoryBookmark = asyncHandler(async (req, res) => {
  const storyId = req.params.storyId;

  if (!storyId) {
    throw new AppError("Story ID is required.", 400);
  }

  const story = await Story.findById(storyId);
  if (!story) {
    throw new AppError("Story not found.", 404);
  }

  const existingBookmark = await Bookmark.findOne({ story: story._id });
  if (existingBookmark) {
    await existingBookmark.deleteOne();

    return res.status(200).json({
      success: true,
      isBookmarked: false,
      bookmarkId: existingBookmark._id
    });
  }

  const bookmark = await Bookmark.create({ story: story._id });
  const populatedBookmark = await Bookmark.findById(bookmark._id)
    .populate("story")
    .lean();

  res.status(201).json({
    success: true,
    isBookmarked: true,
    bookmarkId: populatedBookmark._id,
    bookmark: populatedBookmark
  });
});

export const removeBookmark = asyncHandler(async (req, res) => {
  const bookmarkId = req.params.bookmarkId;

  if (!bookmarkId) {
    throw new AppError("Bookmark ID is required.", 400);
  }

  const bookmark = await Bookmark.findById(bookmarkId);
  if (!bookmark) {
    throw new AppError("Bookmark not found.", 404);
  }

  await bookmark.deleteOne();

  res.status(200).json({
    success: true
  });
});
