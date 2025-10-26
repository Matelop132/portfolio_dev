<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-display font-bold text-white mb-6">
          Prendre <span class="text-gradient-space">Rendez-vous</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Réservez un créneau pour discuter de votre projet. Je suis disponible du lundi au vendredi.
        </p>
      </div>

      <!-- Message de confirmation - Style spatial -->
      <div v-if="showConfirmation" class="mb-8 max-w-3xl mx-auto glass-card animate-fade-in relative overflow-hidden">
        <!-- Bordure néon success -->
        <div class="absolute inset-0 border-2 border-space-cyan rounded-2xl glow-cyan animate-pulse"></div>
        
        <div class="relative flex items-center justify-between p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-space-cyan/20 flex items-center justify-center mr-4 glow-cyan">
              <svg class="w-6 h-6 text-space-cyan" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="font-display font-bold text-white text-lg mb-1">✨ Rendez-vous confirmé !</p>
              <p class="text-sm text-gray-300">Vous recevrez un email de confirmation prochainement.</p>
            </div>
          </div>
          <button @click="showConfirmation = false" class="text-space-cyan hover:text-space-magenta transition-colors p-2 rounded-lg hover:bg-space-cyan/10">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <!-- Calendrier - Style futuriste/code -->
        <div class="lg:col-span-2 glass-card relative overflow-hidden calendar-futuristic">
          <!-- Effet de grille de fond -->
          <div class="calendar-grid-bg"></div>
          
          <!-- Lignes de code en arrière-plan -->
          <div class="code-background">
            <div class="code-line">const selectedDate = useState(null);</div>
            <div class="code-line">function selectDate(day) {</div>
            <div class="code-line">  if (!day.isPast) return day;</div>
            <div class="code-line">}</div>
          </div>
          
          <!-- Scanner holographique animé -->
          <div class="hologram-scanner"></div>
          
          <!-- Bordure circuit électronique animée -->
          <div class="circuit-border"></div>
          
          <div class="p-8 relative z-10">
            <div class="mb-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-display font-bold text-white flex items-center relative">
                  <span class="terminal-prompt mr-3">{'>'}_</span>
                  <span class="text-gradient-space typing-effect">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
                  <span class="blinking-cursor">|</span>
                </h2>
                <div class="flex gap-2">
                  <button 
                    @click="previousMonth"
                    class="p-3 rounded-xl bg-space-navy/50 hover:bg-space-purple/30 border border-space-purple/30 hover:border-space-cyan text-space-cyan transition-all duration-300 hover:glow-cyan hover:scale-110"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button 
                    @click="nextMonth"
                    class="p-3 rounded-xl bg-space-navy/50 hover:bg-space-purple/30 border border-space-purple/30 hover:border-space-cyan text-space-cyan transition-all duration-300 hover:glow-cyan hover:scale-110"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Jours de la semaine -->
              <div class="grid grid-cols-7 gap-2 mb-4">
                <div v-for="day in daysOfWeek" :key="day" class="text-center text-sm font-bold py-2 text-space-cyan">
                  {{ day }}
                </div>
              </div>

              <!-- Grille du calendrier - Style spatial -->
              <div class="grid grid-cols-7 gap-2">
                <button
                  v-for="(day, index) in calendarDays"
                  :key="index"
                  @click="selectDate(day)"
                  :disabled="!day.isCurrentMonth || day.isPast"
                  :class="[
                    // Classes de base communes
                    'p-4 rounded-xl text-center font-semibold',
                    'transition-all duration-300',
                    
                    // Date sélectionnée - Style néon
                    day.isSelected ? [
                      'bg-gradient-to-br from-space-purple to-space-magenta',
                      'text-white',
                      'font-bold',
                      'shadow-lg glow-magenta',
                      'scale-110',
                      'cursor-pointer',
                      'border-2 border-space-cyan',
                      'animate-pulse'
                    ] : [],
                    
                    // Dates disponibles (cliquables)
                    !day.isSelected && day.isCurrentMonth && !day.isPast ? [
                      'bg-space-navy/30',
                      'text-white',
                      'font-medium',
                      'cursor-pointer',
                      'border border-space-purple/30',
                      'hover:bg-space-purple/40',
                      'hover:border-space-cyan',
                      'hover:text-space-cyan',
                      'hover:glow-cyan',
                      'hover:scale-105',
                      day.isToday ? 'ring-2 ring-space-cyan glow-cyan' : ''
                    ] : [],
                    
                    // Dates passées du mois courant
                    !day.isSelected && day.isCurrentMonth && day.isPast ? [
                      'bg-space-darker/50',
                      'text-gray-600',
                      'font-medium',
                      'cursor-not-allowed',
                      'opacity-40',
                      'border border-transparent'
                    ] : [],
                    
                    // Dates des autres mois
                    !day.isSelected && !day.isCurrentMonth ? [
                      'bg-transparent',
                      'text-gray-700',
                      'cursor-not-allowed',
                      'opacity-20',
                      'border border-transparent'
                    ] : []
                  ]"
                >
                  {{ day.date }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulaire de confirmation - Style spatial -->
        <div class="glass-card relative overflow-hidden">
          <!-- Bordure néon animée -->
          <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-space-cyan to-transparent glow-cyan"></div>
          
          <div class="p-8">
            <h3 class="text-2xl font-display font-bold text-white mb-8 flex items-center">
              <span class="text-3xl mr-3">✍️</span>
              <span class="text-gradient-space">Vos informations</span>
            </h3>

            <!-- Récapitulatif du rendez-vous -->
            <div v-if="selectedDate" class="mb-6 p-4 bg-gradient-to-r from-space-purple/20 to-space-magenta/20 rounded-xl border border-space-cyan/50 glow-cyan animate-float">
              <p class="text-sm font-semibold mb-2 text-space-cyan">📅 Date sélectionnée :</p>
              <p class="text-base font-bold text-white">{{ formatDate(selectedDate) }}</p>
            </div>

            <form @submit.prevent="confirmAppointment" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-semibold mb-2 text-space-cyan">
                  👤 Nom complet *
                </label>
                <input
                  v-model="appointmentForm.name"
                  type="text"
                  id="name"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-space-navy/50 border border-space-purple/30 text-white placeholder-gray-500 focus:border-space-cyan focus:ring-2 focus:ring-space-cyan/50 transition-all duration-300"
                  placeholder="Votre nom"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-semibold mb-2 text-space-cyan">
                  ✉️ Email *
                </label>
                <input
                  v-model="appointmentForm.email"
                  type="email"
                  id="email"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-space-navy/50 border border-space-purple/30 text-white placeholder-gray-500 focus:border-space-cyan focus:ring-2 focus:ring-space-cyan/50 transition-all duration-300"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-semibold mb-2 text-space-cyan">
                  📱 Téléphone
                </label>
                <input
                  v-model="appointmentForm.phone"
                  type="tel"
                  id="phone"
                  class="w-full px-4 py-3 rounded-xl bg-space-navy/50 border border-space-purple/30 text-white placeholder-gray-500 focus:border-space-cyan focus:ring-2 focus:ring-space-cyan/50 transition-all duration-300"
                  placeholder="06 12 34 56 78"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-semibold mb-2 text-space-cyan">
                  💬 Message *
                </label>
                <textarea
                  v-model="appointmentForm.message"
                  id="message"
                  rows="4"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-space-navy/50 border border-space-purple/30 text-white placeholder-gray-500 focus:border-space-cyan focus:ring-2 focus:ring-space-cyan/50 transition-all duration-300 resize-none"
                  placeholder="Décrivez brièvement votre projet..."
                ></textarea>
              </div>

              <!-- Message d'aide -->
              <div v-if="!selectedDate" class="bg-space-purple/20 border border-space-magenta/50 rounded-xl p-4 animate-pulse">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-space-magenta mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <p class="text-sm text-gray-300">
                    <span class="font-bold text-space-magenta">⚠️ Sélectionnez une date</span> dans le calendrier pour continuer
                  </p>
                </div>
              </div>
              
              <button
                type="submit"
                :disabled="!selectedDate || isSubmitting"
                :class="[
                  'w-full py-4 px-6 rounded-xl font-display font-bold text-lg transition-all duration-300 relative overflow-hidden',
                  !selectedDate || isSubmitting
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                    : 'btn-space comet-trail hover:scale-105 glow-magenta'
                ]"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center text-white">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
                <span v-else-if="!selectedDate" class="text-white">
                  Sélectionnez une date
                </span>
                <span v-else class="flex items-center justify-center text-white">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Envoyer la demande
                  <span class="ml-2 text-xl">🚀</span>
                </span>
              </button>
            </form>

            <!-- Info contact - Style spatial -->
            <div class="mt-8 pt-8 border-t border-space-purple/30">
              <div class="flex items-start p-4 bg-space-navy/30 rounded-xl border border-space-cyan/30 hover:border-space-cyan hover:glow-cyan transition-all duration-300">
                <svg class="w-6 h-6 text-space-cyan mr-3 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                </svg>
                <div>
                  <p class="text-sm font-semibold mb-1 text-space-cyan">💌 Contact direct :</p>
                  <a href="mailto:mateolp.developer@gmail.com" class="text-sm hover:underline font-bold transition-colors text-white hover:text-space-magenta">
                    mateolp.developer@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import appointmentService from '@/services/appointmentService'

