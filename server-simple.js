import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5173;

// Servir les fichiers statiques du build
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware pour gérer toutes les routes SPA
app.use((req, res, next) => {
  // Si c'est une requête pour un fichier statique, laisser passer
  if (req.path.includes('.')) {
    return next();
  }
  
  // Sinon, servir index.html pour React Router
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${port}`);
  console.log(`Application accessible sur http://0.0.0.0:${port}`);
});
