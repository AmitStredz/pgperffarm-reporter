/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        'pg-blue': '#336791',
        'pg-blue-dark': '#234a6b',
        'pg-blue-light': '#4682b4',
        'pg-orange': '#ea7330',
        'pg-orange-dark': '#d65b1a',
        'pg-orange-light': '#f38b53',
        'pg-gray': '#f5f5f5',
        'pg-gray-dark': '#e0e0e0'
      },
      fontFamily: {
        sans: [
          'Source Sans Pro',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ]
      },
      boxShadow: {
        'pg': '0 4px 6px rgba(51, 103, 145, 0.1), 0 2px 4px rgba(51, 103, 145, 0.06)'
      }
    },
  },
  plugins: [],
}

