import StoryCard from "./StoryCard";

function StoryGrid({
  stories,
  onToggleBookmark,
  activeStoryId,
  isAuthenticated,
  actionLabel,
  bookmarkedLabel
}) {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          onToggleBookmark={onToggleBookmark}
          bookmarkLoading={activeStoryId === story.id}
          isAuthenticated={isAuthenticated}
          actionLabel={actionLabel}
          bookmarkedLabel={bookmarkedLabel}
        />
      ))}
    </div>
  );
}

export default StoryGrid;
