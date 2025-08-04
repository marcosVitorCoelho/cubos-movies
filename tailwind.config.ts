import { mauve, purple, mauveDark, purpleDark } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mauve,
        purple,
        mauveDark,
        purpleDark,
      },
    },
  },
  plugins: [],
};
