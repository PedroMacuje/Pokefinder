import axios from "axios";
import { api } from "../api";

interface PokemonDetailsResponse {
  species: {
    url: string;
  };
}

interface PokemonSpeciesResponse {
  evolution_chain: {
    url: string;
  };
}

interface EvolutionChainResponse {
  chain: EvolutionNode;
}

interface EvolutionNode {
  species: {
    name: string;
  };

  evolves_to: EvolutionNode[];
}

interface PokemonResponse {
  id: number;
}

export interface EvolutionPokemon {
  id: number;
  name: string;
  image: string;
}

async function flattenEvolutionChain(
  node: EvolutionNode,
  result: EvolutionPokemon[] = [],
): Promise<EvolutionPokemon[]> {
  const pokemonResponse = await api.get<PokemonResponse>(
    `/pokemon/${node.species.name}`,
  );

  const pokemonId = pokemonResponse.data.id;

  result.push({
    id: pokemonId,
    name: node.species.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
  });

  // Counts for multiple evolution lines
  for (const evolution of node.evolves_to) {
    await flattenEvolutionChain(evolution, result);
  }

  return result;
}

// Fetches Pokémon evolution chain.
export async function getPokemonEvolution(
  pokemonName: string,
): Promise<EvolutionPokemon[]> {
  // Get base species URL from pokemon endpoint
  const pokemonResponse = await api.get<PokemonDetailsResponse>(
    `/pokemon/${pokemonName}`,
  );

  // Fetch species
  const speciesResponse = await axios.get<PokemonSpeciesResponse>(
    pokemonResponse.data.species.url,
  );

  // Fetch evolution chain
  const evolutionResponse = await axios.get<EvolutionChainResponse>(
    speciesResponse.data.evolution_chain.url,
  );

  // Flatten evolution tree
  return flattenEvolutionChain(evolutionResponse.data.chain);
}
