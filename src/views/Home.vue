<template>
  <div>
    <!-- Section Hero Spatial Full Screen -->
    <section class="hero-galaxy relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Glow spots animés -->
      <div class="absolute top-20 left-10 w-96 h-96 bg-space-purple/30 rounded-full blur-3xl animate-glow-pulse z-[1]"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-space-magenta/20 rounded-full blur-3xl animate-glow-pulse z-[1]" style="animation-delay: 1.5s;"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Contenu texte -->
          <div class="text-center lg:text-left space-y-8">
            <!-- Badge Spatial Simplifié -->
            <div class="flex justify-center lg:justify-start mb-8 animate-fade-in">
              <div class="glass-card px-6 py-3 inline-flex items-center gap-3 animate-float">
                <div class="w-10 h-10 bg-gradient-to-br from-space-purple to-space-magenta rounded-lg flex items-center justify-center glow-purple">
                  <span class="text-xl">🎓</span>
                </div>
                <div class="text-left">
                  <h3 class="text-sm font-bold text-white">Ingénieur & Licencié RNCP</h3>
                  <p class="text-xs text-space-cyan">Développement Web</p>
                </div>
                <div class="w-2 h-2 bg-space-cyan rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-fade-in">
              Développeur Web
              <span class="text-gradient-space block mt-2">Freelance</span>
            </h1>
            
            <p class="text-xl text-gray-300 mb-8 animate-slide-up max-w-2xl mx-auto lg:mx-0">
              Passionné par le développement web moderne avec <span class="text-space-cyan font-semibold">3 ans d'expérience</span>
              et un <span class="text-space-magenta font-semibold">Master en développement</span>. 
              Je transforme vos idées en applications web <span class="text-space-purple font-semibold">performantes</span>.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up">
              <router-link
                to="/projets"
                class="btn-space comet-trail inline-flex items-center justify-center"
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
    <!-- Section Projets récents avec fond amélioré -->
    <section class="projects-section-enhanced relative py-20">
      <!-- Fusée spatiale qui traverse la bordure -->
      <div class="rocket-container">
        <div class="rocket">
          <svg class="rocket-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Corps de la fusée -->
            <path d="M 45 80 L 45 30 Q 50 15 55 30 L 55 80 Z" fill="#FF00CC" stroke="#8A2BE2" stroke-width="2"/>
            <!-- Pointe -->
            <path d="M 45 30 Q 50 10 55 30 Z" fill="#00FFFF" stroke="#8A2BE2" stroke-width="2"/>
            <!-- Ailerons -->
            <path d="M 45 70 L 35 85 L 45 80 Z" fill="#8A2BE2"/>
            <path d="M 55 70 L 65 85 L 55 80 Z" fill="#8A2BE2"/>
            <!-- Hublot -->
            <circle cx="50" cy="50" r="8" fill="#00FFFF" opacity="0.6"/>
            <!-- Flammes -->
            <path d="M 45 80 L 40 95 L 45 85 Z" fill="#FF6600" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.4;0.8" dur="0.3s" repeatCount="indefinite"/>
            </path>
            <path d="M 55 80 L 60 95 L 55 85 Z" fill="#FFD700" opacity="0.8">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="0.3s" repeatCount="indefinite"/>
            </path>
            <path d="M 50 80 L 50 100 L 47 85 Z" fill="#FF0000" opacity="0.7">
              <animate attributeName="opacity" values="0.7;0.3;0.7" dur="0.2s" repeatCount="indefinite"/>
            </path>
          </svg>
          <div class="rocket-trail"></div>
        </div>
      </div>

      <!-- Animations de fond : étoiles filantes, soucoupe, etc. -->
      <div class="space-animations-container">
        <!-- Étoiles filantes - Réduites à 4 pour la performance -->
        <div class="shooting-star shooting-star-1"></div>
        <div class="shooting-star shooting-star-2"></div>
        <div class="shooting-star shooting-star-3"></div>
        <div class="shooting-star shooting-star-4"></div>
        
        <!-- Soucoupe volante -->
        <div class="ufo">
          <svg class="ufo-svg" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
            <!-- Dôme de la soucoupe -->
            <ellipse cx="60" cy="25" rx="20" ry="15" fill="#00FFFF" opacity="0.8"/>
            <ellipse cx="60" cy="25" rx="15" ry="10" fill="#8A2BE2" opacity="0.6"/>
            <!-- Corps principal -->
            <ellipse cx="60" cy="35" rx="40" ry="10" fill="#FF00CC"/>
            <ellipse cx="60" cy="33" rx="40" ry="8" fill="#8A2BE2"/>
            <!-- Lumières clignotantes -->
            <circle cx="35" cy="35" r="3" fill="#00FFFF">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="35" r="3" fill="#FFD700">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="85" cy="35" r="3" fill="#00FFFF">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite"/>
            </circle>
            <!-- Rayon lumineux -->
            <path d="M 50 45 L 45 60 L 75 60 L 70 45 Z" fill="#00FFFF" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>

        <!-- Planète flottante - Réduit à 1 -->
        <div class="floating-planet planet-1">🪐</div>
        
        <!-- Comète - Réduit à 1 -->
        <div class="comet comet-1"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Mes Projets <span class="text-gradient-space">Récents</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
            class="btn-space comet-trail inline-flex items-center justify-center text-lg"
          >
            <span class="mr-3">Découvrir tous mes projets</span>
            <span class="text-2xl">🚀</span>
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

