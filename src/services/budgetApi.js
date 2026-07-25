import request from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

async function getBudget() {
  return request(`${API_URL}/budget`);
}

async function saveBudget(budget) {
  return request(`${API_URL}/budget`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(budget),
  });
}

export { getBudget, saveBudget };
