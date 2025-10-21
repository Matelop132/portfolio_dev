<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">M</span>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">Portfolio</span>
        </router-link>

        <!-- Navigation desktop -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Boutons droite -->
        <div class="flex items-center space-x-4">
          <!-- Bouton Prendre RDV -->
          <router-link
            to="/contact"
            @click="handleRdvClick"
            class="hidden md:inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-300 font-medium shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 rdv-btn-animate"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Prendre RDV
          </router-link>
          <!-- Toggle thème -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            :title="isDark ? 'Passer au mode clair' : 'Passer au mode sombre'"
          >
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </button>

          <!-- Menu mobile -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col space-y-4">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ item.name }}
          </router-link>
          
          <!-- Bouton Prendre RDV Mobile -->
          <router-link
            to="/contact"
            @click="handleRdvClickMobile"
            class="inline-flex items-center justify-center px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-300 font-medium shadow-lg hover:shadow-2xl transform hover:scale-105 mt-2 rdv-btn-animate"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Prendre un rendez-vous
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

export default {
  name: 'AppHeader',
  setup() {
    const themeStore = useThemeStore()
    const isMobileMenuOpen = ref(false)

    const isDark = computed(() => themeStore.isDark)

    const menuItems = [
      { name: 'Accueil', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Projets', path: '/projets' },
      { name: 'À propos', path: '/a-propos' },
      { name: 'Contact', path: '/contact' },
    ]

    const toggleTheme = () => {
      themeStore.toggleTheme()
    }

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    const handleRdvClick = (event) => {
      const button = event.currentTarget
      // Ajouter classe d'animation au clic
      button.classList.add('clicked')
      
      // Retirer la classe après l'animation
      setTimeout(() => {
        button.classList.remove('clicked')
      }, 400)
    }

    const handleRdvClickMobile = (event) => {
      closeMobileMenu()
      handleRdvClick(event)
    }

    return {
      isDark,
      isMobileMenuOpen,
      menuItems,
      toggleTheme,
      toggleMobileMenu,
      closeMobileMenu,
      handleRdvClick,
      handleRdvClickMobile,
    }
  },
}
</script>

<style scoped>
/* Animation du bouton au clic */
.rdv-btn-animate {
  position: relative;
  overflow: hidden;
}

.rdv-btn-animate::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
  pointer-events: none;
}

.rdv-btn-animate.clicked::before {
  width: 200px;
  height: 200px;
}

.rdv-btn-animate.clicked {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

/* Respecter les préférences de mouvement réduit */
@media (prefers-reduced-motion: reduce) {
  .rdv-btn-animate {
    transition: background-color 0.2s ease;
  }
  
  .rdv-btn-animate::before {
    display: none;
  }
  
  .rdv-btn-animate.clicked {
    transform: none;
    background-color: var(--primary-700);
  }
  
  .rdv-btn-animate:hover {
    transform: none !important;
  }
}
</style>
