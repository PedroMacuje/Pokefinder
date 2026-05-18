import { useState, useRef, useCallback, useEffect } from "react";

import type { PokemonCardData } from "../types/Pokemon/card";

import { getPokemonList, getPokemonCardData } from "../services/Pokemon";

export function usePokemon() {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const offset = useRef(0);
  const cache = useRef<Map<string, PokemonCardData>>(new Map()); // Stores searched pokemons
  const isFetching = useRef(false); // Prevents simultaneous requests

  async function fetchPokemon(name: string) {
    const cached = cache.current.get(name);

    if (cached) return cached;

    const pokemon = await getPokemonCardData(name);

    cache.current.set(name, pokemon);

    return pokemon;
  }

  async function fetchBatch(offset: number) {
    const pokemonList = await getPokemonList(20, offset);

    return Promise.all(
      pokemonList.map((pokemon) => fetchPokemon(pokemon.name)),
    );
  }

  // Controls infinite scroll/pagination appending more pokemon to the list
  const loadMore = useCallback(async () => {
    if (isFetching.current) return;

    isFetching.current = true;

    setIsLoading(true);

    try {
      const newPokemons = await fetchBatch(offset.current);

      setPokemons((prev) => [...prev, ...newPokemons]);

      offset.current += 20;
    } finally {
      isFetching.current = false;

      setIsLoading(false);
    }
  }, []);

  // First load
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return {
    pokemons,
    isLoading,
    loadMore,
  };
}
