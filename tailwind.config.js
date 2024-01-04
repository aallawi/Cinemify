/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00bcb1",
        secondary: "#ffd600",
      },
    },
  },
  plugins: [],
};
