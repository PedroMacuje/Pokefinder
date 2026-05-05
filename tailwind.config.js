import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        scaleIn: {
          "0%": { 
            opacity: "0", 
            transform: "scale(0.9)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "scale(1)" 
          }
        },
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.2s ease-out",
        "scale-in": "scaleIn 0.25s ease-out"
      },
    },
  },
  plugins: [],
};