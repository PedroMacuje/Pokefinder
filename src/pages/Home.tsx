import { useEffect, useRef, useState } from "react";

import type { Pokemon } from "../types/pokemon";

import { usePokemon } from "../hooks/usePokemon";

import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";

export default function Home() {
  const { pokemons, isFetching, loadMore } = usePokemon();
  const [selectPokemon, setSelectPokemon] = useState<Pokemon | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    const currentRef = loadMoreRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMore]);

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
            <PokemonCard
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              onClick={() => setSelectPokemon(pokemon)}
            />
          </div>
        ))}
      </div>

      {isFetching && (
        <p className="text-center mt-4 text-gray-500">Loading...</p>
      )}

      <div ref={loadMoreRef} className="h-10"></div>
      {selectPokemon && (
        <PokemonModal
          pokemon={selectPokemon}
          onClose={() => setSelectPokemon(null)}
        />
      )}
    </div>
  );
}
