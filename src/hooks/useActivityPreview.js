import { useEffect, useState } from "react";

import { getActivities } from "../services/activityApi";

const ACTIVITY_PREVIEW_LIMIT = 10;

function useActivityPreview(refreshKey, authLoading, token) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (authLoading || !token) return;

    async function loadActivityPreview() {
      try {
        setLoading(true);
        setError(null);

        const data = await getActivities({
          page: 1,
          limit: ACTIVITY_PREVIEW_LIMIT,
        });

        setActivities(data.activities);
        setHasMore(data.pagination?.hasMore ?? false);
      } catch (error) {
        console.error("Failed to load activity preview", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivityPreview();
  }, [refreshKey, authLoading, token]);

  return {
    activities,
    loading,
    error,
    hasMore,
  };
}

export default useActivityPreview;
