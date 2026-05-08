import Story from "../models/Story.js";
import logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";

export async function saveStories(stories) {
  if (!stories.length) {
    return {
      insertedCount: 0,
      updatedCount: 0,
      duplicateCount: 0,
      totalProcessed: 0
    };
  }

  try {
    const existingStories = await Story.find({
      url: { $in: stories.map((story) => story.url) }
    })
      .select("url")
      .lean();

    const existingUrls = new Set(existingStories.map((story) => story.url));
    const duplicateCount = stories.filter((story) => existingUrls.has(story.url)).length;

    const operations = stories.map((story) => ({
      updateOne: {
        filter: { url: story.url },
        update: {
          $set: {
            title: story.title,
            points: story.points,
            author: story.author,
            postedAt: story.postedAt,
            url: story.url
          }
        },
        upsert: true
      }
    }));

    const result = await Story.bulkWrite(operations, { ordered: false });

    const insertedCount = result.upsertedCount || 0;
    const updatedCount = result.modifiedCount || 0;

    logger.info("Stories persisted successfully.", {
      insertedCount,
      updatedCount,
      duplicateCount,
      totalProcessed: stories.length
    });

    if (duplicateCount > 0) {
      logger.info("Duplicate stories detected and updated instead of inserted.", {
        duplicateCount
      });
    }

    return {
      insertedCount,
      updatedCount,
      duplicateCount,
      totalProcessed: stories.length
    };
  } catch (error) {
    throw new AppError("Failed to save stories to MongoDB.", 500, {
      originalMessage: error.message
    });
  }
}
