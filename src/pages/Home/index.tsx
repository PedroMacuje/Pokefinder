import { useEffect, useRef, useState } from "react";

import { usePokemon } from "../../hooks/usePokemon";

import { getPokemonCardData } from "../../services/Pokemon";

import type { PokemonCardData } from "../../types/Pokemon/card";

import PokemonCard from "../../components/PokemonCard";
import PokemonModal from "../../components/PokemonModal";
import SearchBar from "../../components/SearchBar";
import TypeFilter from "../../components/TypeFilter";

import * as S from "./styles";

export default function Home() {
  const { pokemons, isLoading, loadMore } = usePokemon();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<PokemonCardData | null>(
    null,
  );
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectPokemon, setSelectPokemon] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = !selectedType || pokemon.types.includes(selectedType);

    return matchesSearch && matchesType;
  });

  const displayedPokemons = search
    ? filteredPokemons.length > 0
      ? filteredPokemons
      : searchResult
        ? [searchResult]
        : []
    : filteredPokemons;

  async function handleSearch(value: string) {
    const formatedValue = value.toLowerCase().trim();

    setHasSearched(false);

    setSearch(formatedValue);

    //reset
    if (!formatedValue) {
      setSearchResult(null);
      return;
    }

    //local match exists
    const hasLocalMatch = pokemons.some((pokemon) =>
      pokemon.name.includes(formatedValue),
    );

    if (hasLocalMatch) {
      setSearchResult(null);
      return;
    }

    //api
    try {
      setIsSearching(true);
      const pokemon = await getPokemonCardData(formatedValue);

      setSearchResult(pokemon);
      setHasSearched(true);
    } catch {
      setSearchResult(null);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  }

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
  }, [loadMore]);

  return (
    <div className={S.HomeContainer}>
      <h1 className={S.HomeTitle}>PokéFinder</h1>

      {/* Filters */}
      <SearchBar onChange={handleSearch} value={search} />
      <TypeFilter selectedType={selectedType} onSelect={setSelectedType} />
      {isSearching && <p className="text-white/60 mb-4">Searching...</p>}

      {/* Not Found */}
      {search &&
        hasSearched &&
        !isSearching &&
        displayedPokemons.length === 0 && (
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
