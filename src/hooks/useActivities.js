import { useState, useEffect } from "react";
import {
  getActivities,
  createActivity,
  clearActivities as clearActivitiesApi,
} from "../services/activityApi";

const ACTIVITIES_PER_PAGE = 20;

function useActivities(refreshKey, authLoading, token) {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (authLoading || !token) return;

    async function loadActivities() {
      try {
        setLoading(true);
        setError(null);

        const data = await getActivities({
          page: 1,
          limit: ACTIVITIES_PER_PAGE,
        });

        setActivities(data.activities);
        setPagination(data.pagination);
        setPage(1);
      } catch (error) {
        console.error("Failed to load activities", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, [refreshKey, authLoading, token]);

  const loadMoreActivities = async () => {
    if (!pagination?.hasMore) return;

    const nextPage = page + 1;

    try {
      setLoadingMore(true);
      setError(null);

      const data = await getActivities({
        page: nextPage,
        limit: ACTIVITIES_PER_PAGE,
      });

      setActivities((prev) => [...prev, ...data.activities]);

      setPagination(data.pagination);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more activities", error);
      setError(error.message);
    } finally {
      setLoadingMore(false);
    }
  };

  const addActivity = async (type, message) => {
    try {
      const activity = await createActivity({ type, message });

      setActivities((prev) => [activity, ...prev]);
    } catch (error) {
      console.error("Failed to create activity", error);
      setError(error.message);
    }
  };

  const handleClearActivities = async () => {
    try {
      await clearActivitiesApi();
      setActivities([]);
      setPagination(null);
      setPage(1);
    } catch (error) {
      console.error("Failed to clear activities", error);
      setError(error.message);
    }
  };

  return {
    activities,
    loading,
    error,
    loadingMore,
    pagination,
    addActivity,
    loadMoreActivities,
    handleClearActivities,
  };
}

export default useActivities;
