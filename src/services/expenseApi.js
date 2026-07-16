const API_URL =
  "https://expense-tracker-api-production-c311.up.railway.app/api";

async function getExpenses() {
  const response = await fetch(`${API_URL}/expenses`);

  const result = await response.json();

  return result.data;
}

async function createExpense(expense) {
  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  const result = await response.json();

  return result.data;
}

async function deleteExpense(id) {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  return response.json();
}

async function updateExpense(expense) {
  const response = await fetch(`${API_URL}/expenses/${expense.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  const result = await response.json();

  return result.data;
}

async function restoreExpense(id) {
  const response = await fetch(`${API_URL}/expenses/${id}/restore`, {
    method: "PATCH",
  });

  const result = await response.json();

  return result.data;
}

async function clearAllExpenses() {
  const response = await fetch(`${API_URL}/expenses/clear-all`, {
    method: "PATCH",
  });

  const result = await response.json();

  return result.data;
}

export {
  API_URL,
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  restoreExpense,
  clearAllExpenses,
};
