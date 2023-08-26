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
        "other-yellow": "#FEEB97",
      },
      fontFamily: {
        caudex: ["Caudex", "serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      screens: {
        // mobile: "375px",
        // sm: { min: "375px", max: "767px" },
        // => @media (min-width: 640px and max-width: 767px) { ... }
        // tablet: "820px",
        // md: { min: "820px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }
        // laptop: "1366",
        // lg: { min: "1366px", max: "1535px" },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
        // xl: { min: "1280px", max: "1535px" },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }
        // destok: "1920",
        // "2xl": { min: "1536px" },
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
};
