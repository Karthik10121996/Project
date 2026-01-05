/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 Add this!!
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        qtyIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "qty-in": "qtyIn 0.25s ease-out forwards",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // turned off default styling
  },
};
