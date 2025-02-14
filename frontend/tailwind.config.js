/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Correct way to include Flowbite plugin
  ],
};
