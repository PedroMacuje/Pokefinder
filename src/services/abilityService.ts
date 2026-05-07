type AbilityResponse = {
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
};

const abilityCache = new Map<string, string>();

export async function getAbilityDescription(name: string): Promise<string> {
  // Cache hit
  if (abilityCache.has(name)) {
    return abilityCache.get(name)!;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);

    const data: AbilityResponse = await response.json();

    if (!data.effect_entries) {
      return "No description available";
    }

    const entry = data.effect_entries.find((e) => e.language.name === "en");

    const description = entry?.effect || "No description available";

    abilityCache.set(name, description);

    return description;
  } catch {
    return "Failed to load description";
  }
}
