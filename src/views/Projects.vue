<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Mes Projets
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Découvrez mes réalisations organisées par catégories : du e-commerce aux jeux interactifs
        </p>
      </div>

      <!-- Filtres de navigation -->
      <div class="flex flex-wrap justify-center mb-12 gap-2">
        <button
          v-for="filter in filters"
          :key="filter.key"
          @click="activeFilter = filter.key"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-all duration-300',
            activeFilter === filter.key
              ? 'bg-primary-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ filter.label }}
          <span class="ml-2 text-sm opacity-75">({{ filter.count }})</span>
        </button>
      </div>

      <!-- Grille des projets -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          class="animate-fade-in"
        />
      </div>

      <!-- Message si aucun projet -->
      <div v-if="filteredProjects.length === 0" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          Aucun projet trouvé dans cette catégorie.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'

export default {
  name: 'Projects',
  components: {
    ProjectCard,
  },
  setup() {
    const activeFilter = ref('all')

    const ecommerceProjects = ref([
      {
        id: 1,
        title: 'TechStore - Boutique Électronique',
        description: 'Boutique e-commerce spécialisée dans les produits high-tech avec un système de comparaison de prix, wishlist partageable, et notifications de stock. Intégration complète avec les API de paiement et gestion des retours.',
        technologies: ['Vue.js', 'Nuxt.js', 'Stripe', 'Tailwind CSS', 'Pinia', 'Supabase'],
        githubUrl: 'https://github.com/mathieulancelot/techstore',
        demoUrl: 'https://techstore-demo.netlify.app',
        image: null,
        category: 'ecommerce',
        featured: true,
      },
      {
        id: 2,
        title: 'ArtisanMarket - Marketplace Local',
        description: 'Plateforme de vente en ligne dédiée aux artisans locaux avec système de géolocalisation, calendrier des événements, messagerie instantanée vendeur-client, et tableau de bord analytique pour les vendeurs.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Leaflet', 'PayPal'],
        githubUrl: 'https://github.com/mathieulancelot/artisan-market',
        demoUrl: 'https://artisan-market-demo.vercel.app',
        image: null,
        category: 'ecommerce',
        featured: true,
      },
    ])

    const seoProjects = ref([
      {
        id: 3,
        title: 'GreenLife - Site Vitrine Écologique',
        description: 'Site vitrine pour une entreprise de solutions écologiques avec un score Google PageSpeed de 98/100, optimisation SEO complète, génération automatique de sitemap, rich snippets et intégration Google Analytics 4.',
        technologies: ['Nuxt.js', 'Vue.js', 'Tailwind CSS', 'Google Analytics', 'Schema.org', 'Netlify'],
        githubUrl: 'https://github.com/mathieulancelot/greenlife-website',
        demoUrl: 'https://greenlife-eco.netlify.app',
        image: null,
        category: 'seo',
        featured: true,
      },
      {
        id: 4,
        title: 'FoodBlog - Blog Culinaire Premium',
        description: 'Blog culinaire avec plus de 500 recettes, optimisation SEO avancée pour les rich snippets de recettes, temps de cuisson structuré, commentaires, notation 5 étoiles et newsletter automatisée.',
        technologies: ['WordPress', 'PHP', 'MySQL', 'Yoast SEO', 'AMP', 'Google Search Console'],
        githubUrl: 'https://github.com/mathieulancelot/foodblog',
        demoUrl: 'https://foodblog-premium.com',
        image: null,
        category: 'seo',
        featured: true,
      },
    ])

    const frontendProjects = ref([
      {
        id: 5,
        title: 'DataViz - Dashboard Analytique',
        description: 'Dashboard interactif pour visualiser des données business avec graphiques temps réel, filtres avancés, export PDF/Excel, thème dark/light et notifications push. Interface responsive et animations fluides.',
        technologies: ['Vue.js', 'TypeScript', 'Chart.js', 'D3.js', 'Tailwind CSS', 'Vite'],
        githubUrl: 'https://github.com/mathieulancelot/dataviz-dashboard',
        demoUrl: 'https://dataviz-dashboard.netlify.app',
        image: null,
        category: 'frontend',
        featured: false,
      },
      {
        id: 6,
        title: 'PixelArt - Portfolio Créatif',
        description: 'Portfolio d\'artiste digital avec galerie interactive, effets de parallaxe, animations CSS3 avancées, lazy loading intelligent et mode plein écran. Optimisé pour les performances et l\'accessibilité.',
        technologies: ['React', 'Next.js', 'Framer Motion', 'GSAP', 'Tailwind CSS', 'Vercel'],
        githubUrl: 'https://github.com/mathieulancelot/pixelart-portfolio',
        demoUrl: 'https://pixelart-creative.vercel.app',
        image: null,
        category: 'frontend',
        featured: false,
      },
    ])

    const gameProjects = ref([
      {
        id: 7,
        title: 'MindPuzzle - Jeu de Réflexion',
        description: 'Jeu de puzzle avec 50 niveaux progressifs, système de hints, sauvegarde automatique, effets sonores immersifs, mode défi contre la montre et leaderboard local. Interface tactile optimisée.',
        technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web Audio API', 'LocalStorage'],
        githubUrl: 'https://github.com/mathieulancelot/mindpuzzle',
        demoUrl: 'https://mindpuzzle-game.netlify.app',
        image: null,
        category: 'game',
        featured: false,
      },
      {
        id: 8,
        title: 'QuizMaster - Quiz Interactif',
        description: 'Application de quiz multithématique avec plus de 1000 questions, système de catégories, mode multijoueur local, statistiques détaillées, achievement system et partage des scores sur réseaux sociaux.',
        technologies: ['Vue.js', 'Pinia', 'Tailwind CSS', 'Anime.js', 'PWA', 'LocalStorage'],
        githubUrl: 'https://github.com/mathieulancelot/quizmaster',
        demoUrl: 'https://quizmaster-app.netlify.app',
        image: null,
        category: 'game',
        featured: false,
      },
    ])

    // Calculer tous les projets
    const allProjects = computed(() => [
      ...ecommerceProjects.value,
      ...seoProjects.value,
      ...frontendProjects.value,
      ...gameProjects.value,
    ])

    // Filtres disponibles
    const filters = computed(() => [
      { key: 'all', label: 'Tous', count: allProjects.value.length },
      { key: 'ecommerce', label: 'E-commerce', count: ecommerceProjects.value.length },
      { key: 'seo', label: 'SEO & Marketing', count: seoProjects.value.length },
      { key: 'frontend', label: 'Front-end', count: frontendProjects.value.length },
      { key: 'game', label: 'Jeux & Interactif', count: gameProjects.value.length },
    ])

    // Projets filtrés
    const filteredProjects = computed(() => {
      if (activeFilter.value === 'all') {
        return allProjects.value
      }
      return allProjects.value.filter(project => project.category === activeFilter.value)
    })

    return {
      activeFilter,
      filters,
      filteredProjects,
      ecommerceProjects,
      seoProjects,
      frontendProjects,
      gameProjects,
    }
  },
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 