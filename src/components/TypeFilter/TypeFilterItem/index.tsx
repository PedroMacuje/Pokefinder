import {
  pokemonTypes,
  type PokemonType,
} from "../../../constants/pokemonTypes";

import * as S from "./styles";

interface TypeFilterItemProps {
  type: PokemonType;
  active: boolean;
  onClick: (type: PokemonType) => void;
}

export default function TypeFilterItem({
  active,
  onClick,
  type,
}: TypeFilterItemProps) {
  const typeData = pokemonTypes[type];

  if (!typeData) {
    return null;
  }

  return (
    <button
      onClick={() => onClick(type)}
      className={`
        ${S.FilterButton}
        ${active ? S.ActiveFilterButton : S.InactiveFilterButton}
        group
      `}
    >
      <img src={typeData.icon} alt={typeData.label} className={S.FilterIcon} />
      <span className={S.Tooltip}>{typeData.label}</span>
    </button>
  );
}
