import { useEffect } from "react";
import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function getStatColor(value: number) {
    if (value > 100) return "bg-green-500";
    if (value > 70) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-2xl p-6 w-[95%] max-w-3xl shadow-2xl animate-scale-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

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

            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">
                    {stat.stat.name.replace("-", " ")}
                  </span>
                  <span>{stat.baseStat}</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className={`
                      h-2 rounded
                      ${getStatColor(stat.baseStat)}
                      transition-all duration-700 ease-out
                    `}
                    style={{
                      width: `${Math.min(stat.baseStat, 150) / 1.5}%`,
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
                className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize"
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
  );
}
