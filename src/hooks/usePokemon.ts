import { useState, useRef, useCallback, useEffect } from "react";

import type { PokemonCardData } from "../types/card";

import { getPokemonList, getPokemonCardData } from "../services/Pokemon";

export function usePokemon() {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const offset = useRef(0);
  const isFetching = useRef(false); // Prevents simultaneous requests

  // Controls infinite scroll/pagination appending more pokemon to the list
  const loadMore = useCallback(async () => {
    if (isFetching.current) return;

    isFetching.current = true;

    setIsLoading(true);

    try {
      const pokemonList = await getPokemonList(20, offset.current);
      const newPokemons = await Promise.all(
        pokemonList.map((pokemon) => getPokemonCardData(pokemon.name)),
      );

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
