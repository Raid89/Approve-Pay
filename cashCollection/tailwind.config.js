/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ['poppins', 'sans-serif'],
        "poppins-bold": ['poppins-bold', 'sans-serif'],
      },

      colors: {
        "light-blue": "#3886FF"
      }
    },
  },
  plugins: [],
}

