import axios from "axios";
import { api } from "../api";

import type {
  EvolutionChainResponse,
  EvolutionNode,
  EvolutionPokemon,
  PokemonSpeciesResponse,
} from "../../types/evolution";
import type { PokemonApiResponse } from "../../types/api";

async function buildEvolutionTree(
  node: EvolutionNode,
): Promise<EvolutionPokemon> {
  const pokemonResponse = await api.get<PokemonApiResponse>(
    `/pokemon/${node.species.name}`,
  );

  const pokemon = pokemonResponse.data;

  const evolvesTo = await Promise.all(
    node.evolves_to.map((evolution) => buildEvolutionTree(evolution)),
  );

  return {
    id: pokemon.id,
    name: node.species.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    types: pokemon.types.map((type) => type.type.name),
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
