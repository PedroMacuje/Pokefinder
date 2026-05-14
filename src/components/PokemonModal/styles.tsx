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

  w-[95%]
  max-w-3xl

  max-h-[90vh]
  overflow-y-auto

  my-4

  bg-white/20
  border border-white/30
  backdrop-blur-md

  rounded-2xl
  p-6

  shadow-2xl
  animate-scale-in

  overflow-x-hidden
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

export const EvolutionImageWrapper = `
  relative
  w-24 h-24
  rounded-full

  bg-white/10
  border border-white/20

  backdrop-blur-md

  flex items-center justify-center

  shadow-lg

  transition-all duration-300

  hover:scale-105
  hover:bg-white/20
`;

export const EvolutionChain = `
  flex items-center justify-center
  flex-wrap gap-4 mt-4
`;

export const EvolutionItem = `
  flex items-center gap-4
`;

export const EvolutionImage = `
  w-20 h-20
  object-contain
  drop-shadow-lg
`;

export const EvolutionName = `
  text-sm text-white capitalize
`;

export const EvolutionArrow = `
  text-white/70 text-xl
`;
