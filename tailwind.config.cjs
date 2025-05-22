/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); // Import defaultTheme

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        // Set Montserrat as the primary sans-serif font
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        // Your existing custom fonts
        cairo: ['Cairo', ...defaultTheme.fontFamily.sans], // Optionally, ensure these also fallback to the full sans stack
        'noto-sans-sc': ['"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
