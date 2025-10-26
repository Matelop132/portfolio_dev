/**
 * SYSTÈME DE PRISE DE RENDEZ-VOUS
 * Google Apps Script pour gérer les réservations via Google Sheets
 * 
 * @author Assistant IA
 * @version 1.0.0
 */

// ==================== CONFIGURATION ====================
const CONFIG = {
  // Noms des feuilles dans Google Sheets
  SHEET_DISPONIBILITES: 'Disponibilités',
  SHEET_RESERVATIONS: 'Réservations',
  
  // Configuration des emails
  EMAIL_FROM: 'mateolp.developer@gmail.com', // Changez par votre email
  EMAIL_SUBJECT_CLIENT: '✅ Confirmation de votre rendez-vous',
  EMAIL_SUBJECT_ADMIN: '📅 Nouvelle réservation',
  
  // Fuseau horaire
  TIMEZONE: 'Europe/Paris',
  
  // Options de sécurité
  ALLOWED_ORIGINS: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://votre-domaine.com' // Ajoutez votre domaine en production
  ]
};

// ==================== UTILITAIRES ====================

/**
 * Retourne une réponse JSON
 */
function jsonResponse(data, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Obtient la feuille par nom
 */
function getSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  // Créer la feuille si elle n'existe pas
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    initializeSheet(sheet, sheetName);
  }
  
  return sheet;
}

/**
 * Initialise une feuille avec les en-têtes appropriés
 */
function initializeSheet(sheet, sheetName) {
  if (sheetName === CONFIG.SHEET_DISPONIBILITES) {
    sheet.appendRow([
      'ID',
      'Date',
      'Heure',
      'Statut',
      'Réservé par',
      'Email',
      'Date de réservation'
    ]);
    
    // Formater les en-têtes
    const headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    
  } else if (sheetName === CONFIG.SHEET_RESERVATIONS) {
    sheet.appendRow([
      'ID',
      'Nom',
      'Email',
      'Téléphone',
      'Date RDV',
      'Heure RDV',
      'Message',
      'Date de création',
      'Statut',
      'Notes'
    ]);
    
    // Formater les en-têtes
    const headerRange = sheet.getRange(1, 1, 1, 10);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#0f9d58');
    headerRange.setFontColor('#ffffff');
  }
}

// ==================== GESTION DES DISPONIBILITÉS ====================

/**
 * Récupère tous les créneaux disponibles
 */
function getAvailableSlots() {
  try {
    const sheet = getSheet(CONFIG.SHEET_DISPONIBILITES);
    const data = sheet.getDataRange().getValues();
    
    // Ignorer l'en-tête
    const slots = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Colonnes : ID | Date | Heure | Statut | Réservé par | Email | Date de réservation
      if (row[3] === 'disponible' || row[3] === '') {
        slots.push({
          id: row[0] || `slot_${i}`,
          date: formatDate(row[1]),
          time: row[2],
          status: 'disponible'
        });
      }
    }
    
    return slots;
    
  } catch (error) {
    Logger.log('Erreur getAvailableSlots: ' + error.toString());
    throw new Error('Erreur lors de la récupération des créneaux');
  }
}

/**
 * Vérifie si un créneau est disponible
 */
function isSlotAvailable(slotId) {
  const sheet = getSheet(CONFIG.SHEET_DISPONIBILITES);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === slotId) {
      return data[i][3] === 'disponible' || data[i][3] === '';
    }
  }
  
  return false;
}

/**
 * Marque un créneau comme réservé
 */
function markSlotAsBooked(slotId, name, email) {
  const sheet = getSheet(CONFIG.SHEET_DISPONIBILITES);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === slotId) {
      const rowNum = i + 1;
      sheet.getRange(rowNum, 4).setValue('réservé');
      sheet.getRange(rowNum, 5).setValue(name);
      sheet.getRange(rowNum, 6).setValue(email);
      sheet.getRange(rowNum, 7).setValue(new Date());
      
      // Colorer la ligne en jaune pour indiquer la réservation
      sheet.getRange(rowNum, 1, 1, 7).setBackground('#fff3cd');
      
      return true;
    }
  }
  
  return false;
}

/**
 * Génère des créneaux pour les 30 prochains jours (fonction d'initialisation)
 */