export default {
  name: 'Contact',
  setup() {
    const currentDate = ref(new Date())
    const currentMonth = ref(new Date().getMonth())
    const currentYear = ref(new Date().getFullYear())
    const selectedDate = ref(null)
    const isSubmitting = ref(false)
    const showConfirmation = ref(false)
    const errorMessage = ref(null)

    const appointmentForm = ref({
      name: '',
      email: '',
      phone: '',
      message: ''
    })

    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ]

    const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

    /**
     * Formate une date pour l'API (format DD/MM/YYYY)
     */
    const formatDateForApi = (date) => {
      if (!date) return ''
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }

    const calendarDays = computed(() => {
      const firstDay = new Date(currentYear.value, currentMonth.value, 1)
      const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
      const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
      const days = []

      // Jours du mois précédent
      const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push({
          date: prevMonthLastDay - i,
          isCurrentMonth: false,
          isPast: true,
          isSelected: false,
          isToday: false
        })
      }

      // Jours du mois actuel
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayDate = new Date(currentYear.value, currentMonth.value, i)
        dayDate.setHours(0, 0, 0, 0)
        
        const isPast = dayDate < today
        const dayOfWeek = dayDate.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        days.push({
          date: i,
          isCurrentMonth: true,
          isPast: isPast || isWeekend,
          isSelected: selectedDate.value?.getDate() === i && 
                     selectedDate.value?.getMonth() === currentMonth.value &&
                     selectedDate.value?.getFullYear() === currentYear.value,
          isToday: dayDate.getTime() === today.getTime(),
          fullDate: dayDate
        })
      }

      // Jours du mois suivant
      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: i,
          isCurrentMonth: false,
          isPast: true,
          isSelected: false,
          isToday: false
        })
      }

      return days
    })

    const previousMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
      } else {
        currentMonth.value--
      }
      selectedDate.value = null
    }

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
      } else {
        currentMonth.value++
      }
      selectedDate.value = null
    }

    const selectDate = (day) => {
      if (!day.isCurrentMonth || day.isPast) return
      selectedDate.value = day.fullDate
    }

    const formatDate = (date) => {
      if (!date) return ''
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('fr-FR', options)
    }

    const confirmAppointment = async () => {
      if (!selectedDate.value) {
        alert('Veuillez sélectionner une date')
        return
      }

      isSubmitting.value = true
      errorMessage.value = null

      try {
        // Préparer les données de la demande de rendez-vous
        const appointmentData = {
          date: formatDateForApi(selectedDate.value),
          name: appointmentForm.value.name.trim(),
          email: appointmentForm.value.email.trim(),
          phone: appointmentForm.value.phone?.trim() || '',
          message: appointmentForm.value.message.trim()
        }

        console.log('📤 Envoi de la demande de rendez-vous:', appointmentData)

        // Envoyer la demande à l'API Google Sheets
        const result = await appointmentService.createReservation(appointmentData)

        console.log('✅ Demande envoyée:', result)

        // Afficher la confirmation
        showConfirmation.value = true

        // Réinitialiser le formulaire
        appointmentForm.value = {
          name: '',
          email: '',
          phone: '',
          message: ''
        }
        selectedDate.value = null

        // Masquer la confirmation après 5 secondes
        setTimeout(() => {
          showConfirmation.value = false
        }, 5000)

      } catch (error) {
        console.error('❌ Erreur lors de l\'envoi:', error)
        errorMessage.value = error.message || 'Une erreur est survenue lors de l\'envoi'
        
        // Afficher l'erreur dans une alerte
        alert(errorMessage.value + '\n\nVeuillez vérifier vos informations et réessayer.')
        
        // Ne pas réinitialiser le formulaire en cas d'erreur
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      currentMonth,
      currentYear,
      selectedDate,
      appointmentForm,
      isSubmitting,
      showConfirmation,
      errorMessage,
      monthNames,
      daysOfWeek,
      calendarDays,
      previousMonth,
      nextMonth,
      selectDate,
      formatDate,
      confirmAppointment
    }
  }
}
</script>

