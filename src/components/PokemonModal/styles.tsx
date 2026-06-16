export const ModalWrapper = `
  fixed inset-0 z-50
  flex items-center justify-center
`;

export const ModalWrapperClosing = `
  fixed inset-0 z-50
  flex items-center justify-center
  pointer-events-none
`;

export const ModalOverlay = `
  absolute inset-0
  bg-black/60
  backdrop-blur-sm
  animate-fade-in
`;

export const ModalOverlayClosing = `
  absolute inset-0
  bg-black/60
  backdrop-blur-sm
  opacity-0
  transition-opacity duration-200 ease-out
`;

export const ModalContainer = `
  relative z-10

  w-[95%]
  max-w-3xl

  my-4

  rounded-2xl

  overflow-hidden

  bg-white/20
  border border-white/30
  backdrop-blur-md

  shadow-2xl
  animate-scale-in
`;

export const ModalContainerClosing = `
  relative z-10

  w-[95%]
  max-w-3xl

  my-4

  rounded-2xl

  overflow-hidden

  bg-white/20
  border border-white/30
  backdrop-blur-md

  shadow-2xl
  opacity-0
  scale-95
  transition-all duration-200 ease-out
  pointer-events-none
`;

export const ModalScrollContent = `
  relative
  isolate

  min-h-full

  max-h-[90vh]

  overflow-y-scroll
  overflow-x-hidden

  p-6

  bg-gradient-to-br
`;

export const CloseButton = `
  absolute top-3 right-3
  z-20
  text-gray-500
  hover:text-black
`;

export const ModalGradient = `
  absolute inset-0
  bg-gradient-to-br
  opacity-60
`;

export const ModalDarkLayer = `
  absolute inset-0
  bg-black/20
  pointer-events-none
  z-0
`;

export const ModalGlow = `
  absolute inset-0
  z-0
  bg-white/5
  backdrop-blur-xl
  pointer-events-none
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

export const MainImageBlock = `
  flex flex-col items-center gap-3
`;

export const PokemonImage = `
  w-52 h-52
  object-contain
  animate-fade-in
`;

export const PokemonTypeRow = `
  flex flex-wrap items-center justify-center gap-2
`;

export const PokemonTypeBadge = `
  px-3 py-1
  rounded-full
  text-xs md:text-sm
  font-medium capitalize
  text-white
  border border-white/15
  backdrop-blur-sm
  shadow-sm
`;

export const StatsContainer = `
  space-y-2
`;

export const AbilitiesSection = `
  mt-6
`;

export const MovesSection = `
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

export const AbilitiesGridSingle = `
  grid grid-cols-1
  gap-6 items-start
  justify-items-center
  max-w-sm
  mx-auto
`;

export const AbilityColumn = `
  text-center
`;

export const AbilityColumnSingle = `
  text-center
  w-full
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

export const MoveList = `
  flex flex-wrap
  justify-center gap-2
  max-h-48
  overflow-y-auto
  px-2
  py-1
`;

export const MoveBadge = `
  px-3 py-1
  rounded-full
  text-xs md:text-sm
  font-medium capitalize
  text-white/90
  border border-white/15
  bg-white/10
  backdrop-blur-sm
  shadow-sm
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
  w-20 h-20
  md:w-24 md:h-24
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
  flex flex-col items-center justify-center
  gap-6 mt-4
  w-full
  overflow-x-auto
  pb-2
`;

export const EvolutionTree = `
  flex
  flex-col
  items-center
  gap-6
  w-max
  mx-auto
`;

export const EvolutionBranch = `
  flex items-center justify-center
  gap-4 md:gap-8
  w-max
`;

export const EvolutionCard = `
  flex flex-col items-center
  gap-1 md:gap-2
  shrink-0
`;

export const EvolutionTypeRow = `
  flex flex-wrap items-center justify-center gap-1
  max-w-[10rem]
`;

export const EvolutionTypeBadge = `
  px-2 py-0.5
  rounded-full
  text-[10px] md:text-xs
  font-medium capitalize
  text-white
  border border-white/15
  backdrop-blur-sm
  shadow-sm
`;

export const EvolutionLine = `
  flex items-center justify-center gap-4
`;

export const EvolutionBranchColumn = `
  flex flex-col items-center gap-2
`;

export const EvolutionItem = `
  flex flex-col items-center gap-2
`;

export const EvolutionChildrenRow = `
  flex items-center justify-center
  gap-4 md:gap-8
  w-max
`;

export const EvolutionChildrenColumn = `
  flex flex-col items-center
  gap-6 md:gap-10
`;

export const EvolutionConnector = `
  text-white/70 text-xl my-1
`;

export const EvolutionImage = `
  w-16 h-16
  md:w-20 md:h-20
  object-contain
  drop-shadow-lg
`;

export const EvolutionName = `
  text-xs md:text-sm text-white capitalize
`;

export const EvolutionArrow = `
  text-white/70 text-xl
`;
