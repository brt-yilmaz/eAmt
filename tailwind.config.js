/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "hsl(var(--color-accent) / <alpha-value>)",
        bgBase: "hsl(var(--color-bgBase) / <alpha-value>)",
        bgComp: "hsl(var(--color-bgComp) / <alpha-value>)",
        bgBut: "hsl(var(--color-bgBut) / <alpha-value>)",
        content: "hsl(var(--color-content) / <alpha-value>)",
      },
      animation: {
        "spin-slower": "spin 35s ease infinite",
        "spin-slow": "spin 25s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
};
