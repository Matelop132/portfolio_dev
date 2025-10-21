/**
 * Service de gestion des rendez-vous
 * Interface avec l'API Google Apps Script
 */

import { API_CONFIG } from '@/config/api';

class AppointmentService {
  constructor() {
    this.baseUrl = API_CONFIG.GOOGLE_SCRIPT_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Récupère tous les créneaux disponibles depuis Google Sheets
   * @returns {Promise<Array>} Liste des créneaux disponibles
   */
  async getAvailableSlots() {
    try {
      // Ajouter un timestamp pour éviter le cache
      const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.GET_SLOTS}&t=${Date.now()}`;
      
      if (API_CONFIG.isDevelopment) {
        console.log('🔍 Récupération des créneaux depuis:', url);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la récupération des créneaux');
      }

      if (API_CONFIG.isDevelopment) {
        console.log(`✅ ${data.count} créneaux récupérés`);
      }

      return data.data || [];
      
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(API_CONFIG.ERROR_MESSAGES.TIMEOUT);
      }
      
      console.error('❌ Erreur getAvailableSlots:', error);
      throw new Error(API_CONFIG.ERROR_MESSAGES.NETWORK);
    }
  }

  /**
   * Crée une nouvelle réservation
   * @param {Object} appointmentData - Données de la réservation
   * @param {string} appointmentData.slotId - ID du créneau
   * @param {string} appointmentData.name - Nom du client
   * @param {string} appointmentData.email - Email du client
   * @param {string} appointmentData.phone - Téléphone (optionnel)
   * @param {string} appointmentData.message - Message du client
   * @returns {Promise<Object>} Résultat de la réservation
   */
  async createReservation(appointmentData) {
    try {
      // Validation des données
      this.validateReservationData(appointmentData);

      const payload = {
        action: 'createReservation',
        slotId: appointmentData.slotId,
        name: appointmentData.name,
        email: appointmentData.email,
        phone: appointmentData.phone || '',
        message: appointmentData.message
      };

      if (API_CONFIG.isDevelopment) {
        console.log('📤 Envoi de la réservation:', payload);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        // Gestion des erreurs spécifiques
        if (data.error?.includes('disponible')) {
          throw new Error(API_CONFIG.ERROR_MESSAGES.SLOT_UNAVAILABLE);
        }
        throw new Error(data.error || 'Erreur lors de la réservation');
      }

      if (API_CONFIG.isDevelopment) {
        console.log('✅ Réservation confirmée:', data);
      }

      return data;
      
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(API_CONFIG.ERROR_MESSAGES.TIMEOUT);
      }
      
      console.error('❌ Erreur createReservation:', error);
      throw error;
    }
  }

  /**
   * Valide les données de réservation
   * @param {Object} data - Données à valider
   * @throws {Error} Si les données sont invalides
   */
  validateReservationData(data) {
    if (!data.slotId) {
      throw new Error('Veuillez sélectionner un créneau horaire');
    }

    if (!data.name || data.name.trim().length < 2) {
      throw new Error('Veuillez saisir un nom valide (minimum 2 caractères)');
    }

    if (!data.email) {
      throw new Error('Veuillez saisir une adresse email');
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Format d\'email invalide');
    }

    if (!data.message || data.message.trim().length < 10) {
      throw new Error('Veuillez saisir un message (minimum 10 caractères)');
    }

    // Validation téléphone (si fourni)
    if (data.phone && data.phone.trim().length > 0) {
      const phoneRegex = /^[\d\s\+\-\(\)\.]+$/;
      if (!phoneRegex.test(data.phone)) {
        throw new Error('Format de téléphone invalide');
      }
    }
  }

  /**
   * Organise les créneaux par date
   * @param {Array} slots - Liste des créneaux
   * @returns {Object} Créneaux organisés par date
   */
  organizeSlotsByDate(slots) {
    const organized = {};
    
    slots.forEach(slot => {
      const date = slot.date;
      if (!organized[date]) {
        organized[date] = [];
      }
      organized[date].push(slot);
    });
    
    // Trier les créneaux par heure pour chaque date
    Object.keys(organized).forEach(date => {
      organized[date].sort((a, b) => a.time.localeCompare(b.time));
    });
    
    return organized;
  }

  /**
   * Filtre les créneaux pour une date spécifique
   * @param {Array} slots - Liste des créneaux
   * @param {string} dateString - Date au format DD/MM/YYYY
   * @returns {Array} Créneaux pour la date donnée
   */
  getSlotsForDate(slots, dateString) {
    return slots
      .filter(slot => slot.date === dateString)
      .sort((a, b) => a.time.localeCompare(b.time));
  }

  /**
   * Convertit un ID de slot en objet date/heure
   * @param {string} slotId - ID au format YYYYMMDD_HHMM
   * @returns {Object} { date, time }
   */
  parseSlotId(slotId) {
    try {
      const [datePart, timePart] = slotId.split('_');
      
      const year = datePart.substring(0, 4);
      const month = datePart.substring(4, 6);
      const day = datePart.substring(6, 8);
      
      const hour = timePart.substring(0, 2);
      const minute = timePart.substring(2, 4);
      
      return {
        date: `${day}/${month}/${year}`,
        time: `${hour}:${minute}`,
        dateObj: new Date(year, parseInt(month) - 1, day, hour, minute)
      };
    } catch (error) {
      console.error('Erreur parseSlotId:', error);
      return null;
    }
  }

  /**
   * Vérifie si l'API est accessible
   * @returns {Promise<boolean>}
   */
  async checkApiHealth() {
    try {
      const response = await fetch(`${this.baseUrl}?action=getSlots`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Formate une date pour l'affichage
   * @param {string} dateStr - Date au format DD/MM/YYYY
   * @returns {string} Date formatée en français
   */
  formatDateToFrench(dateStr) {
    try {
      const [day, month, year] = dateStr.split('/');
      const date = new Date(year, parseInt(month) - 1, day);
      
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      
      return date.toLocaleDateString('fr-FR', options);
    } catch {
      return dateStr;
    }
  }
}

// Export une instance unique (Singleton)
export default new AppointmentService();

