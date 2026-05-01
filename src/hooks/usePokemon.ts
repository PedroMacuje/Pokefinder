import { useState, useRef, useCallback, useEffect } from "react";

import type { Pokemon, PokemonDetails } from "../types/pokemon";
import { getPokemonDetails, getPokemonList } from "../services/pokeAPI";

export function usePokemon() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // Cache
  const cache = useRef<Map<string, PokemonDetails>>(new Map());

  // Cache Search
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

  // Base function
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
          };
        }),
      );

      return detailedPokemons;
    },
    [fetchWithCache],
  );

  // Endless Scroll
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

  // Execute on build
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
