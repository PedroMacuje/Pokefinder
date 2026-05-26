import { useCallback, useEffect, useRef, useState } from "react";

import { usePokemon } from "../../hooks/usePokemon";

import { getPokemonCardData, getPokemonIndex } from "../../services/Pokemon";

import type { PokemonIndexItem } from "../../types/api";
import type { PokemonCardData } from "../../types/card";

import PokemonCard from "../../components/PokemonCard";
import PokemonModal from "../../components/PokemonModal";
import SearchBar from "../../components/SearchBar";
import TypeFilter from "../../components/TypeFilter";

import * as S from "./styles";

export default function Home() {
  const { pokemons, isLoading, loadMore } = usePokemon();

  // Search
  const [pokemonIndex, setPokemonIndex] = useState<PokemonIndexItem[]>([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<PokemonCardData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Filters
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Modal
  const [selectPokemon, setSelectPokemon] = useState<string | null>(null);

  // Refs
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const searchTimeoutRef = useRef<number | null>(null);

  // Search logic
  const handleSearch = useCallback(
    async (value: string) => {
      const formatedValue = value.toLowerCase().trim();

      //reset
      if (!formatedValue) {
        setSearchResult([]);
        return;
      }

      // global partial matches
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

        // limit requests
        const limitedMatches = matchedNames.slice(0, 20);

        const results = await Promise.all(
          limitedMatches.map((pokemon) => getPokemonCardData(pokemon.name)),
        );

        setSearchResult(results);
      } finally {
        setIsSearching(false);
      }
    },
    [pokemonIndex],
  );

  //Debounced input handler
  function handleSearchInput(value: string) {
    setSearch(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = window.setTimeout(() => {
      handleSearch(value);
    }, 300);
  }

  // Source list
  const sourcePokemons = search ? searchResult : pokemons;

  //Final displayed list
  const displayedPokemons = sourcePokemons.filter((pokemon) => {
    const matchesType = !selectedType || pokemon.types.includes(selectedType);

    return matchesType;
  });

  //Load global Pokémon index
  useEffect(() => {
    async function loadIndex() {
      const data = await getPokemonIndex();

      setPokemonIndex(data);
    }

    loadIndex();
  }, []);

  //Infinite scroll observer
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

      {/* Search and Filters */}
      <SearchBar onChange={handleSearchInput} value={search} />
      <TypeFilter selectedType={selectedType} onSelect={setSelectedType} />

      {/* Search loading */}
      {isSearching && <p className="text-white/60 mb-4">Searching...</p>}

      {/* Not Found */}
      {search && !isSearching && searchResult.length === 0 && (
        <p className="text-red-300 mb-4">Pokémon not found.</p>
      )}

      {/* Pokémon List */}
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

      {/* Infinite scroll loading */}
      {isLoading && <p className={S.LoadingText}>Loading...</p>}

      {/* Observer trigger */}
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
