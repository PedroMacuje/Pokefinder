export interface Pokemon {
  name: string;
  url: string;
  id: number;
  types: string[];
  stats: PokemonStats[];
  abilities: PokemonAbility[];
}
export interface PokemonDetails {
  id: number;
  types: {
    type: {
      name: string;
    };
  }[];
  stats: PokemonStats[];
  abilities: PokemonAbility[];
}

export interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}

export interface PokemonTypes {
  type: {
    name: string;
  };
}
