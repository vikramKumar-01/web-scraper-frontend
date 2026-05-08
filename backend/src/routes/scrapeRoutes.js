import { Router } from "express";
import { runScraper } from "../controllers/scrapeController.js";
import { getStories } from "../controllers/storyController.js";

const router = Router();

router.get("/stories", getStories);
router.post("/scrape", runScraper);

export default router;
