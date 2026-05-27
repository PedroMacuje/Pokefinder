export interface PokemonIndexItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  species: {
    url: string;
  };

  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonStat {
  base_stat: number;

  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  is_hidden: boolean;

  ability: {
    name: string;
  };
}
