import { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Alert from "../components/ui/Alert";
import EmptyState from "../components/ui/EmptyState";
import Loader from "../components/ui/Loader";
import StoryGrid from "../components/story/StoryGrid";
import { getBookmarks, removeBookmark, toggleStoryBookmark } from "../services/storyService";
import { normalizeStory } from "../utils/formatters";
import { normalizeBookmarkEntries } from "../utils/apiMappers";

function Bookmarks() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStoryId, setActiveStoryId] = useState(null);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getBookmarks();
      const entries = normalizeBookmarkEntries(response);
      const normalized = entries
        .map(({ raw, storyId, bookmarkId }) =>
          normalizeStory({
            ...raw,
            ...raw.story,
            storyId,
            isBookmarked: true,
            bookmarkId
          })
        )
        .filter((story) => story.id && story.title);
      setStories(normalized);
    } catch (requestError) {
      setError(requestError.message || "Unable to load bookmarks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const handleRemoveBookmark = async (story) => {
    setActiveStoryId(story.id);
    const previousStories = stories;
    setStories((currentStories) => currentStories.filter((item) => item.id !== story.id));

    try {
      if (story.bookmarkId) {
        try {
          await removeBookmark(story.bookmarkId);
        } catch (requestError) {
          if (requestError.status === 404 || requestError.status === 400) {
            await toggleStoryBookmark(story.id);
          } else {
            throw requestError;
          }
        }
      } else {
        await toggleStoryBookmark(story.id);
      }
    } catch (requestError) {
      setStories(previousStories);
      setError(requestError.message || "Unable to remove bookmark.");
    } finally {
      setActiveStoryId(null);
    }
  };

  return (
    <section className="page-section">
      <PageHeader
        eyebrow="Saved stories"
        title="Your bookmark collection"
        description="Everything you decided to keep lives here. Remove items when they are no longer relevant, or open the original story to continue reading."
      />

      {error ? (
        <div className="mb-6">
          <Alert
            title="Could not fetch bookmarks"
            message={error}
            action={
              <button type="button" className="btn-primary" onClick={fetchBookmarks}>
                Retry
              </button>
            }
          />
        </div>
      ) : null}

      {loading ? (
        <Loader label="Loading bookmarks..." />
      ) : stories.length ? (
        <StoryGrid
          stories={stories}
          onToggleBookmark={handleRemoveBookmark}
          activeStoryId={activeStoryId}
          isAuthenticated
          actionLabel="Bookmark"
          bookmarkedLabel="Remove Bookmark"
        />
      ) : (
        <EmptyState
          title="No bookmarks yet"
          message="Save stories from the home feed to create a personal list of links worth revisiting."
        />
      )}
    </section>
  );
}

export default Bookmarks;
