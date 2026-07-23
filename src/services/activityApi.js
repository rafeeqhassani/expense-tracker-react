import handleResponse from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

/**
 * Performs a fetch against the API and unwraps the response's
 * `data` field, throwing via `handleResponse` on failure.
 */
async function request(url, options) {
  const response = await fetch(url, options);
  const data = await handleResponse(response);
  return data.data;
}

export async function getActivities() {
  return request(`${API_URL}/activities`);
}

export async function createActivity(activity) {
  return request(`${API_URL}/activities`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(activity),
  });
}

export async function clearActivities() {
  return request(`${API_URL}/activities`, {
    method: "DELETE",
  });
}
