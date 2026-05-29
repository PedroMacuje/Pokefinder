import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";

import { getAbilityDescription } from "../../../services/abilityService";

import { getAbilityVariant } from "./stylesVariant";

import * as S from "./styles";

interface AbilityProps {
  name: string;
  isHidden?: boolean;
}

export default function Ability({ name, isHidden }: AbilityProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);

  async function handleClick() {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);

    if (description !== null) {
      return;
    }

    setIsLoading(true);

    try {
      const nextDescription = await getAbilityDescription(name);

      if (isMountedRef.current) {
        setDescription(nextDescription);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }

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

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
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

      {open && (
        <div className={S.AbilityTooltip}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Loading...
            </span>
          ) : (
            description ?? "No description available"
          )}
        </div>
      )}
    </div>
  );
}
