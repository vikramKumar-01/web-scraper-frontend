import asyncHandler from "../utils/asyncHandler.js";
import { executeScraper } from "../scraper/hackerNewsScraper.js";

export const runScraper = asyncHandler(async (req, res) => {
  const result = await executeScraper({ trigger: "api" });

  res.status(200).json(result);
});
