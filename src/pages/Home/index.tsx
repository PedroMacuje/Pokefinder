import { useEffect, useRef, useState } from "react";

import { usePokemon } from "../../hooks/usePokemon";

import PokemonCard from "../../components/PokemonCard";
import PokemonModal from "../../components/PokemonModal";
import SearchBar from "../../components/SearchBar";
import TypeFilter from "../../components/TypeFilter";

import * as S from "./styles";

export default function Home() {
  const { pokemons, isLoading, loadMore } = usePokemon();

  const [selectPokemon, setSelectPokemon] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || pokemon.types.includes(selectedType);

    return matchesSearch && matchesType;
  });

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
      <SearchBar onChange={setSearchTerm} value={searchTerm} />
      <TypeFilter selectedType={selectedType} onSelect={setSelectedType} />
      <div className={S.PokemonGrid}>
        {filteredPokemons.map((pokemon, index) => (
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

      {isLoading && <p className={S.LoadingText}>Loading...</p>}

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