<style scoped>
/* Section Projets Récents - Fond subtil avec dégradé violet/magenta/cyan */
.projects-section-enhanced {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(11, 12, 42, 0) 0%,
    rgba(26, 29, 58, 0.6) 10%,
    rgba(45, 27, 78, 0.8) 30%,
    rgba(138, 43, 226, 0.15) 50%,
    rgba(255, 0, 204, 0.15) 70%,
    rgba(26, 29, 58, 0.8) 90%,
    rgba(11, 12, 42, 0) 100%
  );
  overflow: visible; /* Permet à la fusée de dépasser */
}

/* Overlay avec les couleurs néon en radial pour plus de profondeur */
.projects-section-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(138, 43, 226, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(255, 0, 204, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(0, 255, 255, 0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

/* Bordures lumineuses subtiles en haut et bas */
.projects-section-enhanced::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(138, 43, 226, 0.5) 20%,
    rgba(255, 0, 204, 0.6) 50%,
    rgba(0, 255, 255, 0.5) 80%,
    transparent 100%
  );
  box-shadow: 0 0 30px rgba(138, 43, 226, 0.4);
  pointer-events: none;
  z-index: 1;
}

/* ==================================== */
/* ANIMATION FUSÉE SPATIALE */
/* ==================================== */

.rocket-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  pointer-events: none;
  z-index: 100; /* Au-dessus de tout pour être visible */
  overflow: visible;
}

.rocket {
  position: absolute;
  top: -30px;
  left: -80px;
  width: 50px;
  height: 50px;
  filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.9)) 
          drop-shadow(0 0 25px rgba(255, 0, 204, 0.6));
  animation: rocketFly 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  transform-origin: center center;
}

.rocket-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg); /* Pointe vers la droite par défaut */
}

/* Traînée lumineuse de la fusée */
.rocket-trail {
  position: absolute;
  top: 50%;
  right: 55%;
  width: 100px;
  height: 4px;
  background: linear-gradient(
    to left,
    rgba(255, 0, 204, 0.9),
    rgba(138, 43, 226, 0.7),
    rgba(0, 255, 255, 0.5),
    transparent
  );
  box-shadow: 
    0 0 15px rgba(255, 0, 204, 0.8),
    0 0 30px rgba(0, 255, 255, 0.5);
  transform: translateY(-50%);
  border-radius: 50%;
  animation: trailPulse 0.3s ease-in-out infinite;
}

