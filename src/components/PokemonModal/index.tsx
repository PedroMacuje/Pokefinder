import { useEffect, useState } from "react";

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

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Trigger stat animation on mount / pokemon change
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [pokemon.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal */}
      <div
        className="
          relative z-10
          bg-white/20 border border-white/30 
          backdrop-blur-md rounded-2xl p-6
          w-[95%] max-w-3xl
          shadow-2xl animate-scale-in
          overflow-hidden
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Background gradient */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-br ${modalGradient}
            opacity-20
          `}
        />
        <div
          className="
            absolute inset-0 rounded-2xl
            bg-black/20
          "
        />

        <div
          className="
            absolute inset-0
            bg-white/10 backdrop-blur-xl
          "
        />
        <div className="relative z-10 text-center mb-4">
          <h2 className="text-3xl font-bold capitalize text-white">
            {pokemon.name}
          </h2>

          <span className="text-white/70 text-sm">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
        </div>
        <div className="relative z-10">
          {/* TOP GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="flex items-center justify-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-52 h-52 object-contain animate-fade-in"
              />
            </div>

            {/* Stats */}
            <div className="space-y-2">
              {pokemon.stats.map((stat, index) => (
                <StatBar
                  animate={animate}
                  baseStat={stat.base_stat}
                  index={index}
                  statLabel={stat.stat.name}
                />
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-center text-white">
              Abilities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Normal abilities */}
              <div className="text-center">
                <p className="text-sm text-white/70 mb-2">Standard</p>

                <div className="flex flex-wrap justify-center gap-2">
                  {normalAbilities.map((ability) => (
                    <Ability
                      name={ability.ability.name}
                      key={ability.ability.name}
                    />
                  ))}
                </div>
              </div>

              {/* Hidden ability */}
              {hiddenAbility && (
                <div>
                  <p className="text-sm text-purple-300 mb-2 text-center">
                    Hidden Ability
                  </p>
                  <Ability name={hiddenAbility.ability.name} isHidden />
                </div>
              )}
            </div>
          </div>

          {/* Evolution (placeholder) */}
          <div className="mt-6 text-center">
            <h3 className="font-semibold mb-2 text-white/70">Evolution</h3>

            <p className="text-gray-400 text-sm">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
