import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5173;

// Configuration des types MIME pour Express
const mimeTypes = {
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.jsx': 'application/javascript',
  '.ts': 'application/javascript',
  '.tsx': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.html': 'text/html'
};

// Servir les fichiers statiques avec configuration MIME explicite
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext];
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
    }
    // Ajouter des en-têtes de cache pour les assets
    if (filePath.includes('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

// Gérer toutes les routes SPA - utiliser un middleware catch-all
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${port}`);
  console.log(`Application accessible sur http://0.0.0.0:${port}`);
});
