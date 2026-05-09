import { useEffect, useRef, useState } from "react";

import { usePokemon } from "../../hooks/usePokemon";

import PokemonCard from "../../components/PokemonCard";
import PokemonModal from "../../components/PokemonModal";

import * as S from "./styles";

export default function Home() {
  const { pokemons, isFetching, loadMore } = usePokemon();

  const [selectPokemon, setSelectPokemon] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className={S.HomeContainer}>
      <h1 className={S.HomeTitle}>PokéFinder</h1>
      <div className={S.PokemonGrid}>
        {pokemons.map((pokemon, index) => (
          <div
            key={pokemon.name}
            className={S.PokemonCardWrapper}
            style={{
              animationDelay: `${(index % 20) * 80}ms`,
              animationFillMode: "forwards",
            }}
          >
            <PokemonCard
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              onClick={() => setSelectPokemon(pokemon.name)}
            />
          </div>
        ))}
      </div>

      {isFetching && <p className={S.LoadingText}>Loading...</p>}

      <div ref={loadMoreRef} className={S.ObserverTrigger} />

      {selectPokemon && (
        <PokemonModal
          pokemonName={selectPokemon}
          onClose={() => setSelectPokemon(null)}
        />
      )}
    </div>
  );
}
