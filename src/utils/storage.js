export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving "${key}" to localStorage:`, error);
  }
}

export function getFromLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);

    if (item === null) {
      return defaultValue;
    }

    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
