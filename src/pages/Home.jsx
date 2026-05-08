import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import Alert from "../components/ui/Alert";
import EmptyState from "../components/ui/EmptyState";
import Pagination from "../components/ui/Pagination";
import StoryGrid from "../components/story/StoryGrid";
import StorySkeletonGrid from "../components/story/StorySkeletonGrid";
import useStoryBookmark from "../hooks/useStoryBookmark";
import { useAuth } from "../context/AuthContext";
import { getBookmarks, getStories } from "../services/storyService";
import { normalizeStory } from "../utils/formatters";
import { extractStoryCollection, normalizeBookmarkEntries } from "../utils/apiMappers";

function Home() {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const syncStoryFromBookmarkResponse = (response, storyId) => {
    setStories((currentStories) =>
      currentStories.map((story) => {
        if (story.id !== storyId) return story;

        return {
          ...story,
          isBookmarked:
            response?.isBookmarked ??
            response?.bookmarked ??
            !story.isBookmarked,
          bookmarkId:
            response?.bookmarkId ??
            response?.bookmark?._id ??
            story.bookmarkId ??
            null
        };
      })
    );
  };

  const { activeStoryId, toggleBookmark } = useStoryBookmark(syncStoryFromBookmarkResponse);

  const applyBookmarkState = useCallback(async (baseStories) => {
    if (!isAuthenticated || !baseStories.length) {
      return baseStories.map((story) => ({
        ...story,
        isBookmarked: false,
        bookmarkId: null
      }));
    }

    try {
      const bookmarkResponse = await getBookmarks();
      const bookmarks = normalizeBookmarkEntries(bookmarkResponse);
      const bookmarkIdMap = new Map();
      const bookmarkUrlMap = new Map();
      const bookmarkTitleMap = new Map();

      bookmarks.forEach((item) => {
        if (item.storyId) {
          bookmarkIdMap.set(item.storyId, item.bookmarkId);
        }

        if (item.storyUrl) {
          bookmarkUrlMap.set(item.storyUrl, item.bookmarkId);
        }

        if (item.title) {
          bookmarkTitleMap.set(item.title.trim().toLowerCase(), item.bookmarkId);
        }
      });

      return baseStories.map((story) => ({
        ...story,
        isBookmarked:
          bookmarkIdMap.has(story.id) ||
          bookmarkUrlMap.has(story.url) ||
          bookmarkTitleMap.has(story.title.trim().toLowerCase()),
        bookmarkId:
          bookmarkIdMap.get(story.id) ||
          bookmarkUrlMap.get(story.url) ||
          bookmarkTitleMap.get(story.title.trim().toLowerCase()) ||
          story.bookmarkId ||
          null
      }));
    } catch {
      return baseStories;
    }
  }, [isAuthenticated]);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getStories({ page, limit: 10 });
      const { items, meta } = extractStoryCollection(response);

      const normalizedStories = items
        .map(normalizeStory)
        .filter((story) => story.id && story.title)
        .sort((a, b) => b.points - a.points);

      const storiesWithBookmarks = await applyBookmarkState(normalizedStories);

      setStories(storiesWithBookmarks);
      setPagination({
        totalPages: meta.totalPages || response.totalPages || response?.data?.totalPages || 1,
        total: meta.total || response.total || response?.data?.total || storiesWithBookmarks.length
      });
    } catch (requestError) {
      setError(requestError.message || "Unable to fetch stories right now.");
    } finally {
      setLoading(false);
    }
  }, [applyBookmarkState, page]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleBookmarkToggle = async (story) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/" } } });
      return;
    }

    const previousValue = story.isBookmarked;

    setStories((currentStories) =>
      currentStories.map((currentStory) =>
        currentStory.id === story.id
          ? { ...currentStory, isBookmarked: !currentStory.isBookmarked }
          : currentStory
      )
    );

    try {
      await toggleBookmark(story.id);
      const refreshedStories = await applyBookmarkState(
        stories.map((currentStory) =>
          currentStory.id === story.id
            ? { ...currentStory, isBookmarked: !previousValue }
            : currentStory
        )
      );
      setStories(refreshedStories);
    } catch (requestError) {
      setStories((currentStories) =>
        currentStories.map((currentStory) =>
          currentStory.id === story.id
            ? { ...currentStory, isBookmarked: previousValue }
            : currentStory
        )
      );
      setError(requestError.message || "Unable to update bookmark.");
    }
  };

  return (
    <section className="page-section">
      <PageHeader
        eyebrow="Live feed"
        title="Scraped Hacker News stories ranked by momentum"
        description="Review the latest stories from your scraper pipeline, open source links, and save the high-value ones to your personal bookmark collection."
      />

      {error ? (
        <div className="mb-6">
          <Alert
            title="Something interrupted the feed"
            message={error}
            action={
              <button type="button" className="btn-primary" onClick={fetchStories}>
                Retry
              </button>
            }
          />
        </div>
      ) : null}

      {loading ? (
        <StorySkeletonGrid />
      ) : stories.length ? (
        <>
          <StoryGrid
            stories={stories}
            onToggleBookmark={handleBookmarkToggle}
            activeStoryId={activeStoryId}
            isAuthenticated={isAuthenticated}
            actionLabel="Bookmark"
            bookmarkedLabel="Bookmarked"
          />
          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyState
          title="No stories available yet"
          message="The scraper has not produced any stories for this page. Trigger the backend scraper or check again shortly."
        />
      )}
    </section>
  );
}

export default Home;
