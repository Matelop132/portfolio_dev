import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// Lazy loading des composants pour améliorer les performances
// Chaque route sera dans un chunk séparé et chargée à la demande
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
const Skills = () => import(/* webpackChunkName: "skills" */ '@/views/Skills.vue')
const Projects = () => import(/* webpackChunkName: "projects" */ '@/views/Projects.vue')
const Contact = () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Accueil | Portfolio - Développeur Web Freelance',
      description: 'Portfolio de développeur web freelance avec 3 ans d\'expérience. Spécialisé en Vue.js, SEO et développement web moderne.',
    },
  },
  {
    path: '/competences',
    name: 'Skills',
    component: Skills,
    meta: {
      title: 'Compétences | Portfolio - Développeur Web',
      description: 'Mes compétences techniques : Vue.js, JavaScript, SEO, Google Ads, développement web moderne et plus encore.',
    },
  },
  {
    path: '/projets',
    name: 'Projects',
    component: Projects,
    meta: {
      title: 'Projets | Portfolio - Réalisations Web',
      description: 'Découvrez mes projets web : applications Vue.js, sites optimisés SEO, et solutions digitales innovantes.',
    },
  },
  {
    path: '/a-propos',
    name: 'About',
    component: About,
    meta: {
      title: 'À propos | Portfolio - Mon Parcours',
      description: 'Mon parcours professionnel : 3 ans d\'expérience en entreprise, Master en développement, freelance passionné.',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact | Portfolio - Travaillons Ensemble',
      description: 'Contactez-moi pour votre projet web. Développeur freelance disponible pour vos besoins en Vue.js et SEO.',
    },
  },
]

const router = createRouter({
  // Utilise Hash History pour compatibilité OVH sans .htaccess
  // Pour des URLs propres (sans #), utilisez createWebHistory() + .htaccess
  history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Gestion des meta tags pour le SEO
router.beforeEach((to, from, next) => {
  // Mise à jour du titre de la page
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Mise à jour de la meta description
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }
  
  next()
})

export default router 