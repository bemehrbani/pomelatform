import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#76b82a",
          50: "#f2f9e8",
          100: "#e3f2cc",
          200: "#c7e59a",
          300: "#aad768",
          400: "#8eca3e",
          500: "#76b82a",
          600: "#5e9321",
          700: "#476e19",
          800: "#2f4a10",
          900: "#182508",
        },
        dark: "#32373c",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
