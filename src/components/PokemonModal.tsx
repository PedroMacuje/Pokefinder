import { useEffect, useState } from "react";
import { typeColorsGradient, type Pokemon } from "../types/pokemon";

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const [animate, setAnimate] = useState(false);
  const primaryType = pokemon.types[0];

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

  function getStatColor(value: number) {
    if (value > 150) return "bg-blue-400";
    if (value > 100) return "bg-green-600";
    if (value > 70) return "bg-yellow-300";
    return "bg-red-600";
  }

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
          bg-white rounded-2xl p-6
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

        {/* 🎨 Background gradient */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-br ${modalGradient}
            opacity-30
          `}
        />

        {/* 💡 Glow suave */}
        <div
          className="
            absolute inset-0
            bg-white/10 backdrop-blur-xl
          "
        />
        <div className="relative z-10">
          {/* TOP GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT - IMAGE */}
            <div className="flex items-center justify-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-52 h-52 object-contain animate-fade-in"
              />
            </div>

            {/* RIGHT - STATS */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>

              {pokemon.stats.map((stat, index) => (
                <div key={stat.stat.name}>
                  {/* Label */}
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">
                      {formatStatName(stat.stat.name)}
                    </span>
                    <span>{stat.base_stat}</span>
                  </div>

                  {/* Bar background */}
                  <div className="w-full h-2 bg-gray-200 rounded">
                    {/* Animated bar */}
                    <div
                      className={`
                      h-2 rounded
                      ${getStatColor(stat.base_stat)}
                      transition-[width] duration-700 ease-out
                      `}
                      style={{
                        width: animate ? getWidth(stat.base_stat) : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ABILITIES */}
          <div className="mt-6 text-center">
            <h3 className="font-semibold mb-2">Abilities</h3>

            <div className="flex flex-wrap justify-center gap-2">
              {pokemon.abilities.map((a) => (
                <span
                  key={a.ability.name}
                  className="
              px-3 py-1
              bg-gray-200
              rounded-full
              text-sm capitalize
              "
                >
                  {a.ability.name}
                </span>
              ))}
            </div>
          </div>

          {/* EVOLUTION (placeholder) */}
          <div className="mt-6 text-center">
            <h3 className="font-semibold mb-2">Evolution</h3>

            <p className="text-gray-400 text-sm">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
