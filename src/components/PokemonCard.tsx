import { useEffect, useState } from "react";

import { typeColors } from "../types/pokemon";

export interface PokemonCardProps {
  name: string;
  index: number;
}

export default function PokemonCard({ index, name }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;
  const [types, setTypes] = useState<string[]>([]);

  const primaryType = types[0];
  const gradient = typeColors[primaryType] || "from-gray-200 to-gray-300";

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json;

      setTypes(data.types.map((t: any) => t.type.name));
    }

    fetchDetails();
  }, [name]);

  return (
    <div
      className={`
        group relative p-4 rounded-2xl 
        bg-white/70 backdrop-blur-md
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-2 hover:scale-[1.03]
        cursor-pointer overflow-hidden
      `}
    >
      {/* 🔥 Gradient base (sempre visível leve) */}
      <div
        className={`
          absolute inset-0 rounded-2xl
          bg-gradient-to-br ${gradient}
          opacity-20
        `}
      />

      {/* ✨ Hover intensifica */}
      <div
        className={`
          absolute inset-0 rounded-2xl
          bg-gradient-to-br ${gradient}
          opacity-0 group-hover:opacity-40
          transition-opacity duration-300
        `}
      />

      {/* 💡 Glow */}
      <div
        className="
        absolute inset-0 rounded-2xl 
        opacity-0 group-hover:opacity-100 
        transition duration-300 blur-xl 
        bg-white/10
      "
      />

      {/* 📦 Conteúdo */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 🖼️ Imagem */}
        <img
          src={imageUrl}
          alt={name}
          className="
            w-24 h-24 object-contain
            transition-transform duration-300
            group-hover:scale-110 group-hover:rotate-2
          "
        />

        {/* 🏷️ Nome */}
        <h2 className="mt-3 text-lg font-semibold capitalize text-gray-800">
          {name}
        </h2>

        {/* 🔢 ID */}
        <span className="text-sm text-gray-500">
          #{String(index).padStart(3, "0")}
        </span>

        {/* 🧬 Tipos */}
        <div className="flex gap-2 mt-2">
          {types.map((type) => (
            <span
              key={type}
              className="
                px-2 py-1 text-xs rounded-full
                bg-black/10 text-gray-700
                backdrop-blur-sm capitalize
              "
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
