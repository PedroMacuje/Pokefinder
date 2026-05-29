import { useEffect, useState } from "react";
import { ArrowRight, LoaderCircle, Split, X } from "lucide-react";

import type { EvolutionPokemon } from "../../types/evolution";
import type { PokemonModalData } from "../../types/modal";

import { getPokemonModalData } from "../../services/Pokemon";

import { getModalGradient } from "./stylesVariants";

import StatBar from "./StatBar";
import Ability from "./Ability";

import * as S from "./styles";

function EvolutionBranch({ pokemon }: { pokemon: EvolutionPokemon }) {
  const hasChildren = pokemon.evolvesTo.length > 0;
  const isBranching = pokemon.evolvesTo.length > 1;

  return (
    <div className={S.EvolutionBranch}>
      <div className={S.EvolutionCard}>
        <p className={S.EvolutionName}>{pokemon.name}</p>

        <div className={S.EvolutionImageWrapper}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={S.EvolutionImage}
          />
        </div>
      </div>

      {hasChildren && (
        <>
          <span className={S.EvolutionConnector}>
            {isBranching ? (
              <Split
                className="h-5 w-5 rotate-90 transform"
                strokeWidth={2}
              />
            ) : (
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            )}
          </span>

          <div
            className={
              isBranching
                ? S.EvolutionChildrenColumn
                : S.EvolutionChildrenRow
            }
          >
            {pokemon.evolvesTo.map((evolution) => (
              <EvolutionBranch key={evolution.id} pokemon={evolution} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
          <div className="flex items-center gap-2 text-white">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            <p>Loading...</p>
          </div>
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
            <X className="h-5 w-5" strokeWidth={2} />
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
                <EvolutionBranch pokemon={pokemon.evolution} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
