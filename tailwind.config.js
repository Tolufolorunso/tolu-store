/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        app: {
          100: "#33b5e5",
          200: "#0980ab",
        },
      },
    },
  },
  plugins: [],
};
