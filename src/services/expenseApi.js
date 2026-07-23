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

/**
 * Builds a query string from a filters object, omitting any keys
 * whose value is empty, null, or undefined.
 */
function buildQueryString(filters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  return params.toString();
}

async function getExpenses(filters = {}) {
  const query = buildQueryString(filters);
  const url = query ? `${API_URL}/expenses?${query}` : `${API_URL}/expenses`;

  return request(url, { cache: "no-store" });
}

async function createExpense(expense) {
  return request(`${API_URL}/expenses`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(expense),
  });
}

async function updateExpense(expense) {
  return request(`${API_URL}/expenses/${expense.id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(expense),
  });
}

async function deleteExpense(id) {
  return request(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
  });
}

async function restoreExpense(id) {
  return request(`${API_URL}/expenses/${id}/restore`, {
    method: "PATCH",
  });
}

async function clearAllExpenses() {
  return request(`${API_URL}/expenses/clear-all`, {
    method: "PATCH",
  });
}

async function deleteSelectedExpenses(ids) {
  return request(`${API_URL}/expenses/bulk`, {
    method: "DELETE",
    headers: JSON_HEADERS,
    body: JSON.stringify({ ids }),
  });
}

export {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  restoreExpense,
  clearAllExpenses,
  deleteSelectedExpenses,
};
