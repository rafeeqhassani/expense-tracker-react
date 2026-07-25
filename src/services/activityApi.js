import request from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

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
