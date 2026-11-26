const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export async function apiFetch(path, options = {}) {
  const response = await fetch(API + path, {headers:{Accept:"application/json",...options.headers},...options});
  const type = response.headers.get("content-type") || "";
  const data = type.includes("application/json") ? await response.json() : null;
  if (!response.ok) throw new Error(data?.error || ("Erreur HTTP " + response.status));
  return data;
}