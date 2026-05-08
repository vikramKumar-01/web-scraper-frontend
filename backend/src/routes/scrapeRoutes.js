import { Router } from "express";
import { runScraper } from "../controllers/scrapeController.js";
import { getStories } from "../controllers/storyController.js";
import {
  getBookmarks,
  removeBookmark,
  toggleStoryBookmark
} from "../controllers/bookmarkController.js";

const router = Router();

router.get("/stories", getStories);
router.post("/stories/:storyId/bookmark", toggleStoryBookmark);
router.get("/bookmarks", getBookmarks);
router.delete("/bookmarks/:bookmarkId", removeBookmark);
router.post("/scrape", runScraper);

export default router;
