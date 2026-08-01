import { useCallback, useEffect, useState } from "react";

import { getActivities } from "../services/activityApi";

const ACTIVITY_PREVIEW_LIMIT = 10;

function useActivityPreview(refreshKey, authLoading, token) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const loadActivityPreview = useCallback(async () => {
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

      setActivities([]);
      setHasMore(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setActivities([]);
      setHasMore(false);
      setLoading(false);
      setError(null);
      return;
    }

    if (authLoading) return;

    loadActivityPreview();
  }, [refreshKey, authLoading, token, loadActivityPreview]);

  return {
    activities,
    loading,
    error,
    hasMore,
    loadActivityPreview,
  };
}

export default useActivityPreview;
