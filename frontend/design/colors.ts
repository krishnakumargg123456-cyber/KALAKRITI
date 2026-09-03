export const colors = {
  cream: "#F7F0E2",
  parchment: "#EFE2C5",
  paper: "#FBF7EE",

  maroon: "#6E1F2A",
  deepMaroon: "#4A1420",
  maroonLight: "#8B3543",

  gold: "#B08D57",
  antiqueGold: "#C6A15B",
  goldLight: "#D8BC7A",

  green: "#3F5A45",
  greenLight: "#60765D",

  brown: "#5A4032",
  darkBrown: "#30231E",

  ink: "#2B211D",
  muted: "#74665B",

  white: "#FFFDF8",
  border: "#D8C7A7",
} as const;

export type ColorToken = keyof typeof colors;
