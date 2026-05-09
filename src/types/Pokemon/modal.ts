export interface PokemonModalData {
  id: number;
  name: string;
  image: string;
  types: string[];

  stats: {
    name: string;
    value: number;
  }[];

  abilities: {
    name: string;
    isHidden: boolean;
    description?: string;
  }[];
}
