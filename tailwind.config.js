/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Token palette (to be refined from TERMY Brandbook v1.0 during UX iteration)
        brand: {
          primary: '#0F3B7A',   // TERMY deep blue (placeholder)
          accent: '#35C2C6',    // SHOCK-accent cyan (placeholder)
          warn: '#E8A64B',      // warm warn
          danger: '#D74A4A',
          ok: '#49A867',
          muted: '#6B7280',
          bg: '#F7F8FA',
          surface: '#FFFFFF',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
