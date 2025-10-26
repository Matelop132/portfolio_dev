<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-space-darker/95 border-b border-space-purple/30">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Néon -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-br from-space-purple to-space-magenta rounded-lg flex items-center justify-center glow-purple transition-all duration-300 group-hover:scale-110">
              <span class="text-white font-display font-bold text-xl">M</span>
            </div>
            <div class="absolute inset-0 bg-gradient-to-br from-space-purple to-space-magenta rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span class="text-xl font-display font-bold text-white neon-glow" style="color: #00FFFF">DEV.SPACE</span>
        </router-link>

        <!-- Navigation Desktop -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="relative text-gray-300 hover:text-space-cyan transition-all duration-300 font-medium comet-trail"
            active-class="text-space-magenta"
          >
            <span class="relative z-10">{{ item.name }}</span>
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-space-purple via-space-magenta to-space-cyan transition-all duration-300 group-hover:w-full"></span>
          </router-link>
        </div>

        <!-- Boutons Droite -->
        <div class="flex items-center space-x-4">
          <!-- Bouton RDV Néon -->
          <router-link
            to="/contact"
            class="hidden md:inline-flex items-center btn-space"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            RDV
          </router-link>

          <!-- Menu Mobile -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg bg-space-navy/50 border border-space-purple/30 hover:border-space-magenta/50 transition-all"
          >
            <svg class="w-5 h-5 text-space-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu Mobile -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-space-purple/30">
        <div class="flex flex-col space-y-4">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-space-cyan transition-colors font-medium"
            active-class="text-space-magenta"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppHeaderSpatial',
  setup() {
    const isMobileMenuOpen = ref(false)
    const menuItems = [
      { name: 'Accueil', path: '/' },
      { name: 'Compétences', path: '/competences' },
      { name: 'Projets', path: '/projets' },
      { name: 'À propos', path: '/a-propos' },
      { name: 'Contact', path: '/contact' },
    ]

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    return {
      isMobileMenuOpen,
      menuItems,
      toggleMobileMenu,
      closeMobileMenu,
    }
  },
}
</script>

