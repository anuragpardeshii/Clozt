/** @type {import('tailwindcss').Config} */
export default {
  content: ["./node_modules/flowbite/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx,html}", // Include all your source files
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};