import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const dataDir = fileURLToPath(new URL("../data/", import.meta.url));
export async function lireDonnees(file) {
  const content = await readFile(path.join(dataDir, file), "utf8");
  return JSON.parse(content);
}
export async function trouverProjet(slug) {
  const projets = await lireDonnees("projets.json");
  return projets.find(p => p.slug === slug) || null;
}