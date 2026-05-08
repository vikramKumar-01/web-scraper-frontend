import api from "./api";

export async function getStories({ page = 1, limit = 10 } = {}) {
  const { data } = await api.get(`/stories?page=${page}&limit=${limit}`);
  return data;
}

export async function getBookmarks() {
  const { data } = await api.get("/bookmarks");
  return data;
}

export async function toggleStoryBookmark(storyId) {
  const { data } = await api.post(`/stories/${storyId}/bookmark`);
  return data;
}

export async function removeBookmark(bookmarkId) {
  const { data } = await api.delete(`/bookmarks/${bookmarkId}`);
  return data;
}
