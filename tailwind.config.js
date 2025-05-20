/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: "class",
  theme: {
    extend: {
      screens: {
        '2sm': '750px',
        '2md': '986px',
        '3sm': '450px',
      },
      colors: {
        graySpan: '#6B7280',
        redPoint: '#f5f5f5 ',
        secnodColor: "#C3CEF6",
        dark2:"rgb(2, 13, 26)",
        dark3:"rgb(107, 114, 128)",
        dark4:"rgb(55, 65, 81)",
        darkBorder:"rgb(75, 85, 99)",
        navbarBack:"rgb(18, 32, 49)",
        nav:"rgb(18, 32, 49)",
        textNav:"rgb(156, 163, 175)",
        borderNav:"rgb(39, 48, 62)"
      }
    },
  },
  plugins: [],
}

