import { useEffect } from "react";
import type { Pokemon } from "../types/pokemon";

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="
        fixed inset-0
        flex items-center justify-center
      "
    >
      <div
        onClick={onClose}
        className="
          absolure inset-0
          bg-black/60 backdrop-blur-sm
          animate-fade-in
        "
      >
        <div
          className="
            relative z-10
            bg-white rounded-2x1 p-6
            w-[90%] max-w-md
            shadow-2xl
            animate-scale-in
          "
        >
          <button
            onClick={onClose}
            className="
              absolute top-3 right-3 
              text-gray-500 hover:text-black
            "
          >
            ✕
          </button>
          <div className="flex flex-col items-center">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              className="w-40 h-40"
            />
            <h2 className="text-2xl font-bold capitalize mt-2">
              {pokemon.name}
            </h2>

            <span className="text-gray-500 mb-4">
              #{String(pokemon.id).padStart(3, "0")}
            </span>

            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="
                    px-3 py-1 rounded-full 
                    bg-gray-200 text-sm capitalize
                  "
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
