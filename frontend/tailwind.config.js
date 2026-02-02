/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        glow: {
          cyan: '#22d3ee',
          violet: '#a78bfa',
          blue: '#3b82f6',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(34, 211, 238, 0.3)',
        'glow-md': '0 0 25px -5px rgba(34, 211, 238, 0.4)',
        'glow-lg': '0 0 35px -5px rgba(34, 211, 238, 0.5)',
        'glow-violet': '0 0 25px -5px rgba(167, 139, 250, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
