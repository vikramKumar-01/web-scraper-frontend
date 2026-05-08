import { isValidHttpUrl, isValidStoryPayload } from "./validators.js";

function cleanText(value, fallback = "") {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : fallback;
}

function parsePoints(value) {
  const match = cleanText(value).match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function normalizeUrl(value, baseUrl) {
  const rawUrl = cleanText(value);
  if (!rawUrl) return null;

  try {
    const normalized = new URL(rawUrl, baseUrl).toString();
    return isValidHttpUrl(normalized) ? normalized : null;
  } catch {
    return null;
  }
}

export function transformStory(rawStory, baseUrl) {
  const story = {
    title: cleanText(rawStory.title),
    url: normalizeUrl(rawStory.url, baseUrl),
    points: parsePoints(rawStory.points),
    author: cleanText(rawStory.author, "Unknown"),
    postedAt: cleanText(rawStory.postedAt, "Unknown")
  };

  if (!isValidStoryPayload(story)) {
    return null;
  }

  return story;
}

export function transformStories(rawStories, baseUrl) {
  const stories = [];
  const skipped = [];

  rawStories.forEach((rawStory, index) => {
    const transformed = transformStory(rawStory, baseUrl);

    if (!transformed) {
      skipped.push({
        index,
        title: rawStory.title || null,
        reason: "Validation failed"
      });
      return;
    }

    stories.push(transformed);
  });

  return { stories, skipped };
}
