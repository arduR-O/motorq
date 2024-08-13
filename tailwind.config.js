/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1100px'},
      'mdl':{'max': '830px'},
      'md': {'max': '770px'},
      'sm': {'max': '639px'},
      'xs': {'max': '480px'},
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        orange: "#EB5939",
        grey: "#B7AB98",
        "dark-grey": "#212121",
        black: "#0D0D0D",
      },
    },
    
  },
  plugins: [],
};
