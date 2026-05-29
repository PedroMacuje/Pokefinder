import { Search } from "lucide-react";

import * as S from "./styles";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ onChange, value }: SearchBarProps) {
  return (
    <div className={S.SearchContainer}>
      <div className={S.IconContainer}>
        <Search className="mr-2 h-5 w-5 text-slate-400" strokeWidth={2} />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={S.Input}
          placeholder="Ex: Pikachu"
          aria-label="Search"
          type="text"
        />
      </div>
    </div>
  );
}
