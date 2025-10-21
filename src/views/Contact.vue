<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Prendre rendez-vous
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Réservez un créneau pour discuter de votre projet. Je suis disponible du lundi au vendredi.
        </p>
      </div>

      <!-- Message de confirmation -->
      <div v-if="showConfirmation" class="mb-8 max-w-3xl mx-auto bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-6 py-4 rounded-lg relative">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <div>
              <p class="font-bold">Rendez-vous confirmé !</p>
              <p class="text-sm">Vous recevrez un email de confirmation prochainement.</p>
            </div>
          </div>
          <button @click="showConfirmation = false" class="text-green-700 dark:text-green-200 hover:text-green-900 dark:hover:text-green-100">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <!-- Calendrier -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ monthNames[currentMonth] }} {{ currentYear }}
              </h2>
              <div class="flex gap-2">
                <button 
                  @click="previousMonth"
                  class="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button 
                  @click="nextMonth"
                  class="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Jours de la semaine -->
            <div class="grid grid-cols-7 gap-2 mb-2">
              <div v-for="day in daysOfWeek" :key="day" class="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
                {{ day }}
              </div>
            </div>

            <!-- Grille du calendrier -->
            <div class="grid grid-cols-7 gap-2">
              <button
                v-for="(day, index) in calendarDays"
                :key="index"
                @click="selectDate(day)"
                :disabled="!day.isCurrentMonth || day.isPast"
                :class="[
                  'p-4 rounded-lg text-center transition-all',
                  day.isCurrentMonth && !day.isPast
                    ? 'hover:bg-primary-100 dark:hover:bg-primary-900/30 cursor-pointer'
                    : 'cursor-not-allowed opacity-40',
                  day.isSelected
                    ? 'bg-primary-600 text-white font-bold shadow-lg'
                    : day.isCurrentMonth
                    ? 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'bg-transparent text-gray-400 dark:text-gray-600',
                  day.isToday && !day.isSelected
                    ? 'ring-2 ring-primary-400 dark:ring-primary-500'
                    : ''
                ]"
              >
                {{ day.date }}
              </button>
            </div>
          </div>

          <!-- Créneaux horaires -->
          <div v-if="selectedDate" class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Créneaux disponibles - {{ formatDate(selectedDate) }}
            </h3>
            <div v-if="isLoading" class="text-center py-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p class="mt-2 text-gray-600 dark:text-gray-400">Chargement des créneaux...</p>
            </div>
            <div v-else-if="timeSlots.length === 0" class="text-center py-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p class="text-gray-600 dark:text-gray-400">Aucun créneau disponible pour cette date.</p>
            </div>
            <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-3">
              <button
                v-for="slot in timeSlots"
                :key="typeof slot === 'string' ? slot : slot.id"
                @click="selectTimeSlot(slot)"
                :disabled="typeof slot === 'object' && !slot.available"
                :class="[
                  'py-3 px-4 rounded-md font-medium transition-all',
                  (typeof slot === 'string' && selectedTimeSlot === slot) || 
                  (typeof slot === 'object' && selectedTimeSlot === slot.time)
                    ? 'bg-primary-600 text-white shadow-md'
                    : typeof slot === 'object' && !slot.available
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                {{ typeof slot === 'string' ? slot : slot.time }}
              </button>
            </div>
          </div>
        </div>

        <!-- Formulaire de confirmation -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Vos informations
          </h3>

          <!-- Récapitulatif du rendez-vous -->
          <div v-if="selectedDate && selectedTimeSlot" class="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
            <p class="text-sm font-semibold text-primary-900 dark:text-primary-100 mb-2">📅 Rendez-vous sélectionné :</p>
            <p class="text-sm text-primary-800 dark:text-primary-200">{{ formatDate(selectedDate) }}</p>
            <p class="text-lg font-bold text-primary-900 dark:text-primary-100">{{ selectedTimeSlot }}</p>
          </div>

          <form @submit.prevent="confirmAppointment" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom complet *
              </label>
              <input
                v-model="appointmentForm.name"
                type="text"
                id="name"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Votre nom"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                v-model="appointmentForm.email"
                type="email"
                id="email"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Téléphone
              </label>
              <input
                v-model="appointmentForm.phone"
                type="tel"
                id="phone"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="06 12 34 56 78"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                v-model="appointmentForm.message"
                id="message"
                rows="3"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Décrivez brièvement votre projet..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              :disabled="!selectedDate || !selectedTimeSlot || isSubmitting"
              class="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {{ isSubmitting ? 'Confirmation...' : 'Confirmer le rendez-vous' }}
            </button>
          </form>

          <!-- Info contact -->
          <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
              </svg>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Contact direct :</p>
                <a href="mailto:mateolp.developer@gmail.com" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  mateolp.developer@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import appointmentService from '@/services/appointmentService'

