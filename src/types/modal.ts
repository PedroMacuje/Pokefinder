export interface PokemonModalData {
  id: number;
  name: string;
  image: string;
  types: string[];
  evolution: EvolutionPokemon[];
  stats: PokemonStats[];
  abilities: PokemonAbilitites[];
}

export interface PokemonStats {
  name: string;
  value: number;
}

export interface PokemonAbilitites {
  name: string;
  isHidden: boolean;
  description?: string;
}

export interface EvolutionPokemon {
  name: string;
  image: string;
}
