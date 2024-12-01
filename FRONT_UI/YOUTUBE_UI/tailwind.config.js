/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: { 
        'customgrid': '384px 384px 384px', 
        'customgrid4': '326px 326px 326px 326px',
      }
    },
  },
  plugins: [],
}

