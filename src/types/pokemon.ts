export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonTypes {
  type: {
    name: string;
  };
}

export interface PokemonDetails {
  types: PokemonTypes[];
}

export const typeColors: Record<string, string> = {
  grass: "from-green-400 to-green-600",
  fire: "from-orange-400 to-red-500",
  water: "from-blue-400 to-blue-600",
  electric: "from-yellow-300 to-yellow-500",
  psychic: "from-pink-400 to-pink-600",
  ice: "from-cyan-300 to-blue-300",
  dragon: "from-indigo-500 to-purple-600",
  dark: "from-gray-700 to-gray-900",
  fairy: "from-pink-300 to-pink-500",
  normal: "from-gray-300 to-gray-400",
  fighting: "from-red-600 to-red-800",
  flying: "from-sky-300 to-indigo-400",
  poison: "from-purple-400 to-purple-600",
  ground: "from-yellow-600 to-amber-700",
  rock: "from-yellow-700 to-yellow-900",
  bug: "from-lime-400 to-green-500",
  ghost: "from-indigo-600 to-purple-800",
  steel: "from-gray-400 to-gray-600",
};
