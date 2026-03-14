import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#e0eaff",
          500: "#3b6fd4",
          600: "#2d5bb8",
          700: "#1e4498",
          800: "#163378",
          900: "#0e2258",
        },
      },
    },
  },
  plugins: [],
};

export default config;
