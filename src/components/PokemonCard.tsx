import { typeColors, typeColorsGradient } from "../types/pokemon";

export interface PokemonCardProps {
  name: string;
  id: number;
  types: string[];
}

export default function PokemonCard({ id, types, name }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  // Gradient control
  const primaryType = types[0];
  const secondaryType = types[1];

  const primaryGradient =
    (primaryType && typeColorsGradient[primaryType]) ||
    "from-gray-200 to-gray-300";

  const secondaryGradient =
    (secondaryType && typeColorsGradient[secondaryType]) || null;

  const gradient = secondaryGradient
    ? `${primaryGradient.split(" ")[0]} ${secondaryGradient.split(" ")[1]}`
    : primaryGradient;

  function getTypes(type: string) {
    return typeColors[type] || "bg-gray-400";
  }
  // Gradient control

  return (
    <div
      className={`
        group relative p-4 rounded-2xl 
        bg-white/20 border border-white/30
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-2 hover:scale-[1.03]
        cursor-pointer overflow-hidden
      `}
    >
      <div
        className={`
          absolute inset-0 rounded-2xl
          bg-gradient-to-br ${gradient}
          opacity-20
        `}
      />

      <div
        className={`
          absolute inset-0 rounded-2xl
          bg-gradient-to-br ${gradient}
          opacity-0 group-hover:opacity-40
          transition-opacity duration-300
        `}
      />

      <div
        className="
        absolute inset-0 rounded-2xl 
        opacity-0 group-hover:opacity-100 
        transition duration-300 blur-xl 
        bg-white/10
      "
      />

      <div className="relative z-10 flex flex-col items-center">
        <img
          src={imageUrl}
          alt={name}
          className="
            w-24 h-24 object-contain
            transition-transform duration-300
            group-hover:scale-110 group-hover:rotate-1
          "
        />

        <h2 className="mt-3 text-lg font-semibold capitalize text-white/80">
          {name}
        </h2>

        <span className="text-sm text-gray-400">
          #{String(id).padStart(3, "0")}
        </span>

        <div className="flex gap-2 mt-3">
          {types.map((type) => {
            const color = getTypes(type);

            return (
              <span
                key={type}
                className={`
                  px-3 py-1 text-xs font-medium 
                  rounded-full capitalize
                  text-white ${color}
                  backdrop-blur-sm border 
                  border-white/20 shadow-sm transition-all 
                  duration-300 hover:scale-105 
                  hover:shadow-md hover:brightness-110
                  hover:-translate-y-0.5
                `}
              >
                {type}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
