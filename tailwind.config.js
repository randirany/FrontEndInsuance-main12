/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2sm': '750px',
        '2md':'986px',
        '3sm':'450px',
      },
      colors:{
        graySpan:'#6B7280',
        redPoint:'#f5f5f5 ',
        secnodColor:"#C3CEF6"
      }
    },
  },
  plugins: [],
}

