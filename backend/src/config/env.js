import dotenv from "dotenv";

dotenv.config();

const env = {
  port: Number(process.env.PORT || 4500),
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/web-scraper",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  scraperSourceUrl:
    process.env.SCRAPER_SOURCE_URL || "https://news.ycombinator.com",
  scraperTimeoutMs: Number(process.env.SCRAPER_TIMEOUT_MS || 10000),
  scraperStoryLimit: Number(process.env.SCRAPER_STORY_LIMIT || 10)
};

export default env;
