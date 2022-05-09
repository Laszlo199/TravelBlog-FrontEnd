module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#E29219',
        "button-orange":  "#ff751a",
        'background-grey': '#E5E5E5',
        'primary-grey': '#838383'
      },
      width: {
        '800': '800px',
        '2/8': '25%',
        '5/8': '62.5%',
        '7/8': '87.5%'
      }
    },
  },
  plugins: [],
}
