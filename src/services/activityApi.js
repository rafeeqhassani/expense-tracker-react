import request from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

function buildQueryString(filters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  return params.toString();
}

export async function getActivities(filters = {}) {
  const query = buildQueryString(filters);
  const url = query
    ? `${API_URL}/activities?${query}`
    : `${API_URL}/activities`;

  return request(url, { cache: "no-store" });
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
