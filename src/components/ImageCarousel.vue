<template>
  <div class="relative w-full h-full overflow-hidden">
    <!-- Container principal des images -->
    <div class="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <!-- Images du carrousel avec transitions perfectionnées -->
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="[
          'absolute inset-0 transition-all duration-800 ease-in-out',
          index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
        ]"
      >
        <!-- Container d'image avec aspect ratio optimal -->
        <div class="relative w-full h-full">
          <img
            :src="image.src"
            :alt="image.alt"
            :class="[
              'absolute inset-0 w-full h-full transition-all duration-700 ease-in-out',
              'filter group-hover:brightness-105',
              index === currentIndex ? 'scale-100' : 'scale-102'
            ]"
            style="object-fit: cover; object-position: center;"
            loading="lazy"
          />
          
          <!-- Overlay d'amélioration visuelle -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-60 pointer-events-none"></div>
          
          <!-- Effet de vignettage subtil -->
          <div class="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/10 pointer-events-none"></div>
        </div>
      </div>
      
    </div>

    <!-- Overlay gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>

    <!-- Contrôles de navigation améliorés -->
    <div class="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
      <!-- Bouton précédent -->
      <button
        @click="previousImage"
        v-if="images.length > 1"
        class="p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-full shadow-2xl hover:shadow-white/25 dark:hover:shadow-primary-500/25 transition-all duration-300 hover:scale-110 border border-white/40 dark:border-gray-700/40"
        :disabled="images.length <= 1"
      >
        <span class="text-2xl text-gray-900 dark:text-white transition-transform duration-300 font-bold">‹</span>
      </button>

      <!-- Bouton suivant -->
      <button
        @click="nextImage"
        v-if="images.length > 1"
        class="p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-full shadow-2xl hover:shadow-white/25 dark:hover:shadow-primary-500/25 transition-all duration-300 hover:scale-110 border border-white/40 dark:border-gray-700/40"
        :disabled="images.length <= 1"
      >
        <span class="text-2xl text-gray-900 dark:text-white transition-transform duration-300 font-bold">›</span>
      </button>
    </div>

    <!-- Indicateurs modernisés -->
    <div v-if="images.length > 1" class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="setCurrentIndex(index)"
        :class="[
          'transition-all duration-400 backdrop-blur-2xl border border-white/50 rounded-full overflow-hidden',
          index === currentIndex 
            ? 'w-8 h-3 bg-white shadow-xl shadow-white/30 scale-110' 
            : 'w-3 h-3 bg-white/60 hover:bg-white/80 hover:scale-125'
        ]"
      >
        <div 
          v-if="index === currentIndex"
          class="w-full h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
        ></div>
      </button>
    </div>

    <!-- Badge compteur stylisé -->
    <div v-if="images.length > 1" class="absolute top-6 right-6 px-4 py-2 bg-black/60 dark:bg-white/10 backdrop-blur-2xl rounded-2xl text-white dark:text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20">
      <span class="text-primary-400">{{ currentIndex + 1 }}</span> / {{ images.length }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ImageCarousel',
  props: {
    images: {
      type: Array,
      required: true,
      validator: (images) => images.every(img => img.src && img.alt)
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  setup(props) {
    const currentIndex = ref(0)
    let autoPlayInterval = null

    const nextImage = () => {
      if (props.images.length > 1) {
        currentIndex.value = (currentIndex.value + 1) % props.images.length
      }
    }

    const previousImage = () => {
      if (props.images.length > 1) {
        currentIndex.value = currentIndex.value === 0 
          ? props.images.length - 1 
          : currentIndex.value - 1
      }
    }

    const setCurrentIndex = (index) => {
      if (index !== currentIndex.value) {
        currentIndex.value = index
      }
    }

    const startAutoPlay = () => {
      if (props.autoPlay && props.images.length > 1) {
        autoPlayInterval = setInterval(nextImage, props.interval)
      }
    }

    const stopAutoPlay = () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
        autoPlayInterval = null
      }
    }

    onMounted(() => {
      startAutoPlay()
    })

    onUnmounted(() => {
      stopAutoPlay()
    })

    return {
      currentIndex,
      nextImage,
      previousImage,
      setCurrentIndex,
      startAutoPlay,
      stopAutoPlay
    }
  }
}
</script>

<style scoped>
/* Gradient radial personnalisé */
.bg-radial-gradient {
  background: radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.1) 100%);
}

/* Animation d'entrée pour les images */
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(1.05);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Amélioration des transitions d'images - fluidité optimisée */
img {
  transform: translateZ(0);
  backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  will-change: transform, filter, opacity;
}

/* Styles pour les boutons de contrôle - anti-freeze */
button {
  will-change: transform, box-shadow;
  transform: translateZ(0);
  backface-visibility: hidden;
}

button:active {
  transform: translateZ(0) scale(0.95);
}

/* Effet de focus amélioré */
button:focus-visible {
  outline: 3px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
  border-radius: 9999px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Indicateurs avec animation */
.indicator {
  position: relative;
  overflow: hidden;
}

.indicator::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.6s;
}

.indicator:hover::before {
  left: 100%;
}

/* Responsive design amélioré */
@media (max-width: 768px) {
  /* Réduction des animations sur mobile */
  * {
    transition-duration: 0.3s !important;
  }
  
  /* Boutons plus grands pour mobile */
  button {
    padding: 1rem !important;
  }
  
  /* Indicateurs plus grands sur mobile */
  .indicator {
    width: 1rem !important;
    height: 1rem !important;
  }
}

@media (max-width: 480px) {
  /* Contrôles simplifiés sur très petits écrans */
  button {
    padding: 0.75rem !important;
    background: rgba(0,0,0,0.7) !important;
    backdrop-filter: blur(10px) !important;
  }
}

/* Mode sombre amélioré */
@media (prefers-color-scheme: dark) {
  .bg-radial-gradient {
    background: radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(255,255,255,0.05) 100%);
  }
}

/* Respect des préférences de mouvement réduit */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: opacity 0.3s ease !important;
    animation: none !important;
  }
  
  img {
    transform: none !important;
  }
}
</style>
