import { api } from "../api";

import type {
  PokemonListResponse,
  PokemonApiResponse,
  PokemonIndexItem,
  PokemonMoveDetailsResponse,
} from "../../types/api";

import type { PokemonCardData } from "../../types/card";

import type { PokemonModalData, PokemonMoveData } from "../../types/modal";
import { getPokemonEvolutionBySpeciesUrl } from "./evolution";

const pokemonCache = new Map<string, PokemonApiResponse>();
const pokemonRequestCache = new Map<string, Promise<PokemonApiResponse>>();
const moveCache = new Map<string, PokemonMoveDetailsResponse>();
const moveRequestCache = new Map<string, Promise<PokemonMoveDetailsResponse>>();

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

function getMoveCacheKey(url: string) {
  return url.toLowerCase();
}

async function getMoveDetails(url: string): Promise<PokemonMoveDetailsResponse> {
  const cacheKey = getMoveCacheKey(url);
  const cachedMove = moveCache.get(cacheKey);

  if (cachedMove) {
    return cachedMove;
  }

  const pendingMoveRequest = moveRequestCache.get(cacheKey);

  if (pendingMoveRequest) {
    return pendingMoveRequest;
  }

  const request = api
    .get<PokemonMoveDetailsResponse>(url)
    .then((response) => {
      const move = response.data;

      moveCache.set(cacheKey, move);
      moveRequestCache.delete(cacheKey);

      return move;
    })
    .catch((error) => {
      moveRequestCache.delete(cacheKey);
      throw error;
    });

  moveRequestCache.set(cacheKey, request);

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
  const moves = await Promise.all(
    pokemon.moves.map(async (moveEntry): Promise<PokemonMoveData> => {
      const move = await getMoveDetails(moveEntry.move.url);
      const englishEffect = move.effect_entries.find(
        (entry) => entry.language.name === "en",
      );
      const levelUpDetails = moveEntry.version_group_details.filter(
        (detail) => detail.move_learn_method.name === "level-up",
      );
      const level = levelUpDetails.length
        ? Math.min(...levelUpDetails.map((detail) => detail.level_learned_at))
        : null;

      return {
        name: move.name,
        level,
        power: move.power,
        damageClass: move.damage_class.name,
        type: move.type.name,
        description:
          englishEffect?.short_effect ??
          englishEffect?.effect ??
          "No description available.",
        learnMethod:
          moveEntry.version_group_details[0]?.move_learn_method.name ??
          "unknown",
      };
    }),
  );

  return {
    id: pokemon.id,
    name: pokemon.name,
    evolution,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,

    types: pokemon.types.map((t) => t.type.name),
    moves: moves.sort((a, b) => {
      const aLevel = a.level ?? Number.POSITIVE_INFINITY;
      const bLevel = b.level ?? Number.POSITIVE_INFINITY;

      if (aLevel !== bLevel) {
        return aLevel - bLevel;
      }

      return a.name.localeCompare(b.name);
    }),

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
