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
  moves: PokemonMove[];
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

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };

  version_group_details: PokemonMoveVersionGroupDetail[];
}

export interface PokemonMoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };

  version_group: {
    name: string;
    url: string;
  };
}

export interface PokemonMoveDetailsResponse {
  name: string;
  power: number | null;
  damage_class: {
    name: string;
  };

  type: {
    name: string;
  };

  effect_entries: PokemonMoveEffectEntry[];
}

export interface PokemonMoveEffectEntry {
  effect: string;
  short_effect: string;
  language: {
    name: string;
    url: string;
  };
}
