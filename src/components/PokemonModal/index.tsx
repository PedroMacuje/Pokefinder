import { useEffect, useState } from "react";

import type { PokemonModalData } from "../../types/modal";

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
  const [pokemon, setPokemon] = useState<PokemonModalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [pokemon]);

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

  const normalAbilities = pokemon.abilities.filter(
    (ability) => !ability.isHidden,
  );
  const hiddenAbility = pokemon.abilities.find((ability) => ability.isHidden);

  const modalGradient = getModalGradient(pokemon.types);

  return (
    <div className={S.ModalWrapper}>
      <div onClick={onClose} className={S.ModalOverlay} />

      <div className={S.ModalContainer}>
        <div className={S.ModalDarkLayer} />
        <div className={S.ModalGlow} />

        <div
          className={`
            ${S.ModalScrollContent}
            modal-scrollbar
            ${modalGradient}
          `}
        >
          <button onClick={onClose} className={S.CloseButton}>
            x
          </button>

          <div className={S.ModalHeader}>
            <h2 className={S.PokemonName}>{pokemon.name}</h2>

            <span className={S.PokemonId}>
              # {String(pokemon.id).padStart(3, "0")}
            </span>
          </div>

          <div className={S.ModalContent}>
            <div className={S.TopGrid}>
              <div className={S.ImageContainer}>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className={S.PokemonImage}
                />
              </div>

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

            <div className={S.AbilitiesSection}>
              <h3 className={S.SectionTitle}>Abilities</h3>

              <div className={S.AbilitiesGrid}>
                <div className={S.AbilityColumn}>
                  <p className={S.AbilityLabel}>Standard</p>

                  <div className={S.AbilityList}>
                    {normalAbilities.map((ability) => (
                      <Ability key={ability.name} name={ability.name} />
                    ))}
                  </div>
                </div>

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
                      <span className={S.EvolutionArrow}>{"->"}</span>
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
