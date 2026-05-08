import { formatRelativeTime } from "../../utils/formatters";

function StoryCard({
  story,
  onToggleBookmark,
  bookmarkLoading,
  isAuthenticated,
  actionLabel = "Bookmark",
  bookmarkedLabel = "Bookmarked"
}) {
  return (
    <article className="card group flex h-full min-w-0 flex-col border-white/80 bg-white/95 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-ember">
            {story.points} points
          </span>
          <span className="inline-flex rounded-full bg-sand px-3 py-1 text-xs font-semibold text-slate">
            {story.author}
          </span>
        </div>
        <span className="text-sm text-slate">{formatRelativeTime(story.createdAt)}</span>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold leading-tight text-ink transition group-hover:text-ember sm:text-xl">
          {story.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate">
          Open the original story, review the discussion momentum, and save it if it belongs in your shortlist.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={story.url}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary w-full text-center sm:w-auto"
        >
          Read story
        </a>

        {onToggleBookmark && isAuthenticated ? (
          <button
            type="button"
            disabled={bookmarkLoading}
            onClick={() => onToggleBookmark(story)}
            className={`${story.isBookmarked ? "btn-accent" : "btn-primary"} w-full sm:w-auto`}
          >
            {bookmarkLoading ? "Saving..." : story.isBookmarked ? bookmarkedLabel : actionLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default StoryCard;
