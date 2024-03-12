/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/daisyui/dist/**/*.{js,jsx}',
    './src/pages/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js,jsx}',
  
  ],
  theme: {
    colors: {
      appbg: "#F3F3F3",
      primary: "#A6E8AC",
      receipt: "#FFF"
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
}