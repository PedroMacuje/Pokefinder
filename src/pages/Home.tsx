import { useEffect, useRef, useState, useCallback } from "react";

import { getPokemonList } from "../services/pokeAPI";

import type { PokemonListItem } from "../types/pokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (isFetching) return;

    setIsFetching(true);

    const data = await getPokemonList(20, offset);
    setPokemons((prev) => [...prev, ...data.results]);
    setOffset((prev) => prev + 20);

    setIsFetching(false);
  }, [offset, isFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore]);

  useEffect(() => {
    async function initialLoad() {
      setIsFetching(true);

      const data = await getPokemonList(20, 0);
      setPokemons(data.results);
      setOffset(20);

      setIsFetching(false);
    }

    initialLoad();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokedex</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="p-4 bg-white rounded shadow text-center"
          >
            {pokemon.name}
          </div>
        ))}
      </div>

      {isFetching && (
        <p className="text-center mt-4 text-gray-500">Carregando...</p>
      )}

      <div ref={loadMoreRef} className="h-10"></div>
    </div>
  );
}
