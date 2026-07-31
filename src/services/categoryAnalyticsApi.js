import request from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCategoryAnalytics() {
  return request(`${API_URL}/analytics/categories`);
}
