/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/daisyui/dist/**/*.{js,jsx}',
    './src/pages/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js,jsx}',
  
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}