import { useState } from "react";
import { toggleStoryBookmark } from "../services/storyService";

function useStoryBookmark(onSuccess) {
  const [activeStoryId, setActiveStoryId] = useState(null);

  const toggleBookmark = async (storyId) => {
    setActiveStoryId(storyId);

    try {
      const response = await toggleStoryBookmark(storyId);
      onSuccess?.(response, storyId);
      return response;
    } finally {
      setActiveStoryId(null);
    }
  };

  return {
    activeStoryId,
    toggleBookmark
  };
}

export default useStoryBookmark;
