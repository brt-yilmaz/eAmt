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
        butContent: "hsl(var(--color-butContent) / <alpha-value>)",
        bgButHov: "hsl(var(--color-bgButHov) / <alpha-value>)",
        content: "hsl(var(--color-content) / <alpha-value>)",
        footer: "hsl(var(--color-footer) / <alpha-value>)",
        bgSideBar: "hsl(var(--color-bgSideBar) / 0.1)",
      },
      animation: {
        "spin-slower": "spin 35s ease infinite",
        "spin-slow": "spin 25s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
};
