export interface PokemonCardProps {
  name: string;
  index: number;
}

export default function PokemonCard({ index, name }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;

  return (
    <div
      className="
        group relative p-4 rounded-2xl bg-white/70 backdrop-blur-md
        shadow-md hover:shadow-xl transition-all duration-300
        hover:-translate-y-2 hover:scale-[1.02] cursor-pointer
      "
    >
      {/* Glow background */}
      <div
        className="
            absolute inset-0 rounded-2xl bg-gradient-to-br 
            from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300
        "
      ></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Imagem */}
        <img
          src={imageUrl}
          alt={name}
          className="
            w-24 h-24 object-contain transition-transform duration-300
            group-hover:scale-110 group-hover:rotate-1
          "
        />

        {/* Nome */}
        <h2 className="mt-3 text-lg font-semibold capitalize text-gray-800">
          {name}
        </h2>

        {/* ID */}
        <span className="text-sm text-gray-600">
          #{String(index).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
