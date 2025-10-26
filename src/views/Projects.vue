<template>
  <div class="min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête spatial -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-display font-bold text-white mb-4">
          Mes <span class="text-gradient-space">Projets</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Découvrez mes réalisations organisées par catégories : du e-commerce aux jeux interactifs
        </p>
      </div>

      <!-- Filtres de navigation style spatial -->
      <div class="flex flex-wrap justify-center mb-12 gap-3">
        <button
          v-for="filter in filters"
          :key="filter.key"
          @click="activeFilter = filter.key"
          :class="[
            'px-6 py-3 rounded-full font-semibold transition-all duration-300',
            activeFilter === filter.key
              ? 'bg-gradient-to-r from-space-purple to-space-magenta text-white shadow-lg scale-105 glow-magenta'
              : 'bg-space-navy/50 text-space-cyan border border-space-cyan/30 hover:border-space-magenta hover:text-space-magenta hover:scale-105'
          ]"
        >
          {{ filter.label }}
          <span class="ml-2 text-xs opacity-75">({{ filter.count }})</span>
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
        <p class="text-gray-300 text-lg">
          Aucun projet trouvé dans cette catégorie.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import NailsAccueil from '@/assets/nails/ImageAccueil.png'
import NailsGalerie from '@/assets/nails/nail_galerie.png'
import NailsTarif from '@/assets/nails/nail_tarif.png'
import VetementAccueil from '@/assets/vetement/accueil.png'
import VetementCollection from '@/assets/vetement/collection.png'
import VetementContact from '@/assets/vetement/contactez-nous.png'

export default {
  name: 'Projects',
  components: {
    ProjectCard,
  },
  setup() {
    const activeFilter = ref('all')

    // Projets réels réalisés
    const realProjects = ref([
      {
        id: 1,
        title: 'Site Salon de Manucure',
        description: 'Site web élégant pour un salon de manucure avec système de réservation en ligne, galerie photo des réalisations et présentation des services. Interface moderne et responsive avec animations fluides.',
        technologies: ['Vue.js', 'CSS3', 'JavaScript', 'Responsive Design'],
        demoUrl: 'https://salon-manucure-demo.netlify.app',
        images: [
          { src: NailsAccueil, alt: 'Page d\'accueil du salon de manucure' },
          { src: NailsGalerie, alt: 'Galerie des réalisations nail art' },
          { src: NailsTarif, alt: 'Page des tarifs et services' }
        ],
        video: null,
        image: null,
        category: 'frontend',
        featured: true,
      },
      {
        id: 2,
        title: 'Site vitrine de boutique de Vêtements',
        description: 'Boutique en ligne moderne pour une marque de vêtements avec catalogue produits, panier d\'achat et système de paiement sécurisé. Design épuré et expérience utilisateur optimisée.',
        technologies: ['Vue.js', 'Tailwind CSS', 'Stripe API', 'Node.js'],
        demoUrl: 'https://boutique-vetements-demo.netlify.app',
        images: [
          { src: VetementAccueil, alt: 'Page d\'accueil de la boutique de vêtements' },
          { src: VetementCollection, alt: 'Page collection des vêtements' },
          { src: VetementContact, alt: 'Page de contact de la boutique' }
        ],
        video: null,
        image: null,
        category: 'ecommerce',
        featured: true,
      },
    ])

    // Calculer tous les projets
    const allProjects = computed(() => realProjects.value)

    // Filtres disponibles basés sur les projets réels
    const filters = computed(() => {
      const ecommerceCount = realProjects.value.filter(p => p.category === 'ecommerce').length
      const frontendCount = realProjects.value.filter(p => p.category === 'frontend').length
      
      return [
        { key: 'all', label: 'Tous', count: realProjects.value.length },
        { key: 'ecommerce', label: 'E-commerce', count: ecommerceCount },
        { key: 'frontend', label: 'Front-end', count: frontendCount },
      ]
    })

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
      realProjects,
    }
  },
}
</script>

<style scoped>
/* Animation des cartes */
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