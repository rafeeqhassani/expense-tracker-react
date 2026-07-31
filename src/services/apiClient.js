import { getFromLocalStorage } from "../utils/storage";

/**
 * Parses a fetch `Response` as JSON and throws an `Error` if the
 * request failed or the body couldn't be parsed.
 *
 * @param {Response} response
 * @returns {Promise<any>} The parsed JSON body, on success.
 * @throws {Error} With the server's message (if present) or an
 *   `HTTP <status>` fallback.
 */

async function handleResponse(response) {
  let data;

  try {
    data = await response.json();
    
  } catch {
    const error = new Error(`HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }

  if (!response.ok) {
    const error = new Error(data.message || `HTTP ${response.status}`);

    error.status = response.status;

    throw error;
  }

  return data;
}

/**
 * Shared API request wrapper.
 * Adds JWT token automatically and unwraps response data.
 */
async function request(url, options = {}) {
  const token = getFromLocalStorage("token", null);

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("API request failed:", error);
    throw new Error("Unable to connect to the server.");
  }

  const data = await handleResponse(response);

  return data.data ?? data;
}

export default request;
