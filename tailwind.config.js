/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "node_modules/daisyui/dist/**/*.{js,jsx}",
    "./src/pages/**/*.{html,js,jsx}",
    "./src/components/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        appbg: "#F3F3F3",
        primBrand: "#A6E8AC",
        receipt: "#FFF",
        dark: "#333"
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
