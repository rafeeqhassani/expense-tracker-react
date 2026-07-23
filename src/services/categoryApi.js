import handleResponse from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  const data = await handleResponse(response);

  return data.data;
}
