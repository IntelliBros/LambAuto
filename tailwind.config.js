export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Times New Roman', 'serif'],
      },
      colors: {
        dark: {
          900: '#000000', // Pure black
          800: '#050505', // Almost pure black
          700: '#0A0A0A', // Very dark black
          600: '#0F0F0F', // Slightly lighter black
          500: '#141414', // Dark black
          400: '#1A1A1A', // Dark black with slight gray
          300: '#222222', // Very dark gray/black
          200: '#2A2A2A', // Dark gray/black
        },
        accent: {
          red: '#D10000', // Luxury red accent
        }
      }
    },
  },
  plugins: [],
}