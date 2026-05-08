import * as cheerio from "cheerio";
import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

export function parseTopStories(html, limit) {
  if (!html || typeof html !== "string") {
    throw new AppError("Invalid HTML received for parsing.", 500);
  }

  const $ = cheerio.load(html);
  const storyRows = $("tr.athing").slice(0, limit);

  if (!storyRows.length) {
    throw new AppError("No story rows found in source HTML.", 502);
  }

  const stories = [];

  storyRows.each((index, element) => {
    const storyRow = $(element);
    const subtextRow = storyRow.next();

    const titleLink = storyRow.find(".titleline a").first();
    const score = subtextRow.find(".score").first().text();
    const author = subtextRow.find(".hnuser").first().text();
    const postedAt = subtextRow.find(".age").first().text();

    stories.push({
      title: titleLink.text(),
      url: titleLink.attr("href"),
      points: score,
      author,
      postedAt
    });
  });

  logger.info("HTML parsed successfully.", { extractedCount: stories.length });
  return stories;
}
