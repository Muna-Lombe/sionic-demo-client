const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    plugins: [
      function ({ matchVariant, addVariant }) {
        addVariant('child', '& > *');
        addVariant('child-hover', '& > *:hover');
        addVariant('2n-child', '&:nth-child(2)');
        addVariant('3n-child', '&:nth-child(3)');
        addVariant('4n-child', '&:nth-child(4)');
        addVariant('5n-child', '&:nth-child(5)');
        addVariant('6n-child', '&:nth-child(6)');
        addVariant('7n-child', '&:nth-child(7)');
        addVariant('8n-child', '&:nth-child(8)');
        // matchVariant(
        //   'nth',
        //   (value) => {
        //     return `&:nth-child(${value})`;
        //   },
        //   {
        //     values: {
        //       DEFAULT: 'n', // Default value for `nth:`
        //       '2n': '2n', // `nth-2n:utility` will generate `:nth-child(2n)` CSS selector
        //       '3n': '3n',
        //       '4n': '4n',
        //       '5n': '5n',
        //       //... so on if you need
        //     },
        //   }
        // );
        // addVariant('child-nth', '&>')
      }

    ],
    theme: {
      screens: {
        'xs': '475px',
        'mid-md-lg': '900px',
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
  