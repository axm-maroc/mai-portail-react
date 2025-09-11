# Portail Intermédiaires React - MAI Assurance

## 🚀 Vue d'ensemble

Ce projet est une conversion moderne du portail intermédiaires MAI Assurance, migré de MVC5 vers React avec des améliorations significatives de l'interface utilisateur et de l'expérience utilisateur.

## ✨ Fonctionnalités Principales

### 🎯 Tableau de Bord Interactif
- **Métriques animées** avec compteurs progressifs
- **Graphiques interactifs** (Recharts) avec tooltips personnalisés
- **Cartes de métriques** avec effets de survol et animations
- **Activité récente** en temps réel
- **Actions rapides** pour un accès direct aux fonctionnalités

### 📊 Gestion des Souscriptions
- **Tableau avancé** avec tri, filtrage et pagination
- **Filtres avancés** avec recherche multi-critères
- **Statistiques en temps réel** par statut
- **Actions contextuelles** avec menus déroulants
- **Animations fluides** pour les interactions

### 🎨 Améliorations UI/UX Modernes
- **Design System** cohérent avec shadcn/ui
- **Animations** avec Framer Motion
- **Thème sombre/clair** (préparé)
- **Responsive design** pour tous les écrans
- **Micro-interactions** pour une meilleure expérience

## 🛠️ Technologies Utilisées

### Frontend
- **React 19** - Framework JavaScript moderne
- **Vite** - Build tool ultra-rapide
- **TypeScript** - Typage statique (préparé)
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI modernes
- **Framer Motion** - Animations fluides
- **Recharts** - Graphiques interactifs
- **Lucide React** - Icônes modernes

### Outils de Développement
- **ESLint** - Linting du code
- **Prettier** - Formatage du code
- **React Router** - Navigation SPA
- **React Hook Form** - Gestion des formulaires (préparé)

## 🏗️ Architecture

```
src/
├── components/
│   ├── auth/           # Composants d'authentification
│   ├── layout/         # Layout et navigation
│   ├── pages/          # Pages principales
│   ├── ui/             # Composants UI réutilisables
│   └── charts/         # Composants de graphiques
├── contexts/           # Contextes React (Auth, Notifications)
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires et configuration
└── assets/             # Assets statiques
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou pnpm

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd portail-intermediaires-react

# Installer les dépendances
npm install
# ou
pnpm install

# Démarrer le serveur de développement
npm run dev
# ou
pnpm dev
```

### Scripts Disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Linting du code
```

## 🎨 Améliorations par rapport au MVC5

### Interface Utilisateur
- ✅ **Design moderne** avec composants Material Design
- ✅ **Animations fluides** pour toutes les interactions
- ✅ **Responsive design** adaptatif
- ✅ **Thème cohérent** avec variables CSS
- ✅ **Micro-interactions** pour le feedback utilisateur

### Expérience Utilisateur
- ✅ **Navigation intuitive** avec sidebar collapsible
- ✅ **Recherche avancée** multi-critères
- ✅ **Filtres dynamiques** avec état persistant
- ✅ **Pagination intelligente** avec navigation rapide
- ✅ **Actions contextuelles** avec menus déroulants

### Performance
- ✅ **Chargement rapide** avec Vite et optimisations
- ✅ **Lazy loading** des composants
- ✅ **Mise en cache** des données
- ✅ **Bundle optimisé** pour la production

### Fonctionnalités Techniques
- ✅ **SPA** (Single Page Application) pour une navigation fluide
- ✅ **État global** avec Context API
- ✅ **Gestion d'erreurs** centralisée
- ✅ **Notifications** toast intégrées
- ✅ **Authentification** avec gestion des sessions

## 📱 Pages Disponibles

### ✅ Implémentées
- **Connexion** - Authentification utilisateur
- **Tableau de bord** - Vue d'ensemble avec métriques et graphiques
- **Souscriptions** - Gestion complète avec filtres avancés

### 🚧 En Développement
- **Conventions** - Gestion des protocoles groupes
- **Facturation** - Gestion des factures et règlements
- **Attestations** - Demandes d'attestation
- **Restitutions** - Demandes de restitution
- **État CP** - Consultation des comptes

## 🔧 Configuration

### Variables d'Environnement
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Portail Intermédiaires
VITE_APP_VERSION=1.0.0
```

### Personnalisation du Thème
Le thème peut être personnalisé dans `src/lib/utils.js` et les variables CSS dans `src/index.css`.

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Déploiement avec Manus
```bash
# Le projet peut être déployé directement avec Manus Deploy
# Les fichiers de build seront dans le dossier dist/
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support technique :
- Email: support@mai-assurance.com
- Documentation: [lien vers la doc]
- Issues: [lien vers les issues GitHub]

---

**Développé avec ❤️ par l'équipe MAI Assurance**
