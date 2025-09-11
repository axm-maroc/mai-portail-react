# Guide Technique - Portail Intermédiaires React

## 🏗️ Architecture Technique Détaillée

### Structure des Composants

#### 1. Composants d'Authentification (`src/components/auth/`)
```javascript
LoginPage.jsx - Page de connexion avec validation
├── Formulaire de connexion
├── Validation des champs
├── Gestion des erreurs
└── Redirection après connexion
```

#### 2. Layout et Navigation (`src/components/layout/`)
```javascript
AppLayout.jsx - Layout principal de l'application
├── Header avec recherche globale
├── Sidebar avec navigation
├── Zone de contenu principal
└── Gestion responsive

AppSidebar.jsx - Barre latérale de navigation
├── Menu principal avec icônes
├── Sous-menus déroulants
├── État actif/inactif
└── Animation de collapse

AppHeader.jsx - En-tête de l'application
├── Logo et titre
├── Barre de recherche globale
├── Profil utilisateur
└── Notifications
```

#### 3. Pages Principales (`src/components/pages/`)

##### Dashboard.jsx - Tableau de bord avancé
```javascript
Fonctionnalités:
├── Métriques animées avec compteurs progressifs
├── Graphiques interactifs (Area, Bar, Pie)
├── Activité récente en temps réel
├── Actions rapides avec navigation
├── Filtres de période (Mois, Trimestre, Année)
└── Barres de progression pour les objectifs

Composants internes:
├── EnhancedMetricCard - Cartes de métriques avec animations
├── RecentActivityCard - Activité récente
├── CustomTooltip - Tooltips personnalisés pour graphiques
└── Animations Framer Motion pour toutes les interactions
```

##### Souscriptions.jsx - Gestion avancée des souscriptions
```javascript
Fonctionnalités:
├── Tableau avec tri, filtrage et pagination
├── Filtres avancés avec recherche multi-critères
├── Statistiques en temps réel par statut
├── Actions contextuelles (Voir, Modifier, Supprimer)
├── Export des données
└── Animations pour les interactions

Composants internes:
├── AdvancedFilters - Panneau de filtres avancés
├── SouscriptionRow - Ligne de tableau avec animations
├── Pagination - Navigation entre les pages
└── StatusBadge - Badges de statut avec icônes
```

### 4. Contextes React (`src/contexts/`)

#### AuthContext.jsx - Gestion de l'authentification
```javascript
État géré:
├── user - Informations utilisateur
├── isAuthenticated - État de connexion
├── isLoading - État de chargement
└── error - Erreurs d'authentification

Actions:
├── login(email, password) - Connexion
├── logout() - Déconnexion
├── checkAuth() - Vérification du token
└── updateProfile(data) - Mise à jour profil
```

#### NotificationContext.jsx - Système de notifications
```javascript
État géré:
├── notifications - Liste des notifications
├── unreadCount - Nombre non lues
└── settings - Préférences notifications

Actions:
├── addNotification(type, message) - Ajouter
├── removeNotification(id) - Supprimer
├── markAsRead(id) - Marquer comme lue
└── clearAll() - Vider toutes
```

## 🎨 Système de Design

### Palette de Couleurs
```css
:root {
  /* Couleurs principales */
  --primary: 220 90% 56%;        /* Bleu MAI */
  --secondary: 160 60% 45%;      /* Vert secondaire */
  --accent: 38 92% 50%;          /* Orange accent */
  
  /* États */
  --success: 142 76% 36%;        /* Vert succès */
  --warning: 38 92% 50%;         /* Orange warning */
  --error: 0 84% 60%;            /* Rouge erreur */
  --info: 199 89% 48%;           /* Bleu info */
  
  /* Neutres */
  --background: 0 0% 100%;       /* Blanc */
  --foreground: 222.2 84% 4.9%;  /* Noir */
  --muted: 210 40% 96%;          /* Gris clair */
  --border: 214.3 31.8% 91.4%;   /* Bordures */
}
```

### Composants UI Réutilisables

#### Boutons
```javascript
// Variantes disponibles
<Button variant="default">Défaut</Button>
<Button variant="destructive">Destructeur</Button>
<Button variant="outline">Contour</Button>
<Button variant="secondary">Secondaire</Button>
<Button variant="ghost">Fantôme</Button>
<Button variant="link">Lien</Button>

// Tailles
<Button size="sm">Petit</Button>
<Button size="default">Normal</Button>
<Button size="lg">Grand</Button>
```

#### Cartes
```javascript
<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu de la carte
  </CardContent>
</Card>
```

## 🔄 Gestion d'État