function generateSlots() {
  const sheet = getSheet(CONFIG.SHEET_DISPONIBILITES);
  
  // Vérifier si des créneaux existent déjà
  if (sheet.getLastRow() > 1) {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      'Attention',
      'Des créneaux existent déjà. Voulez-vous les remplacer ?',
      ui.ButtonSet.YES_NO
    );
    
    if (response === ui.Button.NO) {
      return;
    }
    
    // Supprimer les anciennes données
    if (sheet.getLastRow() > 1) {
      sheet.deleteRows(2, sheet.getLastRow() - 1);
    }
  }
  
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:30', '14:00',
    '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00'
  ];
  
  const today = new Date();
  let rowsToAdd = [];
  
  // Générer des créneaux pour les 30 prochains jours
  for (let day = 0; day < 30; day++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + day);
    
    // Ignorer les week-ends (0 = dimanche, 6 = samedi)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue;
    }
    
    // Créer un créneau pour chaque heure
    timeSlots.forEach(time => {
      const slotId = `${formatDateForId(currentDate)}_${time.replace(':', '')}`;
      rowsToAdd.push([
        slotId,
        currentDate,
        time,
        'disponible',
        '',
        '',
        ''
      ]);
    });
  }
  
  // Ajouter tous les créneaux en une seule fois (plus rapide)
  if (rowsToAdd.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rowsToAdd.length, 7).setValues(rowsToAdd);
  }
  
  Logger.log(`${rowsToAdd.length} créneaux générés avec succès`);
  SpreadsheetApp.getUi().alert(`✅ ${rowsToAdd.length} créneaux générés avec succès !`);
}

// ==================== GESTION DES RÉSERVATIONS ====================

/**
 * Crée une nouvelle demande de rendez-vous (sans créneau horaire prédéfini)
 */
function createAppointment(data) {
  // Validation des données
  if (!data.date || !data.name || !data.email || !data.message) {
    throw new Error('Données manquantes (date, name, email, message requis)');
  }
  
  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Format d\'email invalide');
  }
  
  // Créer l'ID de la demande
  const appointmentId = `APT_${Date.now()}`;
  
  // Ajouter la demande dans la feuille Réservations
  const sheet = getSheet(CONFIG.SHEET_RESERVATIONS);
  sheet.appendRow([
    appointmentId,
    data.name,
    data.email,
    data.phone || '',
    data.date,
    'À définir', // Heure à définir plus tard
    data.message,
    new Date(),
    'En attente',
    'Demande de rendez-vous - date souhaitée : ' + data.date
  ]);
  
  // Colorer la ligne en orange pour indiquer qu'elle est en attente
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, 10).setBackground('#ffe0b2');
  
  // Envoyer les emails
  try {
    sendAppointmentRequestEmail(data, appointmentId);
    sendAdminAppointmentNotification(data, appointmentId);
  } catch (emailError) {
    Logger.log('Erreur envoi email: ' + emailError.toString());
    // Ne pas bloquer la demande si l'email échoue
  }
  
  return {
    success: true,
    appointmentId: appointmentId,
    message: 'Demande de rendez-vous envoyée avec succès',
    details: {
      name: data.name,
      date: data.date
    }
  };
}

/**
 * Crée une nouvelle réservation (ancienne méthode avec slotId)
 */
function createReservation(data) {
  // Validation des données
  if (!data.slotId || !data.name || !data.email || !data.message) {
    throw new Error('Données manquantes (slotId, name, email, message requis)');
  }
  
  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Format d\'email invalide');
  }
  
  // Vérifier que le créneau est disponible
  if (!isSlotAvailable(data.slotId)) {
    throw new Error('Ce créneau n\'est plus disponible');
  }
  
  // Extraire date et heure du slotId
  const slotParts = data.slotId.split('_');
  const dateStr = slotParts[0];
  const timeStr = slotParts[1];
  
  // Formater la date et l'heure
  const date = parseDateFromId(dateStr);
  const time = formatTime(timeStr);
  
  // Créer l'ID de réservation
  const reservationId = `RES_${Date.now()}`;
  
  // Ajouter la réservation
  const sheet = getSheet(CONFIG.SHEET_RESERVATIONS);
  sheet.appendRow([
    reservationId,
    data.name,
    data.email,
    data.phone || '',
    date,
    time,
    data.message,
    new Date(),
    'Confirmé',
    ''
  ]);
  
  // Marquer le créneau comme réservé
  const marked = markSlotAsBooked(data.slotId, data.name, data.email);
  
  if (!marked) {
    throw new Error('Impossible de marquer le créneau comme réservé');
  }
  
  // Envoyer les emails de confirmation
  try {
    sendConfirmationEmail(data, date, time, reservationId);
    sendAdminNotification(data, date, time, reservationId);
  } catch (emailError) {
    Logger.log('Erreur envoi email: ' + emailError.toString());
    // Ne pas bloquer la réservation si l'email échoue
  }
  
  return {
    success: true,
    reservationId: reservationId,
    message: 'Réservation confirmée avec succès',
    details: {
      name: data.name,
      date: formatDate(date),
      time: time
    }
  };
}

