const API_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getList(path) {
  let lastError;
  for (const base of API_URLS) {
    try {
      const res = await fetch(base + path);
      if (!res.ok) throw new Error("Request failed with " + res.status);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Unexpected response");
      return data;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export const fetchProducts = () => getList("/products");
export const fetchCategories = () => getList("/categories");