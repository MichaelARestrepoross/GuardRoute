/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
// added palette from https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'dark-navy': '#00043A',
        'navy': '#002962',
        'light-navy': '#004E89',
        'white': '#FFFFFF',
        'light-blue': '#407BA7',
        'red': '#FF002B',
        'red-orange': '#C00021',
        'dark-red': '#A0001C',
        'burgandy': '#800016',
      },
      fontFamily: {
        "noto-sans": ['"Noto Sans Symbols"', "sans-serif"],
        "orbitron": ['"Orbitron"', 'sans-serif'],
      },
      fontWeight: {
        // Define weight classes from 100 to 900
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
      },
    },
  },
  plugins: [],
};

