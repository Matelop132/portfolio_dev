/**
 * Configuration de l'API Google Sheets
 * 
 * ⚠️ IMPORTANT : Remplacez l'URL par celle de votre API Apps Script déployée
 */

export const API_CONFIG = {
  // URL de votre Google Apps Script déployé
  // Format : https://script.google.com/macros/s/VOTRE_ID_UNIQUE/exec
  GOOGLE_SCRIPT_URL: import.meta.env.VITE_API_URL || 'https://script.google.com/macros/s/VOTRE_ID/exec',
  
  // Configuration des requêtes
  TIMEOUT: 10000, // 10 secondes
  RETRY_ATTEMPTS: 3, // Nombre de tentatives en cas d'échec
  
  // Endpoints
  ENDPOINTS: {
    GET_SLOTS: '?action=getSlots',
    CREATE_RESERVATION: '' // POST avec action dans le body
  },
  
  // Mode développement
  isDevelopment: import.meta.env.MODE === 'development',
  
  // Messages d'erreur
  ERROR_MESSAGES: {
    NETWORK: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
    SERVER: 'Le serveur ne répond pas. Veuillez réessayer plus tard.',
    SLOT_UNAVAILABLE: 'Ce créneau n\'est plus disponible.',
    VALIDATION: 'Veuillez vérifier les informations saisies.',
    UNKNOWN: 'Une erreur inattendue s\'est produite.'
  }
};

/**
 * Pour utiliser cette configuration en production :
 * 
 * 1. Créez un fichier .env à la racine du projet :
 *    VITE_API_URL=https://script.google.com/macros/s/VOTRE_ID/exec
 * 
 * 2. Ou modifiez directement la valeur de GOOGLE_SCRIPT_URL ci-dessus
 * 
 * 3. Ne committez JAMAIS le fichier .env avec vos vraies URL !
 */

