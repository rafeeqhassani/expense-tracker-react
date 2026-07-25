import handleResponse from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

async function request(url, options) {
  const response = await fetch(url, options);
  const data = await handleResponse(response);

  return data.data;
}

async function registerUser(userData) {
  return request(`${API_URL}/auth/register`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(userData),
  });
}

async function loginUser(credentials) {
  return request(`${API_URL}/auth/login`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(credentials),
  });
}

async function getCurrentUser(token) {
  return request(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { registerUser, loginUser, getCurrentUser };
