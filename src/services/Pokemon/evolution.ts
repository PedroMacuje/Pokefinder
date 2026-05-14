import axios from "axios";

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

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

// Recursively flattens the evolution tree into a simple array.
async function flattenEvolutionChain(
  node: EvolutionNode,
  result: EvolutionPokemon[] = [],
): Promise<EvolutionPokemon[]> {
  // Fetch pokemon ID
  const pokemonResponse = await api.get<PokemonResponse>(
    `/pokemon/${node.species.name}`,
  );

  const pokemonId = pokemonResponse.data.id;

  result.push({
    id: pokemonId,
    name: node.species.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
  });

  if (node.evolves_to && node.evolves_to.length > 0) {
    await flattenEvolutionChain(node.evolves_to[0], result);
  }

  return result;
}

// Fetches the Pokémon evolution chain.
export async function getPokemonEvolution(
  pokemonName: string,
): Promise<EvolutionPokemon[]> {
  const speciesResponse = await api.get<PokemonSpeciesResponse>(
    `/pokemon-species/${pokemonName}`,
  );

  const evolutionResponse = await axios.get<EvolutionChainResponse>(
    speciesResponse.data.evolution_chain.url,
  );

  return await flattenEvolutionChain(evolutionResponse.data.chain);
}
