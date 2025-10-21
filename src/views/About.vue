<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          À propos de moi
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Développeur web passionné, je transforme les idées en applications web modernes et performantes
        </p>
      </div>

      <!-- Section Profil -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Développeur Freelance
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Fort de <strong>3 ans d'expérience en entreprise</strong> et d'un <strong>Master en développement web</strong>, 
              je me suis spécialisé dans la création d'applications web modernes avec Vue.js et Laravel, 
              l'optimisation SEO et le marketing digital.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Ma mission est de vous accompagner dans la réalisation de vos projets web, 
              en apportant une expertise technique pointue et une approche orientée résultats.
            </p>
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center text-primary-600 dark:text-primary-400">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Disponible pour missions freelance</span>
              </div>
              <div class="flex items-center text-primary-600 dark:text-primary-400">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>100% clients satisfaits</span>
              </div>
            </div>
          </div>
          <div class="lg:text-right">
            <div class="bg-gradient-to-br from-primary-500 to-primary-600 w-64 h-64 rounded-full mx-auto lg:mx-0 lg:ml-auto flex items-center justify-center">
              <span class="text-white text-6xl">👨‍💻</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Parcours -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Expérience professionnelle -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 16V8a6 6 0 0 1 12 0v8a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1zM6 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1z"/>
            </svg>
            Expérience Professionnelle
          </h2>
          <div class="space-y-6">
            <div class="border-l-4 border-primary-500 pl-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Développeur Web Freelance
              </h3>
              <p class="text-primary-600 dark:text-primary-400 text-sm mb-2">
                2024 - Présent
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                Création d'applications web modernes, optimisation SEO, 
                campagnes Google Ads et accompagnement technique pour startups et PME.
              </p>
            </div>
            <div class="border-l-4 border-gray-300 pl-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Développeur Full Stack Junior
              </h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">
                2023 - 2026 • Compagnie Fiduciaire
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                Développement d'application de solutions comptables avec Vue.js et Laravel.
              </p>
            </div>
          </div>
        </div>

        <!-- Formation -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
            Formation
          </h2>
          <div class="space-y-6">
            <div class="border-l-4 border-primary-500 pl-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Master en Développement Web
              </h3>
              <p class="text-primary-600 dark:text-primary-400 text-sm mb-2">
                2024 - 2026 • EPSI Bordeaux
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                Spécialisation en développement web moderne, 
                frameworks et outils de développement d'application web et métier.
              </p>
            </div>
            <div class="border-l-4 border-gray-300 pl-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Licence Informatique
              </h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">
                2021 - 2024 • EPSI Bordeaux
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                Fondamentaux de l'informatique, programmation et bases de données.
              </p>
            </div>
          </div>

          <!-- Certifications -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Certifications
            </h3>
            <div class="flex flex-wrap gap-2">
              <SkillBadge skill="Google Ads" variant="success" />
              <SkillBadge skill="Analytics" variant="success" />
              <SkillBadge skill="AWS" variant="warning" />
              <SkillBadge skill="Vue.js" variant="primary" />
            </div>
          </div>
        </div>
      </div>

      <!-- Section Valeurs -->
      <div class="mt-12 bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Mes Valeurs
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Orienté Résultats
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Chaque projet est mené avec un objectif clair et des métriques de réussite définies.
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">💡</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Innovation
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Utilisation des dernières technologies et meilleures pratiques du développement web.
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🤝</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Collaboration
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Communication transparente et collaboration étroite avec mes clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkillBadge from '@/components/SkillBadge.vue'

export default {
  name: 'About',
  components: {
    SkillBadge,
  },
}
</script> 