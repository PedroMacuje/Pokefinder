import type { EvolutionPokemon } from "./evolution";

export interface PokemonModalData {
  id: number;
  name: string;
  image: string;
  types: string[];
  moves: PokemonMoveData[];
  evolution: EvolutionPokemon;
  stats: PokemonStats[];
  abilities: PokemonAbilitites[];
}

export interface PokemonMoveData {
  name: string;
  level: number | null;
  power: number | null;
  damageClass: string;
  type: string;
  learnMethod: string;
  description: string;
}

export type PokemonMoveSortOption =
  | "level"
  | "power"
  | "damageClass"
  | "type"
  | "name";

export interface PokemonStats {
  name: string;
  value: number;
}

export interface PokemonAbilitites {
  name: string;
  isHidden: boolean;
  description?: string;
}
