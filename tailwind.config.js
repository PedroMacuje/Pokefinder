import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      keyframes:{
        fadeUp:{
          "0%":{
            opacity: "0",
            transform: "translateY(20px) scale (0.95)",
          },
          "100%":{
            opacity: "1",
            transform: "translateY(0) scale(1)"
          }
        }
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwads"
      }
    }
  },
  plugins: [],
};

