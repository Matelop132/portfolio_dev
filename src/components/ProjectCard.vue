<template>
  <div class="project-card-spatial group relative">
    <!-- Carte principale style spatial -->
    <div class="glass-card-spatial relative rounded-3xl overflow-hidden transition-all duration-500 border border-space-purple/30 hover:border-space-magenta/50">
      
      <!-- Bordure néon animée -->
      <div class="neon-border-animated absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <!-- Particules flottantes au hover -->
      <div class="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div class="particle-space particle-1"></div>
        <div class="particle-space particle-2"></div>
        <div class="particle-space particle-3"></div>
      </div>

      <!-- Badge catégorie spatial -->
      <div class="absolute top-6 left-6 z-20 animate-float">
        <div class="relative">
          <div class="px-4 py-2 bg-space-darker/90 rounded-xl border border-space-cyan/40 shadow-lg glow-cyan">
            <span class="text-space-cyan text-xs font-bold tracking-wider uppercase">
              {{ getCategoryName(project.technologies) }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Média avec overlay spatial -->
      <div :class="[
        'relative overflow-hidden bg-gradient-to-br from-space-darker/50 to-space-navy/30',
        showLinks ? 'h-72' : 'h-80'
      ]">
        <!-- Carrousel d'images du projet -->
        <div v-if="project.images && project.images.length > 0" class="w-full h-full relative">
          <ImageCarousel 
            :images="project.images"
            :auto-play="false"
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
        
        <!-- Bouton d'action flottant spatial -->
        <div v-if="project.demoUrl && showLinks" class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 z-30">
          <a
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-space inline-flex items-center px-6 py-3 comet-trail hover:scale-110 transition-all duration-300 font-semibold text-sm"
          >
            <span class="text-lg mr-2">🚀</span>
            Découvrir
          </a>
        </div>
      </div>

      <!-- Contenu avec design premium -->
      <div :class="[
        'relative',
        showLinks ? 'p-8' : 'p-6 pb-8'
      ]">
        <!-- Élément décoratif néon -->
        <div :class="[
          'absolute top-0 w-16 h-0.5 bg-gradient-to-r from-space-magenta via-space-purple to-transparent glow-magenta',
          showLinks ? 'left-8' : 'left-6'
        ]"></div>
        
        <!-- Titre spatial avec effet néon -->
        <h3 class="text-2xl font-display font-bold text-white mb-4 relative">
          <span class="text-gradient-space">{{ project.title }}</span>
        </h3>
        
        <!-- Description spatiale -->
        <p class="text-gray-300 mb-6 leading-relaxed text-base">
          {{ project.description }}
        </p>
        
        <!-- Technologies style spatial -->
        <div :class="[
          'flex flex-wrap gap-2',
          showLinks ? 'mb-8' : 'mb-4'
        ]">
          <div
            v-for="(tech, index) in project.technologies.slice(0, 4)"
            :key="tech"
            class="tech-badge-spatial"
            :style="{ 'animation-delay': `${index * 100}ms` }"
          >
            <span class="inline-block px-3 py-1.5 bg-space-navy/50 text-space-cyan rounded-lg text-xs font-semibold border border-space-cyan/30 transition-all duration-300 hover:border-space-magenta hover:text-space-magenta hover:glow-cyan">
              {{ tech }}
            </span>
          </div>
          <span v-if="project.technologies.length > 4" class="inline-block px-3 py-1.5 bg-space-darker/70 text-gray-400 rounded-lg text-xs font-medium border border-space-purple/20">
            +{{ project.technologies.length - 4 }}
          </span>
        </div>

        <!-- CTA spatial néon -->
        <div v-if="project.demoUrl && showLinks" class="relative">
          <a
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-space comet-trail relative w-full inline-flex items-center justify-center"
          >
            <span class="mr-2">Explorer le projet</span>
            <span class="text-xl">🚀</span>
          </a>
        </div>
      </div>

      <!-- Indicateur de progression néon -->
      <div class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-space-purple via-space-magenta to-space-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left pointer-events-none glow-magenta"></div>
    </div>

    <!-- Glow spatial dynamique -->
    <div class="absolute inset-0 bg-gradient-to-r from-space-purple/20 to-space-magenta/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 scale-90 group-hover:scale-105 pointer-events-none"></div>
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
/* ==================================== */
/* CARTE PROJET STYLE SPATIAL */
/* ==================================== */

/* Glass card spatial */
.glass-card-spatial {
  background: rgba(11, 12, 42, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Bordure néon animée au hover */
.neon-border-animated {
  background: linear-gradient(135deg, #8A2BE2, #FF00CC, #00FFFF, #8A2BE2);
  background-size: 400% 400%;
  animation: neon-pulse 3s ease-in-out infinite;
  padding: 2px;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

@keyframes neon-pulse {
  0%, 100% {
    background-position: 0% 50%;
    opacity: 0.6;
  }
  50% {
    background-position: 100% 50%;
    opacity: 1;
  }
}

/* Particules spatiales flottantes */
.particle-space {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #00FFFF, transparent);
  border-radius: 50%;
  animation: particle-float 3s ease-in-out infinite;
}

.particle-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.particle-2 {
  top: 60%;
  right: 20%;
  animation-delay: 1s;
}

.particle-3 {
  bottom: 30%;
  left: 70%;
  animation-delay: 2s;
}

@keyframes particle-float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) scale(1.5);
    opacity: 1;
  }
}

/* Carte avec effet flottant */
.project-card-spatial {
  animation: card-fade-in 0.6s ease-out;
}

@keyframes card-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effect - carte s'élève */
.project-card-spatial:hover .glass-card-spatial {
  transform: translateY(-8px);
  box-shadow: 
    0 12px 40px rgba(138, 43, 226, 0.3),
    0 0 60px rgba(255, 0, 204, 0.2);
}

/* Badge technologie spatial */
.tech-badge-spatial {
  animation: tech-appear 0.3s ease-out forwards;
  animation-fill-mode: backwards;
  opacity: 0;
}

@keyframes tech-appear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ==================================== */
/* RESPONSIVE */
/* ==================================== */
@media (max-width: 1024px) {
  .project-card-spatial:hover .glass-card-spatial {
    transform: translateY(-4px);
  }
}

@media (max-width: 768px) {
  .project-card-spatial {
    margin-bottom: 2rem;
  }
  
  /* Transitions plus rapides sur mobile */
  .project-card-spatial * {
    transition-duration: 0.25s !important;
  }
  
  .project-card-spatial:hover .glass-card-spatial {
    transform: translateY(-3px);
  }
  
  /* Simplifier particules sur mobile */
  .particle-space {
    display: none;
  }
}

/* ==================================== */
/* ACCESSIBILITÉ */
/* ==================================== */
@media (prefers-reduced-motion: reduce) {
  .project-card-spatial,
  .project-card-spatial * {
    animation: none !important;
    transition: opacity 0.2s ease !important;
  }
  
  .project-card-spatial:hover .glass-card-spatial {
    transform: none !important;
  }
}

/* Focus pour accessibilité */
.project-card-spatial a:focus-visible {
  outline: 2px solid #00FFFF;
  outline-offset: 3px;
  border-radius: 8px;
}

/* ==================================== */
/* OPTIMISATIONS */
/* ==================================== */
.glass-card-spatial {
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.glass-card-spatial video,
.glass-card-spatial img {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style> 