import { typeColors, typeColorsGradient } from "../../types/pokemon";

export function getCardGradient(types: string[]) {
  const primaryType = types[0];
  const secondaryType = types[1];

  const primaryGradient =
    (primaryType && typeColorsGradient[primaryType]) ||
    "from-gray-200 to-gray-300";

  const secondaryGradient =
    (secondaryType && typeColorsGradient[secondaryType]) || null;

  return secondaryGradient
    ? `${primaryGradient.split(" ")[0]} ${secondaryGradient.split(" ")[1]}`
    : primaryGradient;
}

export function getTypeBadgeColor(type: string) {
  return typeColors[type] || "bg-gray-400";
}
