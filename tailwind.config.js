/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        radical: {
          walking: '#ef4444',    // 辶 red
          great: '#3b82f6',      // 大 blue
          mouth: '#10b981',      // 口 green
          woman: '#ec4899',      // 女 pink
          water: '#06b6d4',      // 水 cyan
          heart: '#f59e0b',      // 心 amber
          speech: '#8b5cf6',     // 言 purple
          hand: '#14b8a6',       // 手 teal
        }
      }
    },
  },
  plugins: [],
}