### Architecture de l'État
```
Application State
├── AuthContext (Global)
│   ├── User session
│   ├── Authentication status
│   └── User preferences
├── NotificationContext (Global)
│   ├── Toast notifications
│   ├── System alerts
│   └── User notifications
└── Component State (Local)
    ├── Form data
    ├── UI state (loading, errors)
    └── Temporary data
```

### Patterns Utilisés
- **Context + useReducer** pour l'état global complexe
- **useState** pour l'état local simple
- **useEffect** pour les effets de bord
- **Custom hooks** pour la logique réutilisable

## 🎭 Animations et Transitions

### Framer Motion - Configuration
```javascript
// Animations d'entrée standard
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

// Animations de survol
const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}

// Animations de liste
const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

### Types d'Animations Implémentées
- **Page transitions** - Transitions entre pages
- **Component mounting** - Apparition des composants
- **Hover effects** - Effets de survol
- **Loading states** - États de chargement
- **Micro-interactions** - Feedback utilisateur

## 📊 Graphiques et Visualisations

### Recharts - Configuration
```javascript
// Graphique en aires
<AreaChart data={data}>
  <defs>
    <linearGradient id="colorCA">
      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <Area
    type="monotone"
    dataKey="ca"
    stroke="#3b82f6"
    fill="url(#colorCA)"
  />
</AreaChart>

// Graphique en barres
<BarChart data={data}>
  <Bar
    dataKey="souscriptions"
    fill="#10b981"
    radius={[4, 4, 0, 0]}
  />
</BarChart>

// Graphique circulaire
<PieChart>
  <Pie
    data={data}
    innerRadius={60}
    outerRadius={80}
    paddingAngle={5}
    dataKey="value"
  />
</PieChart>
```

## 🔍 Recherche et Filtrage

### Système de Recherche Multi-Critères
```javascript
const searchLogic = {
  // Recherche textuelle
  textSearch: (items, term) => {
    return items.filter(item => 
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(term.toLowerCase())
      )
    )
  },
  
  // Filtres par catégorie
  categoryFilter: (items, filters) => {
    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === 'all') return true
        return item[key] === value
      })
    })
  },
  
  // Tri dynamique
  dynamicSort: (items, field, direction) => {
    return items.sort((a, b) => {
      const aValue = a[field]
      const bValue = b[field]
      const multiplier = direction === 'asc' ? 1 : -1
      
      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier
      }
      return (aValue - bValue) * multiplier
    })
  }
}
```

## 🚀 Optimisations Performance

### Techniques Implémentées
1. **Lazy Loading** - Chargement différé des composants
2. **Memoization** - React.memo pour éviter les re-renders
3. **Virtual Scrolling** - Pour les grandes listes (préparé)
4. **Code Splitting** - Division du bundle par routes
5. **Image Optimization** - Formats modernes et lazy loading

### Bundle Analysis
```bash
# Analyser la taille du bundle
npm run build
npm run analyze
```

## 🔒 Sécurité

### Mesures Implémentées
- **Validation côté client** avec React Hook Form
- **Sanitization** des entrées utilisateur
- **Protection CSRF** avec tokens
- **Gestion sécurisée** des tokens JWT
- **Validation des permissions** par route

## 🧪 Tests (Préparé)

### Structure de Tests
```
tests/
├── __mocks__/          # Mocks pour les tests
├── components/         # Tests des composants
├── contexts/           # Tests des contextes
├── hooks/              # Tests des hooks
├── pages/              # Tests des pages
└── utils/              # Tests des utilitaires
```

### Outils de Test
- **Vitest** - Framework de test rapide
- **React Testing Library** - Tests des composants
- **MSW** - Mock Service Worker pour les API
- **Playwright** - Tests end-to-end

## 📦 Build et Déploiement

### Configuration Vite
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts']
        }
      }
    }
  }
})
```

### Optimisations Build
- **Tree shaking** automatique
- **Minification** avec Terser
- **Compression gzip** activée
- **Cache busting** avec hash des fichiers

## 🔧 Maintenance et Évolution

### Bonnes Pratiques
1. **Code modulaire** - Composants réutilisables
2. **Documentation** - JSDoc pour les fonctions complexes
3. **Conventions** - Nommage cohérent
4. **Git workflow** - Branches feature et pull requests
5. **Monitoring** - Logs et métriques de performance

### Roadmap Technique
- [ ] Migration vers TypeScript
- [ ] Implémentation PWA
- [ ] Tests automatisés complets
- [ ] Monitoring en temps réel
- [ ] Optimisations SEO
- [ ] Accessibilité WCAG 2.1

---

Ce guide technique fournit une base solide pour maintenir et faire évoluer l'application React du portail intermédiaires.
