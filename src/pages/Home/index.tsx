import { useCallback, useEffect, useRef, useState } from "react";
import { LoaderCircle, SearchX } from "lucide-react";

import { usePokemon } from "../../hooks/usePokemon";

import { getPokemonCardData, getPokemonIndex } from "../../services/Pokemon";

import type { PokemonIndexItem } from "../../types/api";
import type { PokemonCardData } from "../../types/card";
import type { PokemonType } from "../../constants/pokemonTypes";

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

  const [selectedType, setSelectedType] = useState<PokemonType | null>(null);

  const [selectPokemon, setSelectPokemon] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const searchTimeoutRef = useRef<number | null>(null);

  const handleSearch = useCallback(
    async (value: string) => {
      const formatedValue = value.toLowerCase().trim();

      if (!formatedValue) {
        setSearchResult([]);
        return;
      }

      const matchedNames = pokemonIndex.filter((pokemon) =>
        pokemon.name.includes(formatedValue),
      );

      if (matchedNames.length === 0) {
        setSearchResult([]);
        return;
      }

      try {
        setIsSearching(true);

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

  function handleSearchInput(value: string) {
    setSearch(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = window.setTimeout(() => {
      handleSearch(value);
    }, 300);
  }

  const sourcePokemons = search ? searchResult : pokemons;

  const displayedPokemons = sourcePokemons.filter((pokemon) => {
    const matchesType = !selectedType || pokemon.types.includes(selectedType);

    return matchesType;
  });

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

      <SearchBar onChange={handleSearchInput} value={search} />
      <TypeFilter selectedType={selectedType} onSelect={setSelectedType} />

      {isSearching && (
        <p className="mb-4 flex items-center justify-center gap-2 text-white/60">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Searching...
        </p>
      )}

      {search && !isSearching && searchResult.length === 0 && (
        <p className="mb-4 flex items-center justify-center gap-2 text-red-300">
          <SearchX className="h-4 w-4" />
          Pokémon not found.
        </p>
      )}

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

      {isLoading && (
        <p className={`${S.LoadingText} flex items-center justify-center gap-2`}>
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Loading...
        </p>
      )}

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
