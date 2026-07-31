import { useCallback, useState } from "react";

function useAnalyticsRefresh() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAnalytics = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return {
    refreshKey,
    refreshAnalytics,
  };
}

export default useAnalyticsRefresh;