// ==================== EMAILS ====================

/**
 * Envoie un email de confirmation au client
 */
function sendConfirmationEmail(data, date, time, reservationId) {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #4285f4; margin-bottom: 20px;">✅ Rendez-vous confirmé</h1>
        
        <p style="font-size: 16px; color: #333;">Bonjour <strong>${data.name}</strong>,</p>
        
        <p style="font-size: 16px; color: #333;">
          Votre rendez-vous a été confirmé avec succès !
        </p>
        
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1976d2; margin-top: 0;">📅 Détails du rendez-vous</h2>
          <p style="margin: 10px 0;"><strong>Date :</strong> ${formatDate(date)}</p>
          <p style="margin: 10px 0;"><strong>Heure :</strong> ${time}</p>
          <p style="margin: 10px 0;"><strong>N° de réservation :</strong> ${reservationId}</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #666;">Votre message :</h3>
          <p style="color: #555; font-style: italic;">${data.message}</p>
        </div>
        
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          Vous recevrez un rappel 24h avant le rendez-vous.
        </p>
        
        <p style="font-size: 14px; color: #666;">
          Pour toute question, répondez simplement à cet email.
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.
        </p>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: data.email,
    subject: CONFIG.EMAIL_SUBJECT_CLIENT,
    htmlBody: htmlBody
  });
}

/**
 * Envoie une notification à l'administrateur
 */
function sendAdminNotification(data, date, time, reservationId) {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0f9d58;">📅 Nouvelle réservation</h1>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>Informations client</h2>
        <p><strong>Nom :</strong> ${data.name}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone || 'Non renseigné'}</p>
      </div>
      
      <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>Détails du rendez-vous</h2>
        <p><strong>Date :</strong> ${formatDate(date)}</p>
        <p><strong>Heure :</strong> ${time}</p>
        <p><strong>ID :</strong> ${reservationId}</p>
      </div>
      
      <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px;">
        <h3>Message :</h3>
        <p>${data.message}</p>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: CONFIG.EMAIL_FROM,
    subject: CONFIG.EMAIL_SUBJECT_ADMIN,
    htmlBody: htmlBody
  });
}

/**
 * Envoie un email de confirmation pour une demande de rendez-vous
 */
function sendAppointmentRequestEmail(data, appointmentId) {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #4285f4; margin-bottom: 20px;">📨 Demande de rendez-vous reçue</h1>
        
        <p style="font-size: 16px; color: #333;">Bonjour <strong>${data.name}</strong>,</p>
        
        <p style="font-size: 16px; color: #333;">
          Nous avons bien reçu votre demande de rendez-vous.
        </p>
        
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1976d2; margin-top: 0;">📅 Votre demande</h2>
          <p style="margin: 10px 0;"><strong>Date souhaitée :</strong> ${data.date}</p>
          <p style="margin: 10px 0;"><strong>N° de demande :</strong> ${appointmentId}</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #666;">Votre message :</h3>
          <p style="color: #555; font-style: italic;">${data.message}</p>
        </div>
        
        <p style="font-size: 16px; color: #333;">
          Je reviendrai vers vous rapidement pour confirmer la disponibilité et l'horaire exact du rendez-vous.
        </p>
        
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          Pour toute question, répondez simplement à cet email.
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          Cet email a été envoyé automatiquement suite à votre demande de rendez-vous.
        </p>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: data.email,
    subject: '📨 Demande de rendez-vous reçue',
    htmlBody: htmlBody
  });
}

/**
 * Envoie une notification admin pour une demande de rendez-vous
 */
