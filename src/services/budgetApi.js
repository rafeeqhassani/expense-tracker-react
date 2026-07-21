import handleResponse from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

async function getBudget() {
  const response = await fetch(`${API_URL}/budget`);

  const data = await handleResponse(response);

  return data.data;
}

async function saveBudget(budget) {
  const response = await fetch(`${API_URL}/budget`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(budget),
  });

  const data = await handleResponse(response);

  return data.data;
}

export { getBudget, saveBudget };