/* Animation de la fusée traversant l'écran avec rotation réaliste */
@keyframes rocketFly {
  0% {
    left: -100px;
    top: -30px;
    transform: rotate(-10deg) translateY(0);
  }
  
  /* Phase de décollage - monte légèrement */
  8% {
    left: 8%;
    top: -35px;
    transform: rotate(-8deg) translateY(-5px);
  }
  
  /* Stabilisation horizontale */
  15% {
    left: 15%;
    top: -30px;
    transform: rotate(-3deg) translateY(0);
  }
  
  /* Légère montée */
  25% {
    left: 25%;
    top: -38px;
    transform: rotate(2deg) translateY(-8px);
  }
  
  /* Retour au centre */
  35% {
    left: 35%;
    top: -30px;
    transform: rotate(-2deg) translateY(0);
  }
  
  /* Milieu de l'écran - vol stable */
  50% {
    left: 50%;
    top: -32px;
    transform: rotate(0deg) translateY(-2px);
  }
  
  /* Légère descente */
  60% {
    left: 60%;
    top: -28px;
    transform: rotate(3deg) translateY(2px);
  }
  
  /* Remontée */
  70% {
    left: 70%;
    top: -35px;
    transform: rotate(-2deg) translateY(-5px);
  }
  
  /* Préparation sortie */
  85% {
    left: 85%;
    top: -30px;
    transform: rotate(5deg) translateY(0);
  }
  
  /* Accélération finale */
  95% {
    left: 98%;
    top: -33px;
    transform: rotate(8deg) translateY(-3px);
  }
  
  /* Sortie de l'écran */
  100% {
    left: calc(100% + 100px);
    top: -35px;
    transform: rotate(10deg) translateY(-5px);
  }
}

/* Pulsation de la traînée - plus dynamique */
@keyframes trailPulse {
  0%, 100% {
    opacity: 1;
    width: 100px;
    box-shadow: 
      0 0 15px rgba(255, 0, 204, 0.8),
      0 0 30px rgba(0, 255, 255, 0.5);
  }
  50% {
    opacity: 0.6;
    width: 70px;
    box-shadow: 
      0 0 10px rgba(255, 0, 204, 0.6),
      0 0 20px rgba(0, 255, 255, 0.3);
  }
}

/* Animation plus rapide sur mobile avec fusée plus petite */
@media (max-width: 768px) {
  .rocket {
    width: 35px;
    height: 35px;
    animation-duration: 7s;
  }
  
  .rocket-trail {
    width: 60px;
    height: 3px;
  }
  
  @keyframes trailPulse {
    0%, 100% {
      width: 60px;
    }
    50% {
      width: 40px;
    }
  }
}

/* Désactiver l'animation si préférence mouvement réduit */
@media (prefers-reduced-motion: reduce) {
  .rocket,
  .rocket-trail {
    animation: none !important;
    display: none;
  }
}

/* ==================================== */
/* ANIMATIONS DE FOND SPATIALES */
/* ==================================== */

.space-animations-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2; /* Derrière le contenu mais devant le background */
  overflow: hidden;
}

/* ========== ÉTOILES FILANTES ========== */
.shooting-star {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, #ffffff, #00FFFF);
  border-radius: 50%;
  box-shadow: 
    0 0 10px 3px rgba(255, 255, 255, 1),
    0 0 20px 5px rgba(0, 255, 255, 0.8),
    0 0 30px 7px rgba(138, 43, 226, 0.5);
  animation: shootingStar 2.5s linear infinite;
  opacity: 0;
}

.shooting-star::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 3px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(0, 255, 255, 0.8),
    rgba(138, 43, 226, 0.4),
    transparent
  );
  transform: translate(-50%, -50%) rotate(-45deg);
  transform-origin: left center;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
}

/* Positionner les étoiles filantes avec des délais différents */
.shooting-star-1 {
  top: 15%;
  right: 5%;
  animation-delay: 0s;
}

