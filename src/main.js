import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import './theme-spatial.css' // Thème spatial galactique
import './performance-optimizations.css' // Optimisations de performance

// Création de l'application
const app = createApp(App)

// Plugins
app.use(createPinia())
app.use(router)

// Google Analytics (remplacez par votre ID)
const GA_TRACKING_ID = 'G-XXXXXXXXXX'

// Fonction pour charger Google Analytics
const loadGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    // Chargement du script Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Configuration de gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_TRACKING_ID)
  }
}

// Initialisation de Google Analytics
loadGoogleAnalytics()

// Montage de l'application
app.mount('#app')
