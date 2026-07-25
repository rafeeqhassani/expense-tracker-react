import request from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

async function getAnalyticsSummary() {
  return request(`${API_URL}/analytics/summary`);
}

async function getDashboardStats() {
  return request(`${API_URL}/analytics/dashboard`);
}

async function getChartData() {
  return request(`${API_URL}/analytics/charts`);
}

export { getAnalyticsSummary, getDashboardStats, getChartData };
