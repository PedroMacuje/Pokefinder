import getStatColor from "../../utils/statBarColor";

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
    <div key={statLabel}>
      {/* Label */}
      <div className="flex justify-between text-sm mb-1">
        <span className="capitalize text-white">
          {formatStatName(statLabel)}
        </span>
        <span className="text-white">{baseStat}</span>
      </div>

      {/* Bar background */}
      <div className="w-full h-2 bg-gray-200 rounded">
        {/* Animated bar */}
        <div
          className={`
                              h-2 rounded
                              transition-[width] duration-700 ease-out
                              `}
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
