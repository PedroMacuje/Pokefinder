import axios from "axios";

import type {
  PokemonListResponse,
  PokemonApiResponse,
} from "../../types/Pokemon/api";

import type { PokemonCardData } from "../../types/Pokemon/card";

import type { PokemonModalData } from "../../types/Pokemon/modal";
import { getPokemonEvolution } from "./evolution";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export async function getPokemonList(limit = 20, offset = 0) {
  const response = await api.get<PokemonListResponse>("/pokemon", {
    params: { limit, offset },
  });

  return response.data.results;
}

export async function getPokemonCardData(
  name: string,
): Promise<PokemonCardData> {
  const response = await api.get<PokemonApiResponse>(`/pokemon/${name}`);

  const pokemon = response.data;

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    types: pokemon.types.map((t) => t.type.name),
  };
}

export async function getPokemonModalData(
  name: string,
): Promise<PokemonModalData> {
  const response = await api.get<PokemonApiResponse>(`/pokemon/${name}`);

  const pokemon = response.data;

  const evolution = await getPokemonEvolution(pokemon.name);

  return {
    id: pokemon.id,
    name: pokemon.name,
    evolution,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,

    types: pokemon.types.map((t) => t.type.name),

    stats: pokemon.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),

    abilities: pokemon.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
  };
}
