import { useState, useRef, useCallback, useEffect } from "react";

import type { PokemonCardData } from "../types/Pokemon/card";

import { getPokemonList, getPokemonCardData } from "../services/Pokemon";

export function usePokemon() {
  // Main Pokémon list
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);

  // Pagination offset
  const [offset, setOffset] = useState(0);

  // Prevents duplicated requests
  const [isFetching, setIsFetching] = useState(false);

  // In-memory cache that persists across renders without triggering re-renders
  const cache = useRef<Map<string, PokemonCardData>>(new Map());

  // Fetches Pokémon details with caching.
  const fetchWithCache = useCallback(
    async (name: string): Promise<PokemonCardData> => {
      const cached = cache.current.get(name);

      if (cached) return cached;

      const pokemon = await getPokemonCardData(name);

      cache.current.set(name, pokemon);

      return pokemon;
    },
    [],
  );

  //Fetches a batch of Pokémon and enriches them with details.
  const fetchBatch = useCallback(
    async (limit: number, currentOffset: number) => {
      const pokemonList = await getPokemonList(limit, currentOffset);

      const pokemonData = await Promise.all(
        pokemonList.map((pokemon) => fetchWithCache(pokemon.name)),
      );

      return pokemonData;
    },
    [fetchWithCache],
  );

  // Loads the next batch of Pokémon (infinite scroll).
  const loadMore = useCallback(async () => {
    if (isFetching) return;

    setIsFetching(true);

    try {
      const newPokemons = await fetchBatch(20, offset);

      setPokemons((prev) => {
        const existing = new Set(prev.map((p) => p.name));

        const filtered = newPokemons.filter((p) => !existing.has(p.name));

        return [...prev, ...filtered];
      });

      setOffset((prev) => prev + 20);
    } finally {
      setIsFetching(false);
    }
  }, [offset, isFetching, fetchBatch]);

  // Initial data load (runs once on mount).
  useEffect(() => {
    const init = async () => {
      setIsFetching(true);

      try {
        const initialPokemons = await fetchBatch(20, 0);
        setPokemons(initialPokemons);
        setOffset(20);
      } finally {
        setIsFetching(false);
      }
    };

    init();
  }, [fetchBatch]);

  return {
    pokemons,
    isFetching,
    loadMore,
  };
}
