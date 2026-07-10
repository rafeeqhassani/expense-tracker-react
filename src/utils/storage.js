export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving "${key}" to localStorage:`, error);
  }
}

export function getFromLocalStorage(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    return parsed ?? [];
  } catch (error) {
    console.error(`Error reading "${key}" from localStorage:`, error);
    return [];
  }
}
