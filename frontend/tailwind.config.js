import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
};
