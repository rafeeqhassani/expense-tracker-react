import { useCallback, useState } from "react";

function useCategoriesRefresh() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshCategories = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return {
    refreshKey,
    refreshCategories,
  };
}

export default useCategoriesRefresh;
