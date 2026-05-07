export const ModalWrapper = `
  fixed inset-0 z-50
  flex items-center justify-center
`;

export const ModalOverlay = `
  absolute inset-0
  bg-black/60
  backdrop-blur-sm
  animate-fade-in
`;

export const ModalContainer = `
  relative z-10
  w-[95%] max-w-3xl
  overflow-hidden

  bg-white/20
  border border-white/30
  backdrop-blur-md

  rounded-2xl
  p-6

  shadow-2xl
  animate-scale-in
`;

export const CloseButton = `
  absolute top-3 right-3
  text-gray-500
  hover:text-black
`;

export const ModalGradient = `
  absolute inset-0
  bg-gradient-to-br
  opacity-20
`;

export const ModalDarkLayer = `
  absolute inset-0
  rounded-2xl
  bg-black/20
`;

export const ModalGlow = `
  absolute inset-0
  bg-white/10
  backdrop-blur-xl
`;

export const ModalHeader = `
  relative z-10
  text-center mb-4
`;

export const PokemonName = `
  text-3xl font-bold
  capitalize text-white
`;

export const PokemonId = `
  text-white/70 text-sm
`;

export const ModalContent = `
  relative z-10
`;

export const TopGrid = `
  grid grid-cols-1 md:grid-cols-2
  gap-6
`;

export const ImageContainer = `
  flex items-center justify-center
`;

export const PokemonImage = `
  w-52 h-52
  object-contain
  animate-fade-in
`;

export const StatsContainer = `
  space-y-2
`;

export const AbilitiesSection = `
  mt-6
`;

export const SectionTitle = `
  font-semibold mb-3
  text-center text-white
`;

export const AbilitiesGrid = `
  grid grid-cols-1 md:grid-cols-2
  gap-6 items-start
`;

export const AbilityColumn = `
  text-center
`;

export const AbilityLabel = `
  text-sm text-white/70
  mb-2
`;

export const HiddenAbilityLabel = `
  text-sm text-purple-300
  mb-2 text-center
`;

export const AbilityList = `
  flex flex-wrap
  justify-center gap-2
`;

export const EvolutionSection = `
  mt-6 text-center
`;

export const EvolutionTitle = `
  font-semibold mb-2
  text-white/70
`;

export const EvolutionPlaceholder = `
  text-gray-400 text-sm
`;
