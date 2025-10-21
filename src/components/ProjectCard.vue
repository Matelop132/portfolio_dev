<template>
  <div class="group relative">
    <!-- Carte principale avec effet de profondeur -->
    <div class="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/25 dark:hover:shadow-primary-500/40 border border-gray-200/50 dark:border-gray-700/50">
      
      <!-- Effet de lumière animé -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-pulse"></div>
        <div class="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary-400 to-transparent animate-pulse"></div>
      </div>

      <!-- Badge catégorie flottant -->
      <div class="absolute top-6 left-6 z-20">
        <div class="relative">
          <div class="px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/5">
            <span class="text-primary-600 dark:text-primary-400 text-sm font-bold tracking-wide">
              {{ getCategoryName(project.technologies) }}
            </span>
          </div>
          <!-- Glow effect -->
          <div class="absolute inset-0 bg-primary-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>
      
      <!-- Média avec overlay sophistiqué -->
      <div :class="[
        'relative overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-50 dark:from-primary-900/30 dark:via-primary-800/20 dark:to-secondary-800/20',
        showLinks ? 'h-72' : 'h-80'
      ]">
        <!-- Carrousel d'images du projet -->
        <div v-if="project.images && project.images.length > 0" class="w-full h-full relative">
          <ImageCarousel 
            :images="project.images"
            :auto-play="true"
            :interval="3500"
          />
        </div>

        <!-- Vidéo du projet -->
        <div v-else-if="project.video" class="w-full h-full relative">
          <video
            :src="project.video"
            :alt="project.title"
            class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 filter group-hover:brightness-110"
            muted
            autoplay
            loop
            playsinline
          />
          <!-- Overlay sophistiqué -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
        </div>
        
        <!-- Image du projet -->
        <div v-else-if="project.image" class="w-full h-full relative">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 filter group-hover:brightness-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
        </div>
        
        <!-- Placeholder artistique -->
        <div v-else class="w-full h-full flex items-center justify-center relative">
          <div class="text-8xl opacity-20 animate-pulse">🎨</div>
          <div class="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10"></div>
        </div>
        
        <!-- Bouton d'action flottant -->
        <div v-if="project.demoUrl && showLinks" class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 z-30">
          <a
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-6 py-3 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white rounded-2xl shadow-xl backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:scale-110 transition-all duration-300 font-semibold text-sm group-btn"
          >
            <span class="text-lg mr-2 transition-transform duration-300 hover:rotate-12">👁️</span>
            Découvrir
          </a>
        </div>
      </div>

      <!-- Contenu avec design premium -->
      <div :class="[
        'relative',
        showLinks ? 'p-8' : 'p-6 pb-8'
      ]">
        <!-- Élément décoratif -->
        <div :class="[
          'absolute top-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-transparent',
          showLinks ? 'left-8' : 'left-6'
        ]"></div>
        
        <!-- Titre avec animation de gradient -->
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative overflow-hidden">
          <span class="relative z-10">{{ project.title }}</span>
          <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 bg-clip-text text-transparent transition-opacity duration-500"></div>
        </h3>
        
        <!-- Description avec meilleure typographie -->
        <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base">
          {{ project.description }}
        </p>
        
        <!-- Technologies avec design premium -->
        <div :class="[
          'flex flex-wrap gap-3',
          showLinks ? 'mb-8' : 'mb-4'
        ]">
          <div
            v-for="(tech, index) in project.technologies.slice(0, 4)"
            :key="tech"
            class="relative group-tech"
            :style="{ 'animation-delay': `${index * 100}ms` }"
          >
            <span class="inline-block px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold border border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-600">
              {{ tech }}
            </span>
            <!-- Glow effect pour chaque tech -->
            <div class="absolute inset-0 bg-primary-400/20 rounded-xl blur opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <span v-if="project.technologies.length > 4" class="inline-block px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl text-sm font-medium">
            +{{ project.technologies.length - 4 }}
          </span>
        </div>

        <!-- CTA avec design sophistiqué -->
        <div v-if="project.demoUrl && showLinks" class="relative">
          <a
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group-cta relative w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white rounded-2xl font-bold text-base shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-500 overflow-hidden hover:-translate-y-1"
          >
            <!-- Effet shimmer simplifié -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            
            <span class="relative z-10 mr-3">Explorer le projet</span>
            <span class="relative z-10 text-xl transition-all duration-300 hover:translate-x-2 hover:scale-110">→</span>
          </a>
        </div>
      </div>

      <!-- Indicateur de progression sophistiqué -->
      <div class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left pointer-events-none"></div>
    </div>

    <!-- Ombre projetée dynamique -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 scale-95 group-hover:scale-105 pointer-events-none"></div>
  </div>
