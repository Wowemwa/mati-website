/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { 
    extend: {
      colors: {
        brand: {
          green: '#059669',
          blue: '#2563eb',
          purple: '#7e22ce'
        }
      },
      boxShadow: {
        'glow-green': '0 0 0 3px rgba(16,185,129,0.25)',
        'glow-blue': '0 0 0 3px rgba(37,99,235,0.25)'
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(.34,1.56,.64,1)'
      }
    } 
  },
  plugins: [],
}
