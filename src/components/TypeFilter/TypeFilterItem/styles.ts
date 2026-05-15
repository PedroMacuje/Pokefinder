export const FilterButton = `
  relative

  w-7 h-7

  rounded-full

  bg-white/5
  border border-white/10

  backdrop-blur-md

  flex items-center
  justify-center

  transition-all duration-300
`;

export const InactiveFilterButton = `
  opacity-40

  hover:opacity-70
  hover:scale-105
`;

export const ActiveFilterButton = `
  opacity-100

  scale-110

  bg-white/10

  border-white/20

  shadow-lg

  ring-1
  ring-white/30
`;

export const FilterIcon = `
  w-5 h-5

  object-contain

  pointer-events-none
`;

export const Tooltip = `
  absolute

  -top-8

  left-1/2
  -translate-x-1/2

  whitespace-nowrap

  px-2 py-1

  rounded-md

  bg-black/80
  text-white

  text-xs

  opacity-0
  pointer-events-none

  transition-all duration-200

  group-hover:opacity-100
`;
