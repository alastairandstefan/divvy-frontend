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
        brandgreen: "#A6E8AC",
        receipt: "#FFF",
        dark: "#333"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'mytheme': {
          'primary': '#a6e8ac',
          'primary-focus': '#4506cb',
          'primary-content': '#000000',
          'secondary': '#E2E4E7',
          'secondary-focus': '#E2E4E7',
          'secondary-content': '#333',
          'accent': '#37cdbe',
          'accent-focus': '#2aa79b',
          'accent-content': '#ffffff',
          'neutral': '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          'info': '#2094f3',
          'success': '#009485',
          'warning': '#ED9A8F',
          'error': '#ff5724',
        },
      },
    ],
  },
}

