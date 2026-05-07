import { useState, useRef, useEffect } from "react";

import { getAbilityDescription } from "../../../services/abilityService";

import { getAbilityVariant } from "./stylesVariant";

import * as S from "./styles";

interface AbilityProps {
  name: string;
  isHidden?: boolean;
}

export default function Ability({ name, isHidden }: AbilityProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  async function handleClick() {
    // Toggle tooltip
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);

    const description = await getAbilityDescription(name);

    setDescription(description);
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
