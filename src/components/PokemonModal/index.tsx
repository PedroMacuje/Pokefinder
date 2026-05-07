import { useEffect, useState } from "react";

import * as S from "./styles";

import { typeColorsGradient, type Pokemon } from "../../types/pokemon";

import StatBar from "./StatBar";
import Ability from "./Ability";

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const [animate, setAnimate] = useState(false);

  const primaryType = pokemon.types[0];

  const normalAbilities = pokemon.abilities.filter((a) => !a.is_hidden);

  const hiddenAbility = pokemon.abilities.find((a) => a.is_hidden);

  const modalGradient =
    (primaryType && typeColorsGradient[primaryType]) ||
    "from-gray-200 to-gray-300";

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

  // Trigger stat animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [pokemon.id]);

  return (
    <div className={S.ModalWrapper}>
      {/* Overlay */}
      <div onClick={onClose} className={S.ModalOverlay} />

      {/* Modal */}
      <div className={S.ModalContainer}>
        {/* Close button */}
        <button onClick={onClose} className={S.CloseButton}>
          ✕
        </button>

        {/* Background gradient */}
        <div
          className={`
            ${S.ModalGradient}
            ${modalGradient}
          `}
        />

        <div className={S.ModalDarkLayer} />

        <div className={S.ModalGlow} />

        {/* Header */}
        <div className={S.ModalHeader}>
          <h2 className={S.PokemonName}>{pokemon.name}</h2>

          <span className={S.PokemonId}>
            #{String(pokemon.id).padStart(3, "0")}
          </span>
        </div>

        {/* Content */}
        <div className={S.ModalContent}>
          {/* Top grid */}
          <div className={S.TopGrid}>
            {/* Image */}
            <div className={S.ImageContainer}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                className={S.PokemonImage}
              />
            </div>

            {/* Stats */}
            <div className={S.StatsContainer}>
              {pokemon.stats.map((stat, index) => (
                <StatBar
                  key={stat.stat.name}
                  animate={animate}
                  baseStat={stat.base_stat}
                  index={index}
                  statLabel={stat.stat.name}
                />
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className={S.AbilitiesSection}>
            <h3 className={S.SectionTitle}>Abilities</h3>

            <div className={S.AbilitiesGrid}>
              {/* Standard abilities */}
              <div className={S.AbilityColumn}>
                <p className={S.AbilityLabel}>Standard</p>

                <div className={S.AbilityList}>
                  {normalAbilities.map((ability) => (
                    <Ability
                      key={ability.ability.name}
                      name={ability.ability.name}
                    />
                  ))}
                </div>
              </div>

              {/* Hidden ability */}
              {hiddenAbility && (
                <div className={S.AbilityColumn}>
                  <p className={S.HiddenAbilityLabel}>Hidden Ability</p>

                  <div className={S.AbilityList}>
                    <Ability name={hiddenAbility.ability.name} isHidden />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Evolution */}
          <div className={S.EvolutionSection}>
            <h3 className={S.EvolutionTitle}>Evolution</h3>

            <p className={S.EvolutionPlaceholder}>Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
