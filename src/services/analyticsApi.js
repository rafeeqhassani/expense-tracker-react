import handleResponse from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Performs a fetch against the API and unwraps the response's
 * `data` field, throwing via `handleResponse` on failure.
 */
async function request(url) {
  const response = await fetch(url);
  const data = await handleResponse(response);
  return data.data;
}

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
