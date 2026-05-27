import { api } from "./api";

import type { AbilityResponse } from "../types/ability";

const abilityCache = new Map<string, string>();

export async function getAbilityDescription(name: string): Promise<string> {
  const cachedDescription = abilityCache.get(name);

  if (cachedDescription) {
    return cachedDescription;
  }

  try {
    const response = await api.get<AbilityResponse>(`/ability/${name}`);

    const entry = response.data.effect_entries.find(
      (effectEntry) => effectEntry.language.name === "en",
    );

    const description = entry?.effect ?? "No description available";

    abilityCache.set(name, description);

    return description;
  } catch {
    return "Failed to load description";
  }
}
