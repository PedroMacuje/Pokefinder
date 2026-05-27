import TypeFilterItem from "./TypeFilterItem";

import {
  pokemonTypes,
  type PokemonType,
} from "../../constants/pokemonTypes";

interface TypeFilterProps {
  selectedType: PokemonType | null;

  onSelect: (type: PokemonType | null) => void;
}

export default function TypeFilter({
  selectedType,
  onSelect,
}: TypeFilterProps) {
  return (
    <div className="flex justify-center my-5 px-4">
      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-3
          max-w-xl
        "
      >
        {(Object.keys(pokemonTypes) as PokemonType[]).map((type) => (
          <TypeFilterItem
            key={type}
            type={type}
            active={selectedType === type}
            onClick={(clickedType) =>
              onSelect(selectedType === clickedType ? null : clickedType)
            }
          />
        ))}
      </div>
    </div>
  );
}
