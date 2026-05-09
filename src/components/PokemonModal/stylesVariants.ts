import { typeColorsGradient } from "../../constants/pokemonTypeColors";

export function getModalGradient(types: string[]) {
  const primaryType = types[0];

  const secondaryType = types[1];

  const primaryGradient =
    (primaryType && typeColorsGradient[primaryType]) ||
    "from-gray-200 to-gray-300";

  const secondaryGradient = secondaryType
    ? typeColorsGradient[secondaryType]
    : null;

  if (!secondaryGradient) {
    return primaryGradient;
  }

  return `${primaryGradient.split(" ")[0]} ${secondaryGradient.split(" ")[1]}`;
}
