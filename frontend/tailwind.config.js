/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          50: 'rgb(var(--surface-50) / <alpha-value>)',
          100: 'rgb(var(--surface-100) / <alpha-value>)',
          200: 'rgb(var(--surface-200) / <alpha-value>)',
          300: 'rgb(var(--surface-300) / <alpha-value>)',
          400: 'rgb(var(--surface-400) / <alpha-value>)',
          500: 'rgb(var(--surface-500) / <alpha-value>)',
          600: 'rgb(var(--surface-600) / <alpha-value>)',
          700: 'rgb(var(--surface-700) / <alpha-value>)',
          800: 'rgb(var(--surface-800) / <alpha-value>)',
          900: 'rgb(var(--surface-900) / <alpha-value>)',
          950: 'rgb(var(--surface-950) / <alpha-value>)',
        },
        accent: {
          50: 'rgb(var(--accent-50) / <alpha-value>)',
          100: 'rgb(var(--accent-100) / <alpha-value>)',
          200: 'rgb(var(--accent-200) / <alpha-value>)',
          300: 'rgb(var(--accent-300) / <alpha-value>)',
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          700: 'rgb(var(--accent-700) / <alpha-value>)',
          800: 'rgb(var(--accent-800) / <alpha-value>)',
          900: 'rgb(var(--accent-900) / <alpha-value>)',
          950: 'rgb(var(--accent-950) / <alpha-value>)',
        },
        glow: {
          cyan: 'rgb(var(--glow-cyan) / <alpha-value>)',
          violet: 'rgb(var(--glow-violet) / <alpha-value>)',
          blue: 'rgb(var(--glow-blue) / <alpha-value>)',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgb(var(--glow-cyan) / 0.3)',
        'glow-md': '0 0 25px -5px rgb(var(--glow-cyan) / 0.4)',
        'glow-lg': '0 0 35px -5px rgb(var(--glow-cyan) / 0.5)',
        'glow-violet': '0 0 25px -5px rgb(var(--glow-violet) / 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgb(var(--glow-cyan) / 0.03) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--glow-cyan) / 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
