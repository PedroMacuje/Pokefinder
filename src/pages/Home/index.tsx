import { useEffect, useRef, useState } from "react";

import { usePokemon } from "../../hooks/usePokemon";

import { getPokemonCardData, getPokemonIndex } from "../../services/Pokemon";

import type { PokemonIndexItem } from "../../types/Pokemon/api";
import type { PokemonCardData } from "../../types/Pokemon/card";

import PokemonCard from "../../components/PokemonCard";
import PokemonModal from "../../components/PokemonModal";
import SearchBar from "../../components/SearchBar";
import TypeFilter from "../../components/TypeFilter";

import * as S from "./styles";

export default function Home() {
  const { pokemons, isLoading, loadMore } = usePokemon();

  const [pokemonIndex, setPokemonIndex] = useState<PokemonIndexItem[]>([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<PokemonCardData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectPokemon, setSelectPokemon] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const sourcePokemons = search ? searchResult : pokemons;

  const displayedPokemons = sourcePokemons.filter((pokemon) => {
    const matchesType = !selectedType || pokemon.types.includes(selectedType);

    return matchesType;
  });

  async function handleSearch(value: string) {
    const formatedValue = value.toLowerCase().trim();

    setSearch(formatedValue);

    // reset
    if (!formatedValue) {
      setSearchResult([]);
      return;
    }

    // global matches
    const matchedNames = pokemonIndex.filter((pokemon) =>
      pokemon.name.includes(formatedValue),
    );

    // no matches
    if (matchedNames.length === 0) {
      setSearchResult([]);
      return;
    }

    try {
      setIsSearching(true);

      // limit results
      const limitedMatches = matchedNames.slice(0, 20);

      const results = await Promise.all(
        limitedMatches.map((pokemon) => getPokemonCardData(pokemon.name)),
      );

      setSearchResult(results);
    } finally {
      setIsSearching(false);
    }
  }

  useEffect(() => {
    async function loadIndex() {
      const data = await getPokemonIndex();

      setPokemonIndex(data);
    }

    loadIndex();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !search) {
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
  }, [loadMore, search]);

  return (
    <div className={S.HomeContainer}>
      <h1 className={S.HomeTitle}>PokéFinder</h1>

      {/* Filters */}
      <SearchBar onChange={handleSearch} value={search} />
      <TypeFilter selectedType={selectedType} onSelect={setSelectedType} />
      {isSearching && <p className="text-white/60 mb-4">Searching...</p>}

      {/* Not Found */}
      {search && !isSearching && searchResult.length === 0 && (
        <p className="text-red-300 mb-4">Pokémon not found.</p>
      )}

      {/* List */}
      <div className={S.PokemonGrid}>
        {displayedPokemons.map((pokemon, index) => (
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

      {/* Loading */}
      {isLoading && <p className={S.LoadingText}>Loading...</p>}

      {/* Observer */}
      <div ref={loadMoreRef} className={S.ObserverTrigger} />

      {/* Modal */}
      {selectPokemon && (
        <PokemonModal
          pokemonName={selectPokemon}
          onClose={() => setSelectPokemon(null)}
        />
      )}
    </div>
  );
}
