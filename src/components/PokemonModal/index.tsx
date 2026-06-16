import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, LoaderCircle, Split, X } from "lucide-react";

import type { EvolutionPokemon } from "../../types/evolution";
import type {
  PokemonModalData,
  PokemonMoveSortOption,
} from "../../types/modal";

import { getPokemonModalData } from "../../services/Pokemon";
import { getTypeBadgeColor } from "../PokemonCard/stylesVariants";

import { getModalGradient } from "./stylesVariants";

import StatBar from "./StatBar";
import Ability from "./Ability";

import * as S from "./styles";

function EvolutionBranch({ pokemon }: { pokemon: EvolutionPokemon }) {
  const hasChildren = pokemon.evolvesTo.length > 0;
  const isBranching = pokemon.evolvesTo.length > 1;

  return (
    <div className={S.EvolutionBranch}>
      <div className={S.EvolutionCard}>
        <p className={S.EvolutionName}>{pokemon.name}</p>

        <div className={S.EvolutionImageWrapper}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={S.EvolutionImage}
          />
        </div>

        <div className={S.EvolutionTypeRow}>
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`${S.EvolutionTypeBadge} ${getTypeBadgeColor(type)}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {hasChildren && (
        <>
          <span className={S.EvolutionConnector}>
            {isBranching ? (
              <Split className="h-5 w-5 rotate-90 transform" strokeWidth={2} />
            ) : (
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            )}
          </span>

          <div
            className={
              isBranching ? S.EvolutionChildrenColumn : S.EvolutionChildrenRow
            }
          >
            {pokemon.evolvesTo.map((evolution) => (
              <EvolutionBranch key={evolution.id} pokemon={evolution} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface PokemonModalProps {
  pokemonName: string;
  onClose: () => void;
}

export default function PokemonModal({
  pokemonName,
  onClose,
}: PokemonModalProps) {
  const [pokemon, setPokemon] = useState<PokemonModalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [moveSort, setMoveSort] = useState<PokemonMoveSortOption>("level");
  const [expandedMove, setExpandedMove] = useState<string | null>(null);
  const [isMoveSortOpen, setIsMoveSortOpen] = useState(false);
  const moveSortRef = useRef<HTMLDivElement | null>(null);

  const moveSortOptions: Array<{
    value: PokemonMoveSortOption;
    label: string;
  }> = [
    { value: "level", label: "Level" },
    { value: "power", label: "Power" },
    { value: "damageClass", label: "Damage Class" },
    { value: "type", label: "Type" },
    { value: "name", label: "Name" },
  ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);

      try {
        const data = await getPokemonModalData(pokemonName);

        setPokemon(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [pokemon]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!moveSortRef.current?.contains(event.target as Node)) {
        setIsMoveSortOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMoveSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const sortedMoves = useMemo(() => {
    if (!pokemon) {
      return [];
    }

    const moves = [...pokemon.moves];

    switch (moveSort) {
      case "power":
        return moves.sort((a, b) => {
          const aPower = a.power ?? -1;
          const bPower = b.power ?? -1;

          if (aPower !== bPower) {
            return bPower - aPower;
          }

          return a.name.localeCompare(b.name);
        });

      case "damageClass":
        return moves.sort((a, b) => {
          const classOrder = {
            physical: 0,
            special: 1,
            status: 2,
          } as const;

          const aOrder =
            classOrder[a.damageClass as keyof typeof classOrder] ?? 3;
          const bOrder =
            classOrder[b.damageClass as keyof typeof classOrder] ?? 3;

          if (aOrder !== bOrder) {
            return aOrder - bOrder;
          }

          return a.name.localeCompare(b.name);
        });

      case "type":
        return moves.sort((a, b) => {
          if (a.type !== b.type) {
            return a.type.localeCompare(b.type);
          }

          const aLevel = a.level ?? Number.POSITIVE_INFINITY;
          const bLevel = b.level ?? Number.POSITIVE_INFINITY;

          if (aLevel !== bLevel) {
            return aLevel - bLevel;
          }

          return a.name.localeCompare(b.name);
        });

      case "name":
        return moves.sort((a, b) => a.name.localeCompare(b.name));

      case "level":
      default:
        return moves.sort((a, b) => {
          const aLevel = a.level ?? Number.POSITIVE_INFINITY;
          const bLevel = b.level ?? Number.POSITIVE_INFINITY;

          if (aLevel !== bLevel) {
            return aLevel - bLevel;
          }

          return a.name.localeCompare(b.name);
        });
    }
  }, [moveSort, pokemon]);

  const handleMoveClick = (moveName: string) => {
    setExpandedMove((current) => (current === moveName ? null : moveName));
  };

  const selectedMoveSortLabel =
    moveSortOptions.find((option) => option.value === moveSort)?.label ??
    "Level";

  if (isLoading || !pokemon) {
    return (
      <div className={S.ModalWrapper}>
        <div className={S.ModalOverlay} />

        <div className={S.ModalContainer}>
          <div className="flex items-center gap-2 text-white">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const normalAbilities = pokemon.abilities.filter(
    (ability) => !ability.isHidden,
  );
  const hiddenAbility = pokemon.abilities.find((ability) => ability.isHidden);

  const modalGradient = getModalGradient(pokemon.types);

  return (
    <div className={S.ModalWrapper}>
      <div onClick={onClose} className={S.ModalOverlay} />

      <div className={S.ModalContainer}>
        <div className={S.ModalDarkLayer} />
        <div className={S.ModalGlow} />

        <div
          className={`
            ${S.ModalScrollContent}
            modal-scrollbar
            ${modalGradient}
          `}
        >
          <button onClick={onClose} className={S.CloseButton}>
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          <div className={S.ModalHeader}>
            <h2 className={S.PokemonName}>{pokemon.name}</h2>

            <span className={S.PokemonId}>
              # {String(pokemon.id).padStart(3, "0")}
            </span>
          </div>

          <div className={S.ModalContent}>
            <div className={S.TopGrid}>
              <div className={S.ImageContainer}>
                <div className={S.MainImageBlock}>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className={S.PokemonImage}
                  />

                  <div className={S.PokemonTypeRow}>
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className={`${S.PokemonTypeBadge} ${getTypeBadgeColor(type)}`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={S.StatsContainer}>
                {pokemon.stats.map((stat, index) => (
                  <StatBar
                    key={stat.name}
                    animate={animate}
                    baseStat={stat.value}
                    index={index}
                    statLabel={stat.name}
                  />
                ))}
              </div>
            </div>

            <div className={S.AbilitiesSection}>
              <h3 className={S.SectionTitle}>Abilities</h3>

              <div
                className={
                  hiddenAbility ? S.AbilitiesGrid : S.AbilitiesGridSingle
                }
              >
                <div
                  className={
                    hiddenAbility ? S.AbilityColumn : S.AbilityColumnSingle
                  }
                >
                  <p className={S.AbilityLabel}>Standard</p>

                  <div className={S.AbilityList}>
                    {normalAbilities.map((ability) => (
                      <Ability key={ability.name} name={ability.name} />
                    ))}
                  </div>
                </div>

                {hiddenAbility && (
                  <div className={S.AbilityColumn}>
                    <p className={S.HiddenAbilityLabel}>Hidden Ability</p>

                    <div className={S.AbilityList}>
                      <Ability name={hiddenAbility.name} isHidden />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={S.EvolutionSection}>
              <h3 className={S.EvolutionTitle}>Evolution</h3>
              <div className={S.EvolutionChain}>
                <div className={S.EvolutionTree}>
                  <EvolutionBranch pokemon={pokemon.evolution} />
                </div>
              </div>
            </div>

            <div className={S.MovesSection}>
              <div className={S.MovesHeader}>
                <h3 className={S.SectionTitle}>Moves</h3>

                <div ref={moveSortRef} className={S.MoveSortGroup}>
                  <span className={S.MoveSortLabel}>Sort by</span>

                  <div className={S.MoveSortWrapper}>
                    <button
                      type="button"
                      onClick={() => setIsMoveSortOpen((current) => !current)}
                      className={S.MoveSortTrigger}
                    >
                      <span>{selectedMoveSortLabel}</span>

                      <ChevronDown
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition-transform duration-200 ${
                          isMoveSortOpen ? "rotate-180" : ""
                        }`}
                        size={16}
                      />
                    </button>

                    {isMoveSortOpen && (
                      <div className={S.MoveSortPanel}>
                        <div className={S.MoveSortOptionList}>
                          {moveSortOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setMoveSort(option.value);
                                setIsMoveSortOpen(false);
                              }}
                              className={`
                                ${S.MoveSortOption}
                                ${
                                  moveSort === option.value
                                    ? S.MoveSortOptionActive
                                    : ""
                                }
                              `}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={S.MoveList}>
                {sortedMoves.map((move) => (
                  <div key={move.name}>
                    <button
                      type="button"
                      onClick={() => handleMoveClick(move.name)}
                      className={`
                        ${S.MoveCard}
                        ${S.MoveCardButton}
                        ${expandedMove === move.name ? S.MoveCardActive : ""}
                      `}
                    >
                      <div className={S.MoveCardTop}>
                        <p className={S.MoveName}>{move.name}</p>

                        <span className={S.MoveLevel}>
                          {move.level !== null
                            ? `Lv. ${move.level}`
                            : move.learnMethod.replaceAll("-", " ")}
                        </span>
                      </div>

                      <div className={S.MoveMetaRow}>
                        <span className={S.MovePowerBadge}>
                          Power {move.power ?? "—"}
                        </span>

                        <span className={S.MoveMetaBadge}>
                          {move.damageClass}
                        </span>

                        <span
                          className={`${S.MoveTypeBadge} ${getTypeBadgeColor(move.type)}`}
                        >
                          {move.type}
                        </span>
                      </div>
                    </button>

                    <div
                      className={`
                        ${S.MoveDescriptionPanel}
                        ${
                          expandedMove === move.name
                            ? S.MoveDescriptionPanelOpen
                            : S.MoveDescriptionPanelClosed
                        }
                      `}
                    >
                      <p className={S.MoveDescriptionText}>
                        {move.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
