<template>
  <div id="app" class="min-h-screen relative">
    <!-- Étoiles spatiales animées -->
    <div class="space-stars" ref="starsContainer"></div>
    
    <!-- Contenu principal -->
    <div class="relative z-10">
      <AppHeader />
      <main class="pt-16">
        <router-view v-slot="{ Component, route }">
          <transition
            :name="getTransitionName(route)"
            mode="out-in"
            @enter="onEnter"
            @leave="onLeave"
          >
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import AppHeader from '@/components/AppHeaderSpatial.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    const themeStore = useThemeStore()
    const starsContainer = ref(null)

    // Générer les étoiles spatiales (optimisé pour performance)
    const generateStars = () => {
      if (!starsContainer.value) return
      
      const numberOfStars = 50  // Réduit de 150 à 50 pour performance
      
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div')
        star.className = `star ${Math.random() > 0.85 ? 'large' : ''}`
        
        // Position aléatoire
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        
        // Délai d'animation aléatoire
        star.style.animationDelay = `${Math.random() * 4}s`
        star.style.animationDuration = `${3 + Math.random() * 3}s`
        
        starsContainer.value.appendChild(star)
      }
    }

    onMounted(() => {
      // Initialiser le thème au démarrage
      themeStore.initializeTheme()
      
      // Générer les étoiles
      generateStars()
    })

    const getTransitionName = (route) => {
      // Transition spéciale pour la page Contact (depuis le bouton RDV)
      if (route.name === 'Contact') {
        return 'slide-up'
      }
      // Transition par défaut pour les autres pages
      return 'fade'
    }

    const onEnter = (el) => {
      // Animation d'entrée (optimisée sans force reflow)
      el.style.opacity = '0'
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
        el.style.opacity = '1'
      })
    }

    const onLeave = (el, done) => {
      // Animation de sortie
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
      el.style.opacity = '0'
      setTimeout(done, 300)
    }

    return {
      themeStore,
      starsContainer,
      getTransitionName,
      onEnter,
      onLeave,
    }
  },
}
</script>

<style>
/* Styles globaux additionnels si nécessaire */
#app {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Scroll smooth */
html {
  scroll-behavior: smooth;
}

/* Transitions de pages */
/* Transition fade par défaut */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Transition slide-up pour Contact */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(1.02);
}

/* Respecter les préférences de mouvement réduit */
@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active,
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: opacity 0.2s ease !important;
  }
  
  .fade-enter-from,
  .fade-leave-to,
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: none !important;
  }
  
  html {
    scroll-behavior: auto;
  }
}
</style>
