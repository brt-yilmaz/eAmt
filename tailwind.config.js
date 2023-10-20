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
        btSearch: "hsl(var(--color-btSearch) / <alpha-value>)",
      },
      animation: {
        "spin-slower": "spin 35s ease infinite",
        "spin-slow": "spin 25s ease-in-out infinite reverse",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
