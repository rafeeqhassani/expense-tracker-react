import { cache } from "react";

const API_URL = import.meta.env.VITE_API_URL;

async function getExpenses(page = 1, limit = 20) {
  const response = await fetch(
    `${API_URL}/expenses?page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );

  const data = await response.json();

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
