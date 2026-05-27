import { api } from "./api";

import type { AbilityResponse } from "../types/ability";

const abilityCache = new Map<string, string>();
const abilityRequestCache = new Map<string, Promise<string>>();

function getAbilityCacheKey(name: string) {
  return name.toLowerCase().trim();
}

export async function getAbilityDescription(name: string): Promise<string> {
  const cacheKey = getAbilityCacheKey(name);

  const cachedDescription = abilityCache.get(cacheKey);

  if (cachedDescription) {
    return cachedDescription;
  }

  const pendingAbilityRequest = abilityRequestCache.get(cacheKey);

  if (pendingAbilityRequest) {
    return pendingAbilityRequest;
  }

  try {
    const request = api
      .get<AbilityResponse>(`/ability/${cacheKey}`)
      .then((response) => {
        const entry = response.data.effect_entries.find(
          (effectEntry) => effectEntry.language.name === "en",
        );

        const description = entry?.effect ?? "No description available";

        abilityCache.set(cacheKey, description);
        abilityRequestCache.delete(cacheKey);

        return description;
      })
      .catch(() => {
        abilityRequestCache.delete(cacheKey);
        throw new Error("Failed to load description");
      });

    abilityRequestCache.set(cacheKey, request);

    return request;
  } catch {
    return "Failed to load description";
  }
}
