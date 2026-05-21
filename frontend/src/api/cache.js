import api from "./axios";

/**
 * Retrieves cached data from localStorage safely.
 * @param {string} key The API endpoint URL or unique key.
 * @returns {any|null} The parsed JSON data or null if not found/error.
 */
export const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(`cache_${key}`);
    return cached ? JSON.parse(cached) : null;
  } catch (e) {
    console.error("Failed to read from cache:", e);
    return null;
  }
};

/**
 * Saves data to localStorage safely.
 * @param {string} key The API endpoint URL or unique key.
 * @param {any} data The data to stringify and store.
 */
export const setCachedData = (key, data) => {
  try {
    localStorage.setItem(`cache_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to write to cache:", e);
  }
};

/**
 * Loads cached data instantly, then triggers a background fetch to update the state and cache.
 * Useful for resolving Render's cold-start delay for public GET requests.
 * 
 * @param {string} url The API endpoint to fetch.
 * @param {function} callback The state setter function.
 * @returns {Promise} The axios request promise.
 */
export const fetchWithCache = (url, callback) => {
  // 1. Instantly supply cached data if available
  const cached = getCachedData(url);
  if (cached) {
    callback(cached);
  }

  // 2. Fetch fresh data from backend in background
  return api.get(url).then((res) => {
    setCachedData(url, res.data);
    callback(res.data);
    return res;
  });
};
