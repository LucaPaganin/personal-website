/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // Blue
          dark: '#4f8bf7',
        },
        secondary: {
          DEFAULT: '#8b5cf6', // Dark pink/purple
          dark: '#9d71f7',
        },
        accent: {
          DEFAULT: '#f59e0b', // Orange/amber
          dark: '#f7a93b',
        },
      },
    },
  },  plugins: [],
}
