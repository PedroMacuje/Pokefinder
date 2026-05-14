interface TypeFilterProps {
  selectedType: string | null;
  onSelect: (type: string | null) => void;
}

export default function TypeFilter({
  onSelect,
  selectedType,
}: TypeFilterProps) {
  return <button>fire</button>;
}
