import handleResponse from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

async function getExpenses(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  const query = params.toString();

  const url = query ? `${API_URL}/expenses?${query}` : `${API_URL}/expenses`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  const data = await handleResponse(response);

  return data.data;
}

async function createExpense(expense) {
  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  const data = await handleResponse(response);

  return data.data;
}

async function deleteExpense(id) {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  const data = await handleResponse(response);

  return data.data;
}

async function updateExpense(expense) {
  const response = await fetch(`${API_URL}/expenses/${expense.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  const data = await handleResponse(response);

  return data.data;
}

async function restoreExpense(id) {
  const response = await fetch(`${API_URL}/expenses/${id}/restore`, {
    method: "PATCH",
  });

  const data = await handleResponse(response);

  return data.data;
}

async function clearAllExpenses() {
  const response = await fetch(`${API_URL}/expenses/clear-all`, {
    method: "PATCH",
  });

  const data = await handleResponse(response);

  return data.data;
}

export {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  restoreExpense,
  clearAllExpenses,
};
