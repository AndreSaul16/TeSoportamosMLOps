/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          dark: "#0f172a",
          light: "#f8fafc",
          accent: "#6366f1", // Indigo
          secondary: "#ec4899", // Pink
          glass: "rgba(255, 255, 255, 0.1)",
          glassDark: "rgba(15, 23, 42, 0.6)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/pattern.svg')", // Placeholder
      }
    },
  },
  plugins: [],
}
