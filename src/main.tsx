// Importation de React (obligatoire pour le JSX)
import React from 'react';

// Importation de ReactDOM pour afficher l'application
import ReactDOM from 'react-dom/client';

// Importation du composant principal
import App from './App';

// Importation des styles Tailwind
import './index.css';

// Crée la racine React dans la div "root" du fichier index.html
const racine = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Affiche l'application dans le navigateur
racine.render(
  <React.StrictMode>  {/* Mode strict : détecte les erreurs potentielles */}
    <App />
  </React.StrictMode>
);