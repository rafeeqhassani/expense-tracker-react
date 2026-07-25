import request from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCategories() {
  return request(`${API_URL}/categories`);
}
