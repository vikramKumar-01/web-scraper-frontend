function toArray(value) {
  return Array.isArray(value) ? value : [];
}

export function extractStoryCollection(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      meta: {}
    };
  }

  const nestedData = payload?.data;
  const nestedPagination = payload?.pagination || payload?.meta || nestedData?.pagination || nestedData?.meta || {};
  const candidates = [
    toArray(payload?.stories),
    toArray(payload?.results),
    toArray(nestedData?.stories),
    toArray(nestedData?.results),
    toArray(nestedData)
  ];
  const items = candidates.find((candidate) => candidate.length > 0) || [];

  return {
    items: items.length ? items : [],
    meta: nestedPagination
  };
}

export function extractBookmarkCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  return (
    payload?.bookmarks ||
    payload?.results ||
    payload?.data?.bookmarks ||
    payload?.data?.results ||
    (Array.isArray(payload?.data) ? payload.data : []) ||
    []
  );
}

export function normalizeBookmarkEntries(payload) {
  const bookmarks = extractBookmarkCollection(payload);

  return bookmarks.map((item) => ({
    storyId:
      item.story?._id ||
      item.story?.id ||
      item.storyId ||
      item._storyId ||
      item.id ||
      null,
    storyUrl:
      item.story?.url ||
      item.story?.storyUrl ||
      item.url ||
      item.storyUrl ||
      null,
    title:
      item.story?.title ||
      item.title ||
      null,
    bookmarkId:
      item.bookmarkId ||
      item._id ||
      item.bookmark?._id ||
      item.savedId ||
      null,
    raw: item
  }));
}
