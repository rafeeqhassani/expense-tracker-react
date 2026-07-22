import handleResponse from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

export async function getActivities() {
  const response = await fetch(`${API_URL}/activities`);

  const data = await handleResponse(response);

  return data.data;
}

export async function createActivity(activity) {
  const response = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });

  const data = await handleResponse(response);

  return data.data;
}

export async function clearActivities() {
  const response = await fetch(`${API_URL}/activities`, {
    method: "DELETE",
  });

  const data = await handleResponse(response);

  return data.data;
}
