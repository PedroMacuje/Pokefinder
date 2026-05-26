import { api } from "./api";
import type { PokemonListResponse } from "../types/Pokemon/api";

export async function getPokemonList(limit = 20, offset = 0) {
  const response = await api.get<PokemonListResponse>("/pokemon", {
    params: { limit, offset },
  });

  return {
    pokemons: response.data.results,
  };
}
