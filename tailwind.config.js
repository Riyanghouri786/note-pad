/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths based on your project structure
    "./pages/**/*.{html,js,jsx,ts,tsx}", // For Next.js projects
    "./components/**/*.{html,js,jsx,ts,tsx}", // For component files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {},
};
