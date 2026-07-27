import request from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL;

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

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

function getCurrentUser(token) {
  return request(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function demoLoginUser() {
  return request(`${API_URL}/auth/demo`, {
    method: "POST",
    headers: JSON_HEADERS,
  });
}

export { registerUser, loginUser, getCurrentUser, demoLoginUser };
