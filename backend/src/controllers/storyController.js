import Story from "../models/Story.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const getStories = asyncHandler(async (req, res) => {
  const page = Number.parseInt(req.query.page ?? "1", 10);
  const limit = Number.parseInt(req.query.limit ?? "10", 10);

  if (Number.isNaN(page) || Number.isNaN(limit) || page < 1 || limit < 1) {
    throw new AppError("Page and limit must be positive integers.", 400);
  }

  const skip = (page - 1) * limit;

  const [stories, total] = await Promise.all([
    Story.find({})
      .sort({ points: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Story.countDocuments({})
  ]);

  res.status(200).json({
    success: true,
    stories,
    page,
    limit,
    total,
    totalPages: total > 0 ? Math.ceil(total / limit) : 1
  });
});
