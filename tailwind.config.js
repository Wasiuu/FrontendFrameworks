/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Pliki w folderze `app`
    "./components/**/*.{js,ts,jsx,tsx}", // Pliki w folderze `components`
    "./pages/**/*.{js,ts,jsx,tsx}", // Pliki w folderze `pages` (jeśli go używasz)
    "./src/**/*.{js,ts,jsx,tsx}", // Pliki w folderze `src` (jeśli go używasz)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
