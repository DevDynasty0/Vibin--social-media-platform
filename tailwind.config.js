/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-one": "#22577a",
        //  " color-two": "#color code",
        // "  color-three": "color code",
      },
    },
  },
  plugins: [],
};