function sendAdminAppointmentNotification(data, appointmentId) {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #ff9800;">📨 Nouvelle demande de rendez-vous</h1>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>Informations client</h2>
        <p><strong>Nom :</strong> ${data.name}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone || 'Non renseigné'}</p>
      </div>
      
      <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>Détails de la demande</h2>
        <p><strong>Date souhaitée :</strong> ${data.date}</p>
        <p><strong>ID :</strong> ${appointmentId}</p>
        <p style="color: #856404;"><em>⚠️ Heure à définir - Contacter le client pour confirmer</em></p>
      </div>
      
      <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px;">
        <h3>Message du client :</h3>
        <p>${data.message}</p>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ff9800;">
        <p style="margin: 0;"><strong>Action requise :</strong> Contactez le client pour confirmer l'horaire exact du rendez-vous.</p>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: CONFIG.EMAIL_FROM,
    subject: '📨 Nouvelle demande de rendez-vous',
    htmlBody: htmlBody
  });
}

// ==================== FORMATAGE ====================

/**
 * Formate une date pour l'ID
 */
function formatDateForId(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Parse une date depuis un ID
 */
function parseDateFromId(dateStr) {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return new Date(year, parseInt(month) - 1, day);
}

/**
 * Formate une heure depuis le format ID
 */
function formatTime(timeStr) {
  // timeStr = "0900" -> "09:00"
  return timeStr.substring(0, 2) + ':' + timeStr.substring(2, 4);
}

/**
 * Formate une date pour l'affichage
 */
function formatDate(date) {
  if (typeof date === 'string') return date;
  return Utilities.formatDate(date, CONFIG.TIMEZONE, 'dd/MM/yyyy');
}

// ==================== API ENDPOINTS ====================

/**
 * Gère les requêtes GET
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'getSlots';
    
    if (action === 'getSlots') {
      const slots = getAvailableSlots();
      return jsonResponse({
        success: true,
        data: slots,
        count: slots.length
      });
    }
    
    return jsonResponse({
      success: false,
      error: 'Action non reconnue'
    }, 400);
    
  } catch (error) {
    Logger.log('Erreur doGet: ' + error.toString());
    return jsonResponse({
      success: false,
      error: error.message || 'Erreur serveur'
    }, 500);
  }
}

/**
 * Gère les requêtes POST
 */
function doPost(e) {
  try {
    // Parser les données JSON
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'createReservation';
    
    if (action === 'createAppointment') {
      const result = createAppointment(data);
      return jsonResponse(result);
    }
    
    if (action === 'createReservation') {
      const result = createReservation(data);
      return jsonResponse(result);
    }
    
    return jsonResponse({
      success: false,
      error: 'Action non reconnue'
    }, 400);
    
  } catch (error) {
    Logger.log('Erreur doPost: ' + error.toString());
    return jsonResponse({
      success: false,
      error: error.message || 'Erreur lors de la réservation'
    }, 500);
  }
}

// ==================== FONCTIONS UTILITAIRES POUR LE MENU ====================

/**
 * Crée un menu personnalisé dans Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📅 Gestion RDV')
    .addItem('Générer les créneaux', 'generateSlots')
    .addSeparator()
    .addItem('Voir les statistiques', 'showStats')
    .addToUi();
}

/**
 * Affiche les statistiques
 */
function showStats() {
  const sheetDispo = getSheet(CONFIG.SHEET_DISPONIBILITES);
  const sheetResa = getSheet(CONFIG.SHEET_RESERVATIONS);
  
  const dataDispo = sheetDispo.getDataRange().getValues();
  const dataResa = sheetResa.getDataRange().getValues();
  
  let disponibles = 0;
  let reserves = 0;
  
  for (let i = 1; i < dataDispo.length; i++) {
    if (dataDispo[i][3] === 'disponible' || dataDispo[i][3] === '') {
      disponibles++;
    } else {
      reserves++;
    }
  }
  
  const totalReservations = dataResa.length - 1;
  
  const message = `
📊 STATISTIQUES
━━━━━━━━━━━━━━━━━━━━━━
✅ Créneaux disponibles : ${disponibles}
📅 Créneaux réservés : ${reserves}
📋 Total réservations : ${totalReservations}
━━━━━━━━━━━━━━━━━━━━━━
  `;
  
  SpreadsheetApp.getUi().alert(message);
}

