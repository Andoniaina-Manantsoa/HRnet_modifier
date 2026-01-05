// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",                  // toutes les sources de ton projet
        "./node_modules/@andoniaina/react-modal/**/*.{js,jsx}" // inclut les classes Tailwind de ton package Modal
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
