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

// Middleware pour définir les types MIME
app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  const mimeType = mimeTypes[ext];
  if (mimeType && req.path.includes('.')) {
    res.setHeader('Content-Type', mimeType);
  }
  next();
});

// Servir les fichiers statiques du build
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all handler: send back React's index.html file for any non-file requests
app.use((req, res, next) => {
  // Si c'est une requête pour un fichier qui n'existe pas, laisser passer à express.static
  if (req.path.includes('.')) {
    return next();
  }
  
  // Sinon, servir index.html pour React Router
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur le port ${port}`);
  console.log(`🌐 Application accessible sur http://0.0.0.0:${port}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'dist')}`);
});