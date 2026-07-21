import handleResponse from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

async function getAnalyticsSummary() {
  const response = await fetch(`${API_URL}/analytics/summary`);

  const data = await handleResponse(response);

  return data.data;
}

async function getDashboardStats() {
  const response = await fetch(`${API_URL}/analytics/dashboard`);

  const data = await handleResponse(response);

  return data.data;
}

async function getChartData() {
  const response = await fetch(`${API_URL}/analytics/charts`);

  const data = await handleResponse(response);

  return data.data;
}

export { getAnalyticsSummary, getDashboardStats, getChartData };
