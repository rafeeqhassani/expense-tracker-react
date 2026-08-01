import { useEffect, useState, useCallback } from "react";
import { getCategories } from "../services/categoryApi";

function useCategories(refreshKey, authLoading, token) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories", error);
      setCategories([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setCategories([]);
      setLoading(false);
      setError(null);
      return;
    }

    if (authLoading) return;

    loadCategories();
  }, [refreshKey, authLoading, token, loadCategories]);

  return {
    categories,
    loading,
    error,
    loadCategories,
  };
}

export default useCategories;
