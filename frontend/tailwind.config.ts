import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./design/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        cream: "#F7F0E2",
        parchment: "#EFE2C5",
        paper: "#FBF7EE",

        maroon: {
          DEFAULT: "#6E1F2A",
          deep: "#4A1420",
          light: "#8B3543",
        },

        gold: {
          DEFAULT: "#B08D57",
          antique: "#C6A15B",
          light: "#D8BC7A",
        },

        heritage: {
          DEFAULT: "#3F5A45",
          light: "#60765D",
        },

        brown: {
          DEFAULT: "#5A4032",
          dark: "#30231E",
        },

        ink: "#2B211D",
        muted: "#74665B",
        border: "#D8C7A7",
      },

      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      maxWidth: {
        container: "1280px",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(74, 20, 32, 0.08)",
        card: "0 8px 30px rgba(74, 20, 32, 0.10)",
        elevated: "0 16px 50px rgba(48, 35, 30, 0.14)",
      },

      borderRadius: {
        card: "0.75rem",
      },

      transitionDuration: {
        400: "400ms",
      },
    },
  },

  plugins: [],
};

export default config;
