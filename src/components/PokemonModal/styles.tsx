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

export const MovesHeader = `
  flex flex-col gap-3 md:flex-row md:items-end md:justify-between
  mb-3
`;

export const MoveSortGroup = `
  flex flex-col gap-1 items-center md:items-end
`;

export const MoveSortWrapper = `
  relative
  w-full md:w-56
`;

export const MoveSortLabel = `
  text-xs uppercase tracking-[0.18em] text-white/60
`;

export const MoveSortTrigger = `
  w-full
  rounded-xl
  border border-white/15
  bg-white/15
  px-3 py-2.5 pr-10
  text-sm text-white
  outline-none
  backdrop-blur-md
  shadow-sm
  transition-all duration-200
  hover:bg-white/20
  focus:border-white/30
  focus:bg-white/20
  focus:shadow-lg
  focus:shadow-black/10
`;

export const MoveSortPanel = `
  absolute
  left-0 right-0 top-full z-20
  mt-2
  overflow-hidden
  rounded-xl
  border border-white/15
  bg-white/15
  backdrop-blur-md
  shadow-2xl
`;

export const MoveSortOptionList = `
  flex flex-col
  p-1
`;

export const MoveSortOption = `
  w-full
  rounded-lg
  px-3 py-2
  text-left
  text-sm text-white
  capitalize
  transition-colors duration-150
  hover:bg-white/15
`;

export const MoveSortOptionActive = `
  bg-white/20
`;

export const MoveList = `
  flex flex-col gap-2
`;

export const MoveCard = `
  rounded-2xl
  border border-white/10
  bg-slate-950/55
  px-4 py-3
  backdrop-blur-sm
  shadow-sm
`;

export const MoveCardButton = `
  w-full
  text-left
  cursor-pointer
`;

export const MoveCardActive = `
  border-white/20
  bg-slate-900/70
`;

export const MoveCardTop = `
  flex items-center justify-between gap-3
`;

export const MoveName = `
  text-sm md:text-base font-semibold capitalize text-white text-left
`;

export const MoveLevel = `
  text-xs md:text-sm text-white/70 whitespace-nowrap
`;

export const MoveMetaRow = `
  mt-3 flex flex-wrap items-center gap-2
`;

export const MoveMetaBadge = `
  px-2.5 py-1
  rounded-full
  text-[10px] md:text-xs
  font-medium capitalize
  text-white
  border border-white/15
  bg-white/10
  backdrop-blur-sm
`;

export const MoveTypeBadge = `
  px-2.5 py-1
  rounded-full
  text-[10px] md:text-xs
  font-medium capitalize
  text-white
  border border-white/15
  backdrop-blur-sm
`;

export const MovePowerBadge = `
  px-2.5 py-1
  rounded-full
  text-[10px] md:text-xs
  font-medium
  text-white
  border border-white/15
  bg-white/10
  backdrop-blur-sm
`;

export const MoveDescriptionPanel = `
  overflow-hidden
  rounded-xl
  border border-white/10
  bg-slate-950/55
  px-4
  transition-all duration-300 ease-out
`;

export const MoveDescriptionPanelOpen = `
  mt-3
  max-h-40
  py-3
  opacity-100
  translate-y-0
  pointer-events-auto
`;

export const MoveDescriptionPanelClosed = `
  mt-0
  max-h-0
  py-0
  opacity-0
  -translate-y-2
  pointer-events-none
`;

export const MoveDescriptionText = `
  text-sm text-white/85 leading-6
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
