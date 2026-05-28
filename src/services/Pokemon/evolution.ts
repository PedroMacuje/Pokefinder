import axios from "axios";
import { api } from "../api";

import type {
  EvolutionChainResponse,
  EvolutionNode,
  EvolutionPokemon,
  PokemonResponse,
  PokemonSpeciesResponse,
} from "../../types/evolution";

async function buildEvolutionTree(
  node: EvolutionNode,
): Promise<EvolutionPokemon> {
  const pokemonResponse = await api.get<PokemonResponse>(
    `/pokemon/${node.species.name}`,
  );

  const pokemonId = pokemonResponse.data.id;

  const evolvesTo = await Promise.all(
    node.evolves_to.map((evolution) => buildEvolutionTree(evolution)),
  );

  return {
    id: pokemonId,
    name: node.species.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
    evolvesTo,
  };
}

export async function getPokemonEvolutionBySpeciesUrl(
  speciesUrl: string,
): Promise<EvolutionPokemon> {
  const speciesResponse = await axios.get<PokemonSpeciesResponse>(speciesUrl);

  const evolutionResponse = await axios.get<EvolutionChainResponse>(
    speciesResponse.data.evolution_chain.url,
  );

  return buildEvolutionTree(evolutionResponse.data.chain);
}
