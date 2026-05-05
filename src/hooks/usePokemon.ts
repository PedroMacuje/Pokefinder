import { useState, useRef, useCallback, useEffect } from "react";

import type { Pokemon, PokemonDetails } from "../types/pokemon";
import { getPokemonDetails, getPokemonList } from "../services/pokeAPI";

export function usePokemon() {
  // Main state holding the list of fully processed Pokémon
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // Offset used for pagination
  const [offset, setOffset] = useState(0);

  // Prevents multiple simultaneous fetches
  const [isFetching, setIsFetching] = useState(false);

  // In-memory cache that persists across renders without triggering re-renders
  const cache = useRef<Map<string, PokemonDetails>>(new Map());

  /**
   * Fetches Pokémon details with caching.
   * Avoids redundant API calls by storing results in a Map.
   */
  const fetchWithCache = useCallback(
    async (name: string): Promise<PokemonDetails> => {
      const cached = cache.current.get(name);

      if (cached) return cached;

      const details = await getPokemonDetails(name);
      cache.current.set(name, details);

      return details;
    },
    [],
  );

  /**
   * Fetches a batch of Pokémon and enriches them with details.
   * Centralizes logic used by both initial load and infinite scroll.
   */
  const fetchBatch = useCallback(
    async (limit: number, currentOffset: number) => {
      const data = await getPokemonList(limit, currentOffset);

      const detailedPokemons = await Promise.all(
        data.pokemons.map(async (p) => {
          const details = await fetchWithCache(p.name);

          return {
            ...p,
            id: details.id,
            types: details.types.map((t) => t.type.name),
            stats: details.stats,
            abilities: details.abilities,
          };
        }),
      );

      return detailedPokemons;
    },
    [fetchWithCache],
  );

  /**
   * Loads the next batch of Pokémon (infinite scroll).
   * Ensures no duplicate entries are added.
   */
  const loadMore = useCallback(async () => {
    if (isFetching) return;

    setIsFetching(true);

    const detailedPokemons = await fetchBatch(20, offset);

    setPokemons((prev) => {
      const existing = new Set(prev.map((p) => p.name));

      const filtered = detailedPokemons.filter((p) => !existing.has(p.name));

      return [...prev, ...filtered];
    });

    setOffset((prev) => prev + 20);
    setIsFetching(false);
  }, [offset, isFetching, fetchBatch]);

  /**
   * Initial data load (runs once on mount).
   * Uses the same batch logic to keep behavior consistent.
   */
  useEffect(() => {
    const init = async () => {
      setIsFetching(true);

      const detailedPokemons = await fetchBatch(20, 0);

      setPokemons(detailedPokemons);
      setOffset(20);
      setIsFetching(false);
    };

    init();
  }, [fetchBatch]);

  return {
    pokemons,
    isFetching,
    loadMore,
  };
}
