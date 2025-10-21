# Portfolio - Développeur Web Freelance

Un portfolio moderne et responsive développé avec **Vue.js 3**, **Vite**, et **Tailwind CSS**. Ce projet présente mes compétences en développement web, mes projets réalisés et mon expérience professionnelle.

## 🚀 Caractéristiques

- **Vue.js 3** avec Composition API
- **Vite** pour un build rapide et optimisé
- **Tailwind CSS** pour un design moderne et responsive
- **Vue Router** pour la navigation SPA
- **Pinia** pour la gestion d'état globale
- **Mode sombre** avec persistance locale
- **SEO optimisé** avec meta tags et structured data
- **Google Analytics** intégré
- **PWA ready** avec Vite PWA Plugin
- **TypeScript ready** (actuellement en JavaScript)

## 🛠️ Technologies Utilisées

### Frontend
- Vue.js 3
- JavaScript ES6+
- Tailwind CSS
- Vue Router
- Pinia

### Outils de Développement
- Vite
- ESLint
- Prettier
- PostCSS
- Autoprefixer

### SEO & Analytics
- Meta tags optimisées
- Structured data (JSON-LD)
- Sitemap XML
- Google Analytics
- Open Graph et Twitter Cards

## 📁 Structure du Projet

```
portfolio/
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── ProjectCard.vue
│   │   └── SkillBadge.vue
│   ├── views/
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   ├── Skills.vue
│   │   ├── Projects.vue
│   │   └── Contact.vue
│   ├── stores/
│   │   └── theme.js
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Installation et Utilisation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/votre-username/portfolio.git

# Aller dans le dossier
cd portfolio

# Installer les dépendances
npm install
```

### Développement
```bash
# Lancer le serveur de développement
npm run dev

# Le site sera accessible sur http://localhost:3000
```

### Build de Production
```bash
# Créer le build de production
npm run build

# Prévisualiser le build
npm run preview
```

### Linting et Formatage
```bash
# Linter le code
npm run lint

# Formater le code
npm run format
```

## 🎨 Personnalisation

### Couleurs et Thème
Les couleurs sont configurées dans `tailwind.config.js`. Vous pouvez modifier :
- Les couleurs primaires et secondaires
- Les breakpoints responsive
- Les animations personnalisées

### Contenu
1. **Informations personnelles** : Modifiez `src/views/About.vue`
2. **Projets** : Ajoutez vos projets dans `src/views/Projects.vue`
3. **Compétences** : Personnalisez `src/views/Skills.vue`
4. **Contact** : Configurez `src/views/Contact.vue`

### SEO
1. **Meta tags** : Modifiez `index.html`
2. **Structured data** : Personnalisez le JSON-LD dans `index.html`
3. **Sitemap** : Mettez à jour `public/sitemap.xml`

### Analytics
1. Remplacez `GA_TRACKING_ID` dans `src/main.js`
2. Configurez votre compte Google Analytics

## 🌟 Fonctionnalités Principales

### Pages
- **Accueil** : Présentation avec hero section et projets vedettes
- **Compétences** : Technologies et outils maîtrisés
- **Projets** : Portfolio avec filtres par catégorie
- **À propos** : Parcours professionnel et formation
- **Contact** : Formulaire de contact et coordonnées

### Composants Réutilisables
- **ProjectCard** : Carte de projet avec technologies et liens
- **SkillBadge** : Badge de compétence avec icônes
- **AppHeader** : Navigation responsive avec thème
- **AppFooter** : Footer avec liens et informations

### Fonctionnalités Avancées
- Navigation smooth scroll
- Animations CSS personnalisées
- Responsive design mobile-first
- Optimisation des performances
- Accessibilité WCAG

## 📱 Responsive Design

Le portfolio est entièrement responsive et optimisé pour :
- Mobile (320px+)
- Tablette (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔍 SEO et Performance

### SEO
- ✅ Meta tags optimisées
- ✅ Structured data (JSON-LD)
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ Open Graph et Twitter Cards
- ✅ Balises sémantiques HTML5

### Performance
- ✅ Code splitting automatique
- ✅ Lazy loading des images
- ✅ Optimisation des fonts
- ✅ Compression des assets
- ✅ Service Worker (PWA)

## 📊 Analytics et Suivi

Le portfolio intègre :
- Google Analytics 4
- Suivi des conversions
- Événements personnalisés
- Métriques Core Web Vitals

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre feature
3. Commiter vos changements
4. Pusher vers la branche
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Développeur

**Portfolio** - Développeur Web Freelance
- 📧 Email : mateolp.developer@gmail.com
- 💼 LinkedIn : [linkedin.com/in/example](https://linkedin.com/in/example)
- 🐙 GitHub : [github.com/example](https://github.com/example)

---

*Développé avec ❤️ en Vue.js*
