export interface PokemonDetailsResponse {
  species: {
    url: string;
  };
}

export interface PokemonSpeciesResponse {
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChainResponse {
  chain: EvolutionNode;
}

export interface EvolutionNode {
  species: {
    name: string;
  };

  evolves_to: EvolutionNode[];
}

export interface PokemonResponse {
  id: number;
}

export interface EvolutionPokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  evolvesTo: EvolutionPokemon[];
}
