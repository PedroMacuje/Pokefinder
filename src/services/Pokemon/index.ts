import { api } from "../api";

import type {
  PokemonListResponse,
  PokemonApiResponse,
  PokemonIndexItem,
} from "../../types/api";

import type { PokemonCardData } from "../../types/card";

import type { PokemonModalData } from "../../types/modal";
import { getPokemonEvolutionBySpeciesUrl } from "./evolution";

const pokemonCache = new Map<string, PokemonApiResponse>();
const pokemonRequestCache = new Map<string, Promise<PokemonApiResponse>>();

function getPokemonCacheKey(nameOrId: string | number) {
  return String(nameOrId).toLowerCase();
}

async function getPokemonDetails(
  nameOrId: string | number,
): Promise<PokemonApiResponse> {
  const cacheKey = getPokemonCacheKey(nameOrId);
  const cachedPokemon = pokemonCache.get(cacheKey);

  if (cachedPokemon) {
    return cachedPokemon;
  }

  const pendingPokemonRequest = pokemonRequestCache.get(cacheKey);

  if (pendingPokemonRequest) {
    return pendingPokemonRequest;
  }

  const request = api
    .get<PokemonApiResponse>(`/pokemon/${nameOrId}`)
    .then((response) => {
      const pokemon = response.data;

      pokemonCache.set(cacheKey, pokemon);
      pokemonCache.set(String(pokemon.id), pokemon);
      pokemonCache.set(pokemon.name.toLowerCase(), pokemon);

      pokemonRequestCache.delete(cacheKey);

      return pokemon;
    })
    .catch((error) => {
      pokemonRequestCache.delete(cacheKey);
      throw error;
    });

  pokemonRequestCache.set(cacheKey, request);

  return request;
}

export async function getPokemonList(limit = 20, offset = 0) {
  const response = await api.get<PokemonListResponse>("/pokemon", {
    params: { limit, offset },
  });

  return response.data.results;
}

export async function getPokemonCardData(
  name: string,
): Promise<PokemonCardData> {
  const pokemon = await getPokemonDetails(name);

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
  const pokemon = await getPokemonDetails(name);

  const evolution = await getPokemonEvolutionBySpeciesUrl(pokemon.species.url);

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

export async function getPokemonIndex(): Promise<PokemonIndexItem[]> {
  const response = await api.get("/pokemon", {
    params: {
      limit: 10000,
    },
  });
  return response.data.results;
}
