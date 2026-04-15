import { defineConfig } from 'vite' // création de la configue
import react from '@vitejs/plugin-react' // plugin de React

export default defineConfig({ // on va exporter la configuration 
  plugins: [react()], // activation de flagin react
})
