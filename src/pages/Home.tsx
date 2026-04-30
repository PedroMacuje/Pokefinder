import { useEffect, useRef, useState, useCallback } from "react";

import type { PokemonListItem } from "../types/pokemon";

import PokemonCard from "../components/PokemonCard";

import { getPokemonList } from "../services/pokeAPI";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (isFetching) return;

    setIsFetching(true);

    const data = await getPokemonList(20, offset);

    setPokemons((prev) => {
      const existingNames = new Set(prev.map((p) => p.name));

      const newPokemons = data.results.filter(
        (p) => !existingNames.has(p.name),
      );

      return [...prev, ...newPokemons];
    });

    setOffset((prev) => prev + 20);

    setIsFetching(false);
  }, [offset, isFetching]);

  function extractID(url: string) {
    const parts = url.split("/");
    return Number(parts[parts.length - 2]);
  }

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
      <h1 className="text-2xl font-bold mb-4">PokéFinder</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => (
          <div
            key={pokemon.url}
            className="opacity-0 animate-fade-up"
            style={{
              animationDelay: `${(index % 20) * 80}ms`,
              animationFillMode: "forwards",
            }}
          >
            <PokemonCard index={extractID(pokemon.url)} name={pokemon.name} />
          </div>
        ))}
      </div>

      {isFetching && (
        <p className="text-center mt-4 text-gray-500">Loading...</p>
      )}

      <div ref={loadMoreRef} className="h-10"></div>
    </div>
  );
}
