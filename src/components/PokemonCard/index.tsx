import { getCardGradient, getTypeBadgeColor } from "./stylesVariants";

import * as S from "./styles";

export interface PokemonCardProps {
  name: string;
  id: number;
  types: string[];
  onClick?: () => void;
}

export default function PokemonCard({
  id,
  types,
  name,
  onClick,
}: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const gradient = getCardGradient(types);

  return (
    <div onClick={onClick} className={S.CardContainer}>
      <div className={`${S.CardGradient} ${gradient}`} />
      <div className={`${S.CardGradientHover} ${gradient}`} />
      <div className={S.CardGlow} />
      <div className={S.CardContent}>
        <img src={imageUrl} alt={name} className={S.PokemonImage} />
        <h2 className={S.PokemonName}>{name}</h2>
        <span className={S.PokemonId}>#{String(id).padStart(3, "0")}</span>
        <div className={S.TypeContainer}>
          {types.map((type) => (
            <span
              key={type}
              className={`${S.TypeBadge} ${getTypeBadgeColor(type)}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