<style scoped>
/* ============================================ */
/* CALENDRIER FUTURISTE / CODE */
/* ============================================ */

.calendar-futuristic {
  position: relative;
  border: 1px solid rgba(138, 43, 226, 0.3);
}

/* Grille de fond façon terminal/code */
.calendar-grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
  pointer-events: none;
  z-index: 1;
}

/* Lignes de code en arrière-plan */
.code-background {
  position: absolute;
  top: 20px;
  right: 20px;
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: rgba(0, 255, 255, 0.15);
  line-height: 1.6;
  pointer-events: none;
  z-index: 1;
  transform: rotate(-2deg);
}

.code-line {
  white-space: pre;
  animation: code-flicker 3s ease-in-out infinite;
}

.code-line:nth-child(2) { animation-delay: 0.5s; }
.code-line:nth-child(3) { animation-delay: 1s; }
.code-line:nth-child(4) { animation-delay: 1.5s; }

@keyframes code-flicker {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.25; }
}

/* Scanner holographique */
.hologram-scanner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(0, 255, 255, 0.8), 
    transparent
  );
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
  animation: scan 4s linear infinite;
  pointer-events: none;
  z-index: 5;
}

@keyframes scan {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* Bordure circuit électronique */
.circuit-border {
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-image: linear-gradient(
    45deg,
    #8A2BE2,
    #FF00CC,
    #00FFFF,
    #8A2BE2
  ) 1;
  animation: circuit-flow 3s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes circuit-flow {
  0% {
    filter: hue-rotate(0deg) brightness(1);
  }
  50% {
    filter: hue-rotate(180deg) brightness(1.2);
  }
  100% {
    filter: hue-rotate(360deg) brightness(1);
  }
}

/* Terminal prompt */
.terminal-prompt {
  font-family: 'Courier New', monospace;
  color: #00FFFF;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  animation: prompt-blink 1.5s ease-in-out infinite;
}

@keyframes prompt-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* Effet typing */
.typing-effect {
  position: relative;
  display: inline-block;
}

/* Curseur clignotant */
.blinking-cursor {
  font-family: 'Courier New', monospace;
  color: #00FFFF;
  animation: blink 0.8s step-end infinite;
  margin-left: 4px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Animation d'apparition fade-in */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .code-background {
    display: none; /* Masquer le code sur mobile */
  }
  
  .hologram-scanner {
    animation-duration: 6s; /* Ralentir sur mobile */
  }
  
  .terminal-prompt {
    font-size: 1rem;
  }
}
</style> 