import { useState, useRef, useEffect } from "react";

import { getAbilityVariant } from "./stylesVariant";

import * as S from "./styles";

interface AbilityProps {
  name: string;
  isHidden?: boolean;
}

type AbilityResponse = {
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
};

export default function Ability({ name, isHidden }: AbilityProps) {
  const [open, setOpen] = useState(false);

  const [description, setDescription] = useState("");

  const cache = useRef<Map<string, string>>(new Map());

  const containerRef = useRef<HTMLDivElement>(null);

  async function handleClick() {
    // Toggle tooltip
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);

    // Cache hit
    if (cache.current.has(name)) {
      setDescription(cache.current.get(name)!);

      return;
    }

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);

      const data: AbilityResponse = await res.json();

      if (!data.effect_entries) {
        setDescription("No description available");

        return;
      }

      const entry = data.effect_entries.find((e) => e.language.name === "en");

      const text = entry?.effect || "No description available";

      cache.current.set(name, text);

      setDescription(text);
    } catch {
      setDescription("Failed to load description");
    }
  }

  // Close tooltip on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={S.AbilityContainer}>
      <button
        onClick={handleClick}
        className={`
          ${S.AbilityButton}
          ${getAbilityVariant(isHidden)}
        `}
      >
        {name}
      </button>

      {open && <div className={S.AbilityTooltip}>{description}</div>}
    </div>
  );
}
