import { useEffect, useState, useCallback } from "react";
import {
  getAnalyticsSummary,
  getDashboardStats,
  getChartData,
} from "../services/analyticsApi";

const DEFAULT_SUMMARY = {
  overall: {},
  filtered: {},
};

/**
 * Loads analytics summary, dashboard stats, and chart data together,
 * refetching whenever `refreshKey` changes.
 *
 * @param {(message: string, type: "success" | "error") => void} showToastMessage
 * @param {*} refreshKey - Changing this value triggers a reload.
 */

function useAnalytics(refreshKey, authLoading, token) {
  const [summary, setSummary] = useState(DEFAULT_SUMMARY);
  const [dashboard, setDashboard] = useState({});
  const [charts, setCharts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const [summaryData, dashboardStats, chartData] = await Promise.all([
        getAnalyticsSummary(),
        getDashboardStats(),
        getChartData(),
      ]);

      setSummary(summaryData);
      setDashboard(dashboardStats);
      setCharts(chartData);
    } catch (error) {
      console.error("Failed to load analytics", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading || !token) return;

    loadAnalytics();
  }, [loadAnalytics, refreshKey, authLoading, token]);

  return {
    summary,
    dashboard,
    charts,

    loading,
    error,

    loadAnalytics,
  };
}

export default useAnalytics;
