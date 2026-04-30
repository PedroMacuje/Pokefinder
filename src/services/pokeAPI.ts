import axios from "axios";

import type { PokemonListResponse } from "../types/pokemon";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export async function getPokemonList(limit = 20, offset = 0) {
  const response = await api.get<PokemonListResponse>("/pokemon", {
    params: { limit, offset },
  });

  return {
    pokemons: response.data.results,
  };
}
