import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // État du thème
  const isDark = ref(false)

  // Initialiser le thème depuis localStorage ou préférence système
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Détection automatique du thème système
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  // Appliquer le thème au DOM
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('portfolio-theme', isDark.value ? 'dark' : 'light')
  }

  // Basculer le thème
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  // Getters computed
  const themeIcon = computed(() => isDark.value ? '🌙' : '☀️')
  const themeLabel = computed(() => isDark.value ? 'Mode clair' : 'Mode sombre')

  return {
    isDark,
    initializeTheme,
    toggleTheme,
    themeIcon,
    themeLabel,
  }
})

export const useNavigationStore = defineStore('navigation', () => {
  // État du menu mobile
  const isMobileMenuOpen = ref(false)

  // Basculer le menu mobile
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  // Fermer le menu mobile
  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  }
}) 