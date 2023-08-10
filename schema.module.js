import { blue, sky, amber, slate } from "tailwindcss/colors";

/**
 * Blue and Gold schema
 */
const schema_BlueGold = {
  primary: blue[950],
  secondary: amber[500],
  tertiary: amber[700],
  para: blue[100],
  nav: blue[950],
  image: "/images/excited_couple_amber.png",
};

/**
 * Slate and Sky schema
 */
const schema_SlateSky = {
  primary: slate[950],
  secondary: sky[300],
  tertiary: sky[500],
  para: sky[100],
  nav: slate[950],
  image: "/images/excited_couple_sky.png",
};

/**
 * Dominion Lending schema
 */
const schema_DominionLegacy = {
  primary: "#004282",
  secondary: "#FFCC4E",
  tertiary: "#2CC1EC",
  para: "#BDEDFB",
  nav: "#004282",
  image: "/images/excited_couple_amber.png",
  // logo: "/images/dominion_logo_legacy.png"
};

//export const schema = schema_BlueGold;
//export const schema = schema_SlateSky;

export const schema = schema_DominionLegacy;
