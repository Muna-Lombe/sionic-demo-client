const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
      screens: {
        'xs': '475px',
        ...defaultTheme.screens
      },
      extend: {
        fontFamily:{
          'raleway':"Raleway,sans",
          'monserrat':"Monserrat,sans"
        },
        backgroundImage:{
          'reel-backdrop': "url('https://i.ytimg.com/vi/C_3wBEmeNQ0/maxresdefault.jpg')",
          'card-backdrop' : "url('https://www.nfsa.gov.au/sites/default/files/collection/hero_image09-2016/370394_crocodile_dundee_hero_image_crop3.jpg')"
        },
        scrollbar:{
          
        }
      },
    },
  // plugins: [require("daisyui")],
  }
  