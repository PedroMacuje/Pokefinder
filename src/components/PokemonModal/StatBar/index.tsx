import * as S from "./styles";

import getStatColor from "../../../utils/statBarColor";

interface StatBarProps {
  statLabel: string;
  baseStat: number;
  animate: boolean;
  index: number;
}

export default function StatBar({
  baseStat,
  statLabel,
  animate,
  index,
}: StatBarProps) {
  function formatStatName(name: string) {
    return name.replace("-", " ");
  }

  function getWidth(value: number) {
    return `${Math.min(value, 250) / 2.5}%`;
  }

  return (
    <div className={S.StatContainer}>
      <div className={S.StatHeader}>
        <span className={S.StatLabel}>{formatStatName(statLabel)}</span>
        <span className={S.StatValue}>{baseStat}</span>
      </div>
      <div className={S.StatBackground}>
        <div
          className={S.StatFill}
          style={{
            width: animate ? getWidth(baseStat) : "0%",

            transitionDelay: `${index * 100}ms`,

            backgroundColor: getStatColor(baseStat),
          }}
        />
      </div>
    </div>
  );
}
