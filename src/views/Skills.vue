<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Mes Services
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Solutions digitales pour développer votre business et atteindre vos objectifs
        </p>
      </div>

      <!-- Catégories de services -->
      <div class="space-y-12">
        <div
          v-for="category in serviceCategories"
          :key="category.id"
          class="glass card-hover rounded-xl p-8 text-center"
        >
          <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl"
               :class="category.iconBg">
            {{ category.icon }}
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ category.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            {{ category.description }}
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <SkillBadge
              v-for="skill in category.skills"
              :key="skill"
              :skill="skill"
              :variant="category.variant"
              size="sm"
            />
          </div>
        </div>
      </div>

      <!-- Section Résultats -->
      <div class="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Résultats Obtenus
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              +150%
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              Augmentation trafic moyen
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              98/100
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              Score PageSpeed moyen
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              100%
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              Clients satisfaits
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SkillBadge from '@/components/SkillBadge.vue'

export default {
  name: 'Skills',
  components: {
    SkillBadge,
  },
  setup() {
    const serviceCategories = ref([
      {
        id: 1,
        title: 'Création de Sites Web',
        description: 'Sites vitrines modernes et responsives avec une expérience utilisateur optimale.',
        icon: '🌐',
        iconBg: 'bg-blue-100 dark:bg-blue-900/20',
        variant: 'info',
        skills: ['Vue.js', 'React', 'HTML/CSS', 'JavaScript', 'Responsive Design']
      },
      {
        id: 2,
        title: 'E-commerce',
        description: 'Boutiques en ligne performantes avec gestion des paiements et des stocks.',
        icon: '🛒',
        iconBg: 'bg-green-100 dark:bg-green-900/20',
        variant: 'success',
        skills: ['Stripe', 'PayPal', 'Gestion des stocks', 'Panier d\'achat', 'Sécurité']
      },
      {
        id: 3,
        title: 'Référencement SEO',
        description: 'Optimisation pour les moteurs de recherche et amélioration de la visibilité.',
        icon: '📈',
        iconBg: 'bg-yellow-100 dark:bg-yellow-900/20',
        variant: 'warning',
        skills: ['Google Analytics', 'Google Ads', 'Mots-clés', 'Backlinks', 'Performance']
      },
      {
        id: 4,
        title: 'Expérience Utilisateur',
        description: 'Design centré utilisateur avec interfaces intuitives et accessibles.',
        icon: '🎨',
        iconBg: 'bg-purple-100 dark:bg-purple-900/20',
        variant: 'secondary',
        skills: ['Figma', 'Prototypage', 'Tests utilisateurs', 'Accessibilité', 'UI/UX']
      }
    ])

    return {
      serviceCategories,
    }
  },
}
</script> 