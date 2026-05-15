import TypeFilterItem from "./TypeFilterItem";

import { pokemonTypes } from "../../constants/pokemonTypes";

interface TypeFilterProps {
  selectedType: string | null;

  onSelect: (type: string | null) => void;
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
        {Object.keys(pokemonTypes).map((type) => (
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
