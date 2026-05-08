export function formatRelativeTime(value) {
  if (!value) return "Unknown time";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
}

export function normalizeStory(story) {
  return {
    id:
      story.storyId ||
      story.story?._id ||
      story.story?._id ||
      story.id ||
      story.objectID ||
      story._id,
    title: story.title || "Untitled story",
    url: story.url || story.storyUrl || "#",
    author: story.author || "Unknown author",
    points: story.points ?? 0,
    createdAt:
      story.createdAt || story.created_at || story.postedAt || story.storyTime,
    isBookmarked: Boolean(story.isBookmarked || story.bookmarked),
    bookmarkId:
      story.bookmarkId ||
      story.bookmark?._id ||
      story._bookmarkId ||
      story.bookmark?.id ||
      story.savedId ||
      null
  };
}
