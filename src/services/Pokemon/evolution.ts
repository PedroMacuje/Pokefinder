import axios from "axios";
import { api } from "../api";

import type {
  EvolutionChainResponse,
  EvolutionNode,
  EvolutionPokemon,
  PokemonResponse,
  PokemonSpeciesResponse,
} from "../../types/evolution";

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

  for (const evolution of node.evolves_to) {
    await flattenEvolutionChain(evolution, result);
  }

  return result;
}

export async function getPokemonEvolutionBySpeciesUrl(
  speciesUrl: string,
): Promise<EvolutionPokemon[]> {
  const speciesResponse = await axios.get<PokemonSpeciesResponse>(speciesUrl);

  const evolutionResponse = await axios.get<EvolutionChainResponse>(
    speciesResponse.data.evolution_chain.url,
  );

  return flattenEvolutionChain(evolutionResponse.data.chain);
}
