/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      "body1": ["Figtree"],
    },
    extend: {
      colors: {
        "black": {
          "100": "#080708", //black 06
          "200": "#313031", //black 05
          "300": "#838383", //black 03
          "400": "#ADACAD", //black 02

          
          "bodyBgColor": "#F1F0F0",
          "calcBgColor": "#E4E3E3",
        },
        "primary":{
          "100": "#0452C7", //primary 02
          "200": "#033178", //primary 06
          "300": "#022150",
          "400":"#011430",
          "500":'#82B0F7',
          "600": "#0562EF",// 01
        }
      }
    },
  },
  plugins: [],
}
