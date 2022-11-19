/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        fluid: "clamp(1.5rem, 12vw - 1.5rem, 4.5rem)",
        "fluid-lg": "clamp(3rem, 12vw - 1.5rem, 3rem)",
      },
    },
  },
  plugins: [],
};
