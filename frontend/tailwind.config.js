/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#a78bfa", // purple-400
          DEFAULT: "#7c3aed", // violet-600
          dark: "#5b21b6", // purple-800
          pale: "#f5f3ff", // purple-50
          lavender: "#ddd6fe", // purple-200
        },
      },
    },
  },
  plugins: [],
};
