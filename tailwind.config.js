/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "xlg":"1120px",
        "xlsm": "550px",
        "xxxxsm":"220px"
      },
      width:{
        extraSmall:"2.5vw"
      },
      fontSize:{
        extraSmall:"2.5vw",
        x:"14vw",
        y:"5vw",
        z:"4vw",
        a:"7vw",
      }
    },
  },
  plugins: [],
}
