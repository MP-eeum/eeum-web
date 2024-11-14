/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        slideUp: "slideUp 300ms ease-in-out forwards",
        slideDown: "slideDown 300ms ease-in-out forwards",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
      },
    },
    colors: {
      primary: "#396951",
      black: "#000000",
      white: "#ffffff",
      textgray: "#565656",
      textlight: "#A6A6A6",
      lightgray: "#E3E3E3",
      boxgray: "#EAEAEA",
    },
    fontFamily: {
      pre: ["Pretendard"],
    },
  },
  plugins: [],
};
