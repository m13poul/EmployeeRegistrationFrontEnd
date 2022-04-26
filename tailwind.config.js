module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
        lora: ["Lora", "serif"],
      },
      colors: {
        primary: "#E1EFFF",
        secondary: "#01273E",
        tertiary: "#FF9E43",
        tertiaryHover: "#FC7A00",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("prettier-plugin-tailwindcss"),
  ],
  // mode: process.env.NODE_ENV ? "jit" : undefined,
};
