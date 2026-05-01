import { type Pokemon } from "../types/pokemon";

const STORAGE_KEY = "pokemonCache";

export function saveToCache(pokemons: Pokemon[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
}

export function loadFromCache(): Pokemon[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function clearCache() {
  localStorage.removeItem(STORAGE_KEY);
}