.shooting-star-2 {
  top: 35%;
  right: 40%;
  animation-delay: 2s;
}

.shooting-star-3 {
  top: 60%;
  right: 20%;
  animation-delay: 4.5s;
}

.shooting-star-4 {
  top: 80%;
  right: 60%;
  animation-delay: 7s;
}

@keyframes shootingStar {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(-800px, 400px);
    opacity: 0;
  }
}

/* ========== SOUCOUPE VOLANTE ========== */
.ufo {
  position: absolute;
  top: 30%;
  left: -150px;
  width: 80px;
  height: 60px;
  filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.7));
  animation: ufoFly 15s linear infinite;
}

.ufo-svg {
  width: 100%;
  height: 100%;
}

@keyframes ufoFly {
  0% {
    left: -150px;
    transform: translateY(0) rotate(-5deg);
  }
  15% {
    transform: translateY(-20px) rotate(3deg);
  }
  30% {
    transform: translateY(0) rotate(-3deg);
  }
  45% {
    transform: translateY(15px) rotate(5deg);
  }
  60% {
    transform: translateY(-10px) rotate(-2deg);
  }
  75% {
    transform: translateY(5px) rotate(2deg);
  }
  100% {
    left: calc(100% + 150px);
    transform: translateY(0) rotate(5deg);
  }
}

/* ========== PLANÈTE FLOTTANTE ========== */
.floating-planet {
  position: absolute;
  font-size: 40px;
  filter: drop-shadow(0 0 15px rgba(138, 43, 226, 0.6));
  animation: floatPlanet 8s ease-in-out infinite;
}

.planet-1 {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

@keyframes floatPlanet {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) rotate(5deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(15px) rotate(-5deg);
  }
}

/* ========== COMÈTE ========== */
.comet {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #FFD700, #FF6600);
  border-radius: 50%;
  box-shadow: 
    0 0 15px 3px rgba(255, 215, 0, 0.8),
    0 0 30px 6px rgba(255, 102, 0, 0.5);
  opacity: 0;
}

.comet::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 6px;
  width: 100px;
  height: 3px;
  background: linear-gradient(
    to left,
    rgba(255, 215, 0, 0.8),
    rgba(255, 102, 0, 0.5),
    transparent
  );
  transform: translateY(-50%);
  border-radius: 50%;
}

.comet-1 {
  top: 40%;
  left: -120px;
  animation: cometFly 7s ease-in infinite;
  animation-delay: 5s;
}

@keyframes cometFly {
  0% {
    left: -120px;
    top: 40%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 110%;
    top: 55%;
    opacity: 0;
  }
}

/* ========== RESPONSIVE MOBILE ========== */
@media (max-width: 768px) {
  /* Réduire la taille des éléments sur mobile */
  .ufo {
    width: 60px;
    height: 45px;
  }
  
  .floating-planet {
    font-size: 30px;
  }
  
  /* Étoiles filantes plus petites sur mobile */
  .shooting-star {
    width: 2px;
    height: 2px;
  }
  
  .shooting-star::after {
    width: 70px;
    height: 2px;
  }
  
  /* Masquer quelques éléments sur mobile pour la performance */
  .shooting-star-3,
  .shooting-star-4,
  .comet {
    display: none;
  }
  
  .comet::after {
    width: 60px;
  }
  
  /* Accélérer les animations sur mobile pour réduire la charge */
  @keyframes ufoFly {
    0% {
      left: -150px;
    }
    100% {
      left: calc(100% + 150px);
    }
  }
  
  @keyframes shootingStar {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translate(-500px, 250px);
      opacity: 0;
    }
  }
}

/* ========== DÉSACTIVER POUR PRÉFÉRENCE MOUVEMENT RÉDUIT ========== */
@media (prefers-reduced-motion: reduce) {
  .space-animations-container,
  .shooting-star,
  .ufo,
  .floating-planet,
  .comet {
    animation: none !important;
    display: none;
  }
}
</style> 