</template>

<script>
import SkillBadge from './SkillBadge.vue'
import ImageCarousel from './ImageCarousel.vue'

export default {
  name: 'ProjectCard',
  components: {
    SkillBadge,
    ImageCarousel,
  },
  props: {
    project: {
      type: Object,
      required: true,
      validator(value) {
        return value && typeof value.title === 'string' && typeof value.description === 'string'
      },
    },
    showLinks: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getCategoryName(technologies) {
      if (!technologies || technologies.length === 0) return 'Projet Web'
      
      // Déterminer la catégorie basée sur les technologies
      if (technologies.some(tech => ['Vue.js', 'React', 'Angular', 'JavaScript', 'TypeScript'].includes(tech))) {
        return 'Frontend'
      }
      if (technologies.some(tech => ['Node.js', 'Express', 'PHP', 'Python', 'MongoDB', 'MySQL', 'PostgreSQL'].includes(tech))) {
        return 'Full-Stack'
      }
      if (technologies.some(tech => ['SEO', 'Google Ads', 'Analytics', 'Marketing'].includes(tech))) {
        return 'SEO & Marketing'
      }
      if (technologies.some(tech => ['Tailwind', 'SCSS', 'CSS3', 'Figma', 'Design'].includes(tech))) {
        return 'UI/UX'
      }
      if (technologies.some(tech => ['E-commerce', 'Stripe', 'PayPal', 'Shopify'].includes(tech))) {
        return 'E-commerce'
      }
      
      return 'Projet Web'
    }
  }
}
</script>

<style scoped>
/* Animations premium personnalisées */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
}

@keyframes shimmer-gradient {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de brillance sur hover */
.group:hover .shimmer-effect {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  background-size: 200% 100%;
  animation: shimmer-gradient 1.5s ease-in-out;
}

/* Animation d'entrée */
.group {
  animation: fade-in-up 0.6s ease-out;
}

/* Amélioration des performances */
.group {
  will-change: transform, box-shadow;
}

/* Effet de profondeur simplifié */
.group:hover {
  transform: translateY(-6px);
}

/* Gradient animé pour les badges technologiques */
.group-tech:hover span {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px) scale(1.05);
}

/* Effet de lueur pour le CTA */
.group-cta:hover {
  filter: drop-shadow(0 10px 20px rgba(59, 130, 246, 0.4));
}

/* Responsive design amélioré */
@media (max-width: 1024px) {
  .group:hover {
    transform: translateY(-4px) !important;
  }
}

@media (max-width: 768px) {
  .group {
    margin-bottom: 2rem;
  }
  
  /* Réduction des animations sur mobile pour les performances */
  .group * {
    transition-duration: 0.2s !important;
  }
  
  /* Simplification des effets sur mobile */
  .group:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1) !important;
  }
}

/* Mode sombre amélioré */
@media (prefers-color-scheme: dark) {
  .group:hover {
    box-shadow: 0 20px 60px rgba(59, 130, 246, 0.2);
  }
}

/* Accessibilité - respect des préférences de mouvement */
@media (prefers-reduced-motion: reduce) {
  .group,
  .group * {
    animation: none !important;
    transition: opacity 0.2s ease !important;
  }
  
  .group:hover {
    transform: none !important;
  }
}

/* Effet de focus pour l'accessibilité */
.group a:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Performance - GPU acceleration */
.group,
.group video,
.group img {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style> 