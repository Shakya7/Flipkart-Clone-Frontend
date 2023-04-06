/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "xxlg":"1667px",
        "xlg":"1120px",
        "smd":"900px",
        "xlsm": "550px",
        "xxsm":"450px",
        "cartsm":"370px",
        "xxxsm":"350px",
        "xxxxsm":"220px",
        "xxxxxsm":"150px"
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
