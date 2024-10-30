/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        richBlack: "#0D1321",
        prussianBlue: "#1d2d44",
        paynesGray: "#3E5C76",
        silverLakeBlue: "#748CAB",
        eggShell: "#F0EBD8",
      },
    },
  },
  plugins: [],
};
