module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magenta: '#ff00ff',
        primary: '#00FF00',
        secondary: '#fbbf24',
        accent: '#10b981',
        customGreen : "#00FF00"
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spinAnimation: 'spin 20s linear infinite',
      },

    },
  },
  plugins: [],
}