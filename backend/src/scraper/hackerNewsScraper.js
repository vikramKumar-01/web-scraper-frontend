import env from "../config/env.js";
import logger from "../utils/logger.js";
import { fetchHtml } from "./httpClient.js";
import { parseTopStories } from "./parser.js";
import { transformStories } from "./transformer.js";
import { saveStories } from "./storyRepository.js";

export async function executeScraper({ trigger = "manual" } = {}) {
  logger.info("Scraper started.", {
    trigger,
    source: env.scraperSourceUrl,
    limit: env.scraperStoryLimit
  });

  const html = await fetchHtml(env.scraperSourceUrl);
  const rawStories = parseTopStories(html, env.scraperStoryLimit);
  const { stories, skipped } = transformStories(rawStories, env.scraperSourceUrl);

  if (skipped.length) {
    logger.warn("Some stories were skipped during transformation.", {
      skippedCount: skipped.length,
      skipped
    });
  }

  const persistence = await saveStories(stories);

  logger.info("Scraper completed.", {
    trigger,
    fetchedCount: rawStories.length,
    validCount: stories.length,
    skippedCount: skipped.length,
    ...persistence
  });

  return {
    success: true,
    message: "Stories scraped successfully",
    count: stories.length,
    skippedCount: skipped.length,
    persistence
  };
}
