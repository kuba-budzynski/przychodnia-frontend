const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      ...colors
    },
    screens: {
      'xsm': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1920px',
      'xxxl': '2560px',
    },   
    extend: {
      backgroundImage: theme => ({
        'hero-image': "url('https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')"
      }),
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '164': '42rem'
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
        '10xl': '108rem',
        'screen-3xl': '1920px'
      },
      fontSize: {
        '2xs': '.6rem',
        '3xs': '.5rem',
        '4xs': '.4rem',
        '8xl': '6rem'
      }
    },
  },
  variants: {
    extend: {},
  }
}
