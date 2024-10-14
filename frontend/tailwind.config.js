/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        mobile: "480px",

        tablet: "767px",

        laptop: "1024px",

        desktop: "1280px",

        "desktop-lg": "1440px",

        "desktop-xl": "1920px",
      },
      colors: {
        CustomGray: {
          900: "#1D2026",
          800: "#363B47",
          700: "#4E5566",
          600: "#6E7485",
          500: "#8C94A3",
          400: "#A1A5B3",
          300: "#B7BAC7",
          200: "#CED1D9",
          100: "#E9EAF0",
          50: "#F5F7FA",
        },
        Primary: {
          900: "#33140B",
          800: "#662916",
          700: "#993D20",
          600: "#CC522B",
          500: "#FF6636",
          400: "#FF855E",
          300: "#FFA386",
          200: "#FFDDD1",
          100: "#FFEEE8",
        },
        Secondary: {
          900: "#111033",
          800: "#222065",
          700: "#342F98",
          600: "#453FCA",
          500: "#564FFD",
          400: "#7872FD",
          300: "#9A95FE",
          200: "#CDCBFE",
          100: "#EBEBFF",
        },
        Success: {
          900: "#07260A",
          800: "#0E4C14",
          700: "#15711F",
          600: "#1C9729",
          500: "#23BD33",
          400: "#4FCA5C",
          300: "#7BD785",
          200: "#C3E5C6",
          100: "#E1F7E3",
        },
        Warning: {
          900: "#331D06",
          800: "#65390C",
          700: "#985613",
          600: "#CC7319",
          500: "#FD8E1F",
          400: "#FDA44C",
          300: "#FEBB79",
          200: "#FED1A5",
          100: "#FFF2E5",
        },
        Error: {
          900: "#2D0E0E",
          800: "#5B1B1B",
          700: "#882929",
          600: "#B63636",
          500: "#E34444",
          400: "#E96969",
          300: "#EE8F8F",
          200: "#F4C8C8",
          100: "#FFF0F0",
        },
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)",
        ],
      },
    },
    fontFamily: {
      sans: "Inter, sans-serif",
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        CustomTheme: {
          primary: "#FF6636",
          "primary-focus": "#CC522B",
          "primary-content": "#ffffff",

          secondary: "#564FFD",
          "secondary-focus": "#453FCA",
          "secondary-content": "#ffffff",

          accent: "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",

          neutral: "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",

          "base-100": "#ffffff",
          "base-200": "#F5F7FA",
          "base-300": "#E9EAF0",
          "base-content": "#1D2026",

          info: "#2094f3",
          success: "#23BD33",
          warning: "#FD8E1F",
          error: "#E34444",

          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": "0.5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
};
