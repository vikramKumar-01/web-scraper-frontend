import axios from "axios";
import env from "../config/env.js";
import logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";

const scraperHttpClient = axios.create({
  timeout: env.scraperTimeoutMs,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; WebScraperAssignment/1.0; +https://news.ycombinator.com)",
    Accept: "text/html,application/xhtml+xml"
  }
});

export async function fetchHtml(url) {
  try {
    const response = await scraperHttpClient.get(url);
    logger.info("HTML request completed.", {
      url,
      status: response.status,
      bytes: response.data?.length || 0
    });
    return response.data;
  } catch (error) {
    const isTimeout = error.code === "ECONNABORTED";
    const message = isTimeout
      ? "Scraper request timed out."
      : "Unable to fetch source HTML.";

    throw new AppError(message, 502, {
      url,
      code: error.code || null,
      originalMessage: error.message
    });
  }
}

export default scraperHttpClient;
