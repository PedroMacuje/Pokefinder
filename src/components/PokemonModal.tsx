import { useEffect, useState } from "react";

import getStatColor from "../utils/statBarColor";

import { typeColorsGradient, type Pokemon } from "../types/pokemon";

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
    setAnimate(false);

    const frame = requestAnimationFrame(() => {
      setAnimate(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [pokemon.id]);

  function formatStatName(name: string) {
    return name.replace("-", " ");
  }

  function getWidth(value: number) {
    return `${Math.min(value, 250) / 2.5}%`;
  }

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
                <div key={stat.stat.name}>
                  {/* Label */}
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-white">
                      {formatStatName(stat.stat.name)}
                    </span>
                    <span className="text-white">{stat.base_stat}</span>
                  </div>

                  {/* Bar background */}
                  <div className="w-full h-2 bg-gray-200 rounded">
                    {/* Animated bar */}
                    <div
                      className={`
                      h-2 rounded
                      transition-[width] duration-700 ease-out
                      `}
                      style={{
                        width: animate ? getWidth(stat.base_stat) : "0%",
                        transitionDelay: `${index * 100}ms`,
                        backgroundColor: getStatColor(stat.base_stat),
                      }}
                    />
                  </div>
                </div>
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
                  {normalAbilities.map((a) => (
                    <span
                      key={a.ability.name}
                      className="
                        px-3 py-1
                        bg-white/20 border border-white/30
                        rounded-full
                        text-sm capitalize text-white
                        backdrop-blur-sm
                      "
                    >
                      {a.ability.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hidden ability */}
              {hiddenAbility && (
                <div>
                  <p className="text-sm text-purple-300 mb-2 text-center">
                    Hidden Ability
                  </p>

                  <div className="flex justify-center">
                    <span
                      className="
                        px-3 py-1
                        bg-purple-500/30 border border-purple-400/40
                        rounded-full
                        text-sm capitalize text-white
                        backdrop-blur-sm
                        shadow-md
                      "
                    >
                      {hiddenAbility.ability.name}
                    </span>
                  </div>
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
