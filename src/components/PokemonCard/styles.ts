export const CardContainer = `
  group relative p-4 rounded-2xl
  bg-white/20 border border-white/30
  shadow-lg hover:shadow-xl
  transition-all duration-300
  hover:-translate-y-2 hover:scale-[1.03]
  cursor-pointer overflow-hidden
`;

export const CardGradient = `
  absolute inset-0 rounded-2xl
  bg-gradient-to-br opacity-20
`;

export const CardGradientHover = `
  absolute inset-0 rounded-2xl
  bg-gradient-to-br opacity-0
  group-hover:opacity-40
  transition-opacity duration-300
`;

export const CardGlow = `
  absolute inset-0 rounded-2xl
  opacity-0 group-hover:opacity-100
  transition duration-300
  blur-xl bg-white/10
`;

export const CardContent = `
  relative z-10
  flex flex-col items-center
`;

export const PokemonImage = `
  w-24 h-24 object-contain
  transition-transform duration-300
  group-hover:scale-110 group-hover:rotate-1
`;

export const PokemonName = `
  mt-3 text-lg font-semibold
  capitalize text-white/80
`;

export const PokemonId = `
  text-sm text-gray-400
`;

export const TypeContainer = `
  flex gap-2 mt-3
`;

export const TypeBadge = `
  px-3 py-1 text-xs font-medium
  rounded-full capitalize text-white
  backdrop-blur-sm border border-white/20
  shadow-sm transition-all duration-300
  hover:scale-105 hover:shadow-md
  hover:brightness-110 hover:-translate-y-0.5
`;