export default {
  name: 'Contact',
  setup() {
    const currentDate = ref(new Date())
    const currentMonth = ref(new Date().getMonth())
    const currentYear = ref(new Date().getFullYear())
    const selectedDate = ref(null)
    const selectedTimeSlot = ref(null)
    const selectedSlotId = ref(null)
    const isSubmitting = ref(false)
    const showConfirmation = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref(null)

    // Données des créneaux depuis l'API
    const availableSlots = ref([])
    const slotsByDate = ref({})

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

    // Liste des heures possibles (pour affichage par défaut si API indisponible)
    const defaultTimeSlots = [
      '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '13:30', '14:00',
      '14:30', '15:00', '15:30', '16:00',
      '16:30', '17:00', '17:30', '18:00'
    ]

    // Créneaux horaires pour la date sélectionnée
    const timeSlots = computed(() => {
      if (!selectedDate.value) return []
      
      const dateStr = formatDateForApi(selectedDate.value)
      const slotsForDate = slotsByDate.value[dateStr] || []
      
      // Si aucun créneau depuis l'API, utiliser les créneaux par défaut
      if (slotsForDate.length === 0) {
        return defaultTimeSlots.map(time => ({
          time,
          id: `${dateStr.replace(/\//g, '')}_${time.replace(':', '')}`,
          available: false // Marqué comme indisponible par défaut
        }))
      }
      
      return slotsForDate
    })

    /**
     * Charge les créneaux disponibles depuis l'API Google Sheets
     */
    const loadAvailableSlots = async () => {
      try {
        isLoading.value = true
        errorMessage.value = null
        
        console.log('📡 Chargement des créneaux disponibles...')
        const slots = await appointmentService.getAvailableSlots()
        
        availableSlots.value = slots
        slotsByDate.value = organizeSlotsByDate(slots)
        
        console.log(`✅ ${slots.length} créneaux chargés`)
        
      } catch (error) {
        console.error('❌ Erreur lors du chargement des créneaux:', error)
        errorMessage.value = error.message || 'Impossible de charger les créneaux disponibles'
        
        // En cas d'erreur, on peut continuer avec le calendrier local
        // mais les créneaux ne seront pas disponibles
      } finally {
        isLoading.value = false
      }
    }

    /**
     * Organise les créneaux par date
     */
    const organizeSlotsByDate = (slots) => {
      const organized = {}
      
      slots.forEach(slot => {
        if (!organized[slot.date]) {
          organized[slot.date] = []
        }
        organized[slot.date].push({
          time: slot.time,
          id: slot.id,
          available: true
        })
      })
      
      // Trier par heure
      Object.keys(organized).forEach(date => {
        organized[date].sort((a, b) => a.time.localeCompare(b.time))
      })
      
      return organized
    }

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
      selectedTimeSlot.value = null
    }

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
      } else {
        currentMonth.value++
      }
      selectedDate.value = null
      selectedTimeSlot.value = null
    }

    const selectDate = (day) => {
      if (!day.isCurrentMonth || day.isPast) return
      selectedDate.value = day.fullDate
      selectedTimeSlot.value = null
      selectedSlotId.value = null
    }

    const selectTimeSlot = (slot) => {
      // slot peut être une string (ancien format) ou un objet (nouveau format)
      if (typeof slot === 'string') {
        selectedTimeSlot.value = slot
        // Générer l'ID du slot
        const dateStr = formatDateForApi(selectedDate.value).replace(/\//g, '')
        selectedSlotId.value = `${dateStr}_${slot.replace(':', '')}`
      } else {
        selectedTimeSlot.value = slot.time
        selectedSlotId.value = slot.id
      }
    }

    const formatDate = (date) => {
      if (!date) return ''
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('fr-FR', options)
    }

    const confirmAppointment = async () => {
      if (!selectedDate.value || !selectedTimeSlot.value) {
        alert('Veuillez sélectionner une date et un créneau horaire')
        return
      }

      if (!selectedSlotId.value) {
        alert('Erreur : ID du créneau manquant')
        return
      }

      isSubmitting.value = true
      errorMessage.value = null

      try {
        // Préparer les données de la réservation
        const reservationData = {
          slotId: selectedSlotId.value,
          name: appointmentForm.value.name.trim(),
          email: appointmentForm.value.email.trim(),
          phone: appointmentForm.value.phone?.trim() || '',
          message: appointmentForm.value.message.trim()
        }

        console.log('📤 Envoi de la réservation:', reservationData)

        // Envoyer la réservation à l'API Google Sheets
        const result = await appointmentService.createReservation(reservationData)

        console.log('✅ Réservation confirmée:', result)

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
        selectedTimeSlot.value = null
        selectedSlotId.value = null

        // Recharger les créneaux disponibles
        await loadAvailableSlots()

        // Masquer la confirmation après 5 secondes
        setTimeout(() => {
          showConfirmation.value = false
        }, 5000)

      } catch (error) {
        console.error('❌ Erreur lors de la confirmation:', error)
        errorMessage.value = error.message || 'Une erreur est survenue lors de la réservation'
        
        // Afficher l'erreur dans une alerte
        alert(errorMessage.value + '\n\nVeuillez vérifier vos informations et réessayer.')
        
        // Ne pas réinitialiser le formulaire en cas d'erreur
      } finally {
        isSubmitting.value = false
      }
    }

    // Charger les créneaux au montage du composant
    onMounted(() => {
      loadAvailableSlots()
    })

    return {
      currentMonth,
      currentYear,
      selectedDate,
      selectedTimeSlot,
      appointmentForm,
      isSubmitting,
      isLoading,
      showConfirmation,
      errorMessage,
      monthNames,
      daysOfWeek,
      timeSlots,
      calendarDays,
      previousMonth,
      nextMonth,
      selectDate,
      selectTimeSlot,
      formatDate,
      confirmAppointment,
      loadAvailableSlots
    }
  }
}
</script> 