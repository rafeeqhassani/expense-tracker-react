import { useCallback, useState } from "react";

function useActivityRefresh() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshActivities = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return {
    refreshKey,
    refreshActivities,
  };
}

export default useActivityRefresh;
