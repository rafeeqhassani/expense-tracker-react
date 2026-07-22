import { useEffect, useState } from "react";
import {
  getAnalyticsSummary,
  getDashboardStats,
  getChartData,
} from "../services/analyticsApi";

function useAnalytics(showToastMessage, refreshKey) {
  const [summary, setSummary] = useState({
    overall: {},
    filtered: {},
  });

  const [dashboard, setDashboard] = useState({});
  const [charts, setCharts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Analytics reload", refreshKey);

    async function loadAnalytics() {
      try {
        const [summary, dashboardStats, chartData] = await Promise.all([
          getAnalyticsSummary(),
          getDashboardStats(),
          getChartData(),
        ]);

        setSummary(summary);
        setDashboard(dashboardStats);
        setCharts(chartData);
      } catch (error) {
        console.error("Failed to load analytics", error);

        setError(error.message);

        showToastMessage(error.message, "error");
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, [showToastMessage, refreshKey]);

  return {
    summary,
    dashboard,
    charts,
    loading,
    error,
  };
}

export default useAnalytics;
