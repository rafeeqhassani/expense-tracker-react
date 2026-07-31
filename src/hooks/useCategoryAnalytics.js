import { useEffect, useState, useCallback } from "react";
import { getCategoryAnalytics } from "../services/categoryAnalyticsApi";

function useCategoryAnalytics(refreshKey, authLoading, token) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategoryAnalytics = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const data = await getCategoryAnalytics();

      setCategories(data);
    } catch (error) {
      console.error("Failed to load category analytics", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading || !token) return;

    loadCategoryAnalytics();
  }, [loadCategoryAnalytics, refreshKey, authLoading, token]);

  return {
    categories,
    loading,
    error,
    loadCategoryAnalytics,
  };
}

export default useCategoryAnalytics;
