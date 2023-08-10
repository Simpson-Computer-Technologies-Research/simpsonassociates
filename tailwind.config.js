import { schema } from "./schema.module.js";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    animation: {
      "marquee-current": "marquee-current 40s linear infinite",
      "marquee-next": "marquee-next 40s linear infinite",

      "marquee-current-slow": "marquee-current 180s linear infinite",
      "marquee-next-slow": "marquee-next 180s linear infinite",
    },
    keyframes: {
      "marquee-current": {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      "marquee-next": {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    colors: schema,
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
};
export const plugins = [];
