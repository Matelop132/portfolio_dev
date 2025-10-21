<template>
  <div>
    <!-- Section Hero -->
    <section class="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Contenu texte -->
          <div class="text-center lg:text-left">
            <!-- Badge de qualification avec animations spectaculaires -->
            <div class="flex justify-center lg:justify-start mb-8 animate-slide-up">
              <div class="relative">
                <!-- Arrière-plan animé avec particules -->
                <div class="absolute inset-0 w-full h-full">
                  <!-- Particules flottantes -->
                  <div class="floating-particles">
                    <div class="particle particle-1"></div>
                    <div class="particle particle-2"></div>
                    <div class="particle particle-3"></div>
                    <div class="particle particle-4"></div>
                    <div class="particle particle-5"></div>
                    <div class="particle particle-6"></div>
                  </div>
                  
                  <!-- Orbites autour du badge -->
                  <div class="orbital-container">
                    <div class="orbit orbit-1">
                      <div class="orbit-particle"></div>
                    </div>
                    <div class="orbit orbit-2">
                      <div class="orbit-particle"></div>
                    </div>
                    <div class="orbit orbit-3">
                      <div class="orbit-particle"></div>
                    </div>
                  </div>
                  
                  <!-- Ondulations d'arrière-plan -->
                  <div class="wave-background">
                    <div class="wave wave-1"></div>
                    <div class="wave wave-2"></div>
                    <div class="wave wave-3"></div>
                  </div>
                </div>
                
                <!-- Conteneur d'expansion du badge -->
                <div class="badge-expand">
                  <!-- Badge principal avec effets -->
                  <div class="relative z-10 px-8 py-4 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-500 badge-glow badge-pulse">
                  
                  <!-- Effet shimmer -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/30 to-transparent dark:via-primary-400/20 -translate-x-full shimmer-effect rounded-2xl"></div>
                  
                  <!-- Contenu du badge -->
                  <div class="flex items-center gap-4 relative z-10">
                    <!-- Icône avec animation -->
                    <div class="flex-shrink-0 p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl icon-bounce shadow-lg">
                      <span class="text-xl font-bold text-white icon-rotate">🎓</span>
                    </div>
                    
                    <!-- Texte principal avec effet typing -->
                    <div class="flex-1">
                      <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight typing-text">
                        Ingénieur et licencié RNCP
                      </h3>
                      <p class="text-sm font-medium text-primary-600 dark:text-primary-400 leading-tight typing-text-delay">
                        en développement de site web
                      </p>
                    </div>
                    
                    <!-- Indicateur de qualité -->
                    <div class="flex-shrink-0">
                      <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full quality-pulse shadow-lg"></div>
                    </div>
                  </div>
                  
                  <!-- Étoiles flottantes autour du badge -->
                  <div class="floating-stars">
                    <div class="star star-1">✨</div>
                    <div class="star star-2">⭐</div>
                    <div class="star star-3">💫</div>
                    <div class="star star-4">✨</div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Développeur Web
              <span class="text-primary-600 dark:text-primary-400">Freelance</span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up">
              Passionné par le développement web moderne avec <strong>3 ans d'expérience en entreprise</strong>
              et un <strong>Master en développement web</strong>. Je transforme vos idées en applications web performantes.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up">
              <router-link
                to="/projets"
                class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Voir mes projets
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
              <router-link
                to="/contact"
                class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Me contacter
              </router-link>
            </div>
          </div>

          <!-- Photo professionnelle -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <!-- Cercle de fond avec gradient -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full transform rotate-3 scale-105 opacity-20"></div>
              
              <!-- Photo principale -->
              <div class="relative">
                <img
                  src="@/assets/Photopro.png"
                  alt="Développeur Web Freelance"
                  class="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
                />
                
                <!-- Badge de statut -->
                <div class="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Disponible
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section Projets récents -->
    <section class="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Mes Projets <span class="text-primary-600 dark:text-primary-400">Récents</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez quelques-unes de mes réalisations les plus récentes, alliant innovation technique et design moderne
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.id"
            :project="project"
            :show-links="false"
            class="max-w-xl mx-auto lg:max-w-none"
          />
        </div>
        
        <div class="text-center mt-16">
          <router-link
            to="/projets"
            class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-500 overflow-hidden hover:-translate-y-1"
          >
            <!-- Effet shimmer -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span class="relative z-10 mr-3">Découvrir tous mes projets</span>
            <svg class="relative z-10 w-6 h-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Section CTA -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="glass rounded-2xl p-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Prêt à collaborer ?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Discutons de votre projet et transformons vos idées en réalité
          </p>
          <router-link
            to="/contact"
            class="gradient-animated inline-flex items-center px-8 py-3 text-white rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
          >
            Commencer le projet
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SkillBadge from '@/components/SkillBadge.vue'
import NailsAccueil from '@/assets/nails/ImageAccueil.png'
import NailsGalerie from '@/assets/nails/nail_galerie.png'
import NailsTarif from '@/assets/nails/nail_tarif.png'
import VetementAccueil from '@/assets/vetement/accueil.png'
import VetementCollection from '@/assets/vetement/collection.png'
import VetementContact from '@/assets/vetement/contactez-nous.png'

export default {
  name: 'Home',
  components: {
    ProjectCard,
    SkillBadge,
  },
  setup() {
    const featuredProjects = ref([
      {
        id: 1,
        title: 'Site Salon de Manucure',
        description: 'Site web élégant pour un salon de manucure avec système de réservation en ligne, galerie photo des réalisations et présentation des services.',
        technologies: ['Vue.js', 'CSS3', 'JavaScript', 'Responsive Design'],
        demoUrl: 'https://salon-manucure-demo.netlify.app',
        images: [
          { src: NailsAccueil, alt: 'Page d\'accueil du salon de manucure' },
          { src: NailsGalerie, alt: 'Galerie des réalisations nail art' },
          { src: NailsTarif, alt: 'Page des tarifs et services' }
        ],
        video: null,
        image: null,
      },
      {
        id: 2,
        title: 'Site vitrine de boutique de  Vêtements',
        description: 'Boutique en ligne moderne pour une marque de vêtements avec catalogue produits, panier d\'achat et système de paiement sécurisé.',
        technologies: ['Vue.js', 'Tailwind CSS', 'Stripe API', 'Node.js'],
        demoUrl: 'https://boutique-vetements-demo.netlify.app',
        images: [
          { src: VetementAccueil, alt: 'Page d\'accueil de la boutique de vêtements' },
          { src: VetementCollection, alt: 'Page collection des vêtements' },
          { src: VetementContact, alt: 'Page de contact de la boutique' }
        ],
        video: null,
        image: null,
      },
    ])

    return {
      featuredProjects,
    }
  },
}
</script> 