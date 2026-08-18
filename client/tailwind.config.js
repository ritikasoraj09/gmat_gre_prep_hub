/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#4FB6AE",
          purple: "#6A4C93",
          mint: "#A9E4D8",
        },
      },
    },
  },
  plugins: [],
};
