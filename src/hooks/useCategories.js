import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryApi";

function useCategories(refreshKey, authLoading, token) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (authLoading || !token) return;
    async function loadCategories() {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }

    loadCategories();
  }, [refreshKey, authLoading, token]);

  return categories;
}

export default useCategories;
