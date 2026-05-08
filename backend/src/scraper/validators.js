export function isNonEmptyText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function isValidStoryPayload(story) {
  return (
    isNonEmptyText(story.title) &&
    isValidHttpUrl(story.url) &&
    Number.isFinite(story.points) &&
    isNonEmptyText(story.author) &&
    isNonEmptyText(story.postedAt)
  );
}
