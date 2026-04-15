/** @type {import('tailwindcss').Config} */ // typeScript JSDoc (auto-completion)
export default {
  content: [ // dossier où tailwind cherche les classes 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // dans tous les fichiers qi ont comme extension ça
  ],
  theme: {
    extend: {}, // pour ajouter cxes trucs personnalisés 
  },
  plugins: [],
}