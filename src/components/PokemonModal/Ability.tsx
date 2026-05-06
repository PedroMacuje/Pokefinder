import { useState, useRef, useEffect } from "react";

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
    // toggle
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);

    // cache hit
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

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseStyle = `
    px-3 py-1
    rounded-full
    text-sm capitalize text-white
    backdrop-blur-sm
    transition hover:scale-105
    border
  `;

  const variantStyle = isHidden
    ? "bg-purple-500/30 border-purple-400/40"
    : "bg-white/20 border-white/30";

  return (
    <div ref={containerRef} className="relative">
      {/* Ability tag */}
      <button onClick={handleClick} className={`${baseStyle} ${variantStyle}`}>
        {name}
      </button>

      {/* Tooltip */}
      {open && (
        <div
          className="
            absolute left-1/2 -translate-x-1/2 
            top-full mt-2 w-64 p-3
            bg-black/90 text-white text-xs
            rounded-lg shadow-xl z-50
          "
        >
          {description}
        </div>
      )}
    </div>
  );
}
