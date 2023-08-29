/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-black": "#222222",
        "primary-gray": "#DDDDDD",
        "dark-green": "#034561",
        "primary-green": "#4FB783",
        "lightest-green": "#EBFFF5",
        "other-red": "#DC143C",
        "other-blue": "#3E68FF",
        "other-yellow": "#d8be48",
      },
      fontFamily: {
        caudex: ["Caudex", "serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
