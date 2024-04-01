/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    screens: {
      'xlg': {'max': '1920px'},
      // => @media (max-width: 1920px) { ... }
      'lg': {'max': '1440px'},
      // => @media (max-width: 1440px) { ... }
      'md': {'max': '1030px'},
      // => @media (max-width: 1030px) { ... }
      'tab': {'max': '800px'},
      // => @media (max-width: 768px) { ... }
      'sm-tab': {'max': '600px'},
      // => @media (max-width: 600px) { ... }
      'mobile': {'max': '430px'},
      // => @media (max-width: 430px) { ... }
      'smobile': {'max': '380px'},
      // => @media (max-width: 360px) { ... }
    },

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
