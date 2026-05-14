import { useEffect, useState } from "react";

import type { PokemonModalData } from "../../types/Pokemon/modal";

import { getPokemonModalData } from "../../services/Pokemon";

import { getModalGradient } from "./stylesVariants";

import StatBar from "./StatBar";
import Ability from "./Ability";

import * as S from "./styles";

interface PokemonModalProps {
  pokemonName: string;
  onClose: () => void;
}

export default function PokemonModal({
  pokemonName,
  onClose,
}: PokemonModalProps) {
  // Full modal data
  const [pokemon, setPokemon] = useState<PokemonModalData | null>(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Stats animation state
  const [animate, setAnimate] = useState(false);

  // Fetch modal data
  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);

      try {
        const data = await getPokemonModalData(pokemonName);

        setPokemon(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  // Close modal on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  // Trigger stats animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [pokemon]);

  // Loading state
  if (isLoading || !pokemon) {
    return (
      <div className={S.ModalWrapper}>
        <div className={S.ModalOverlay} />

        <div className={S.ModalContainer}>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Abilities sorting logic
  const normalAbilities = pokemon.abilities.filter(
    (ability) => !ability.isHidden,
  );
  const hiddenAbility = pokemon.abilities.find((ability) => ability.isHidden);

  // Modal background gradient
  const modalGradient = getModalGradient(pokemon.types);

  return (
    <div className={S.ModalWrapper}>
      {/* Overlay */}
      <div onClick={onClose} className={S.ModalOverlay} />

      {/* Modal */}
      <div className={S.ModalContainer}>
        <div
          className={`
            ${S.ModalScrollContent}
            ${modalGradient}
          `}
        >
          {/* Close button */}
          <button onClick={onClose} className={S.CloseButton}>
            ✕
          </button>

          {/* Dark overlay */}
          <div className={S.ModalDarkLayer} />

          {/* Glow */}
          <div className={S.ModalGlow} />

          {/* Header */}
          <div className={S.ModalHeader}>
            <h2 className={S.PokemonName}>{pokemon.name}</h2>

            <span className={S.PokemonId}>
              # {String(pokemon.id).padStart(3, "0")}
            </span>
          </div>

          {/* Main content */}
          <div className={S.ModalContent}>
            {/* Top section */}
            <div className={S.TopGrid}>
              {/* Pokemon image */}
              <div className={S.ImageContainer}>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className={S.PokemonImage}
                />
              </div>

              {/* Stats */}
              <div className={S.StatsContainer}>
                {pokemon.stats.map((stat, index) => (
                  <StatBar
                    key={stat.name}
                    animate={animate}
                    baseStat={stat.value}
                    index={index}
                    statLabel={stat.name}
                  />
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className={S.AbilitiesSection}>
              <h3 className={S.SectionTitle}>Abilities</h3>

              <div className={S.AbilitiesGrid}>
                {/* Standard */}
                <div className={S.AbilityColumn}>
                  <p className={S.AbilityLabel}>Standard</p>

                  <div className={S.AbilityList}>
                    {normalAbilities.map((ability) => (
                      <Ability key={ability.name} name={ability.name} />
                    ))}
                  </div>
                </div>

                {/* Hidden */}
                {hiddenAbility && (
                  <div className={S.AbilityColumn}>
                    <p className={S.HiddenAbilityLabel}>Hidden Ability</p>

                    <div className={S.AbilityList}>
                      <Ability name={hiddenAbility.name} isHidden />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Evolution */}
            <div className={S.EvolutionSection}>
              <h3 className={S.EvolutionTitle}>Evolution</h3>
              <div className={S.EvolutionChain}>
                {pokemon.evolution.map((evolution, index) => (
                  <div key={evolution.name} className={S.EvolutionItem}>
                    <div className={S.EvolutionImageWrapper}>
                      <img
                        src={evolution.image}
                        alt={evolution.name}
                        className={S.EvolutionImage}
                      />
                    </div>

                    <p className={S.EvolutionName}>{evolution.name}</p>

                    {index < pokemon.evolution.length - 1 && (
                      <span className={S.EvolutionArrow}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
