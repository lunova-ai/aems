/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        aems: {
          bg: "#031f1f",
          neon: "#00E7B3",
          soft: "#12C7A5",
          text: "#CCCCCC"
        }
      }
    }
  },
  plugins: []
};
