# 🚀 Guide de déploiement complet - Système de prise de rendez-vous

Ce guide détaille **étape par étape** comment configurer et déployer votre système de réservation avec Google Sheets comme backend.

---

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Configuration Google Sheets & Apps Script](#configuration-google-sheets--apps-script)
3. [Déploiement de l'API](#déploiement-de-lapi)
4. [Configuration du Front-End](#configuration-du-front-end)
5. [Tests et validation](#tests-et-validation)
6. [Sécurité et permissions](#sécurité-et-permissions)
7. [Déploiement en production](#déploiement-en-production)
8. [Dépannage](#dépannage)

---

## 1️⃣ Prérequis

### Ce dont vous avez besoin :

- ✅ Un compte Google (Gmail)
- ✅ Accès à [Google Sheets](https://sheets.google.com)
- ✅ Node.js installé (pour le front-end Vue.js)
- ✅ Un éditeur de code (VS Code, Cursor, etc.)

### Connaissances recommandées :

- Bases de JavaScript
- Utilisation de Vue.js
- Compréhension des API REST

---

## 2️⃣ Configuration Google Sheets & Apps Script

### Étape 2.1 : Créer le fichier Google Sheets

1. **Allez sur** [Google Sheets](https://sheets.google.com)
2. **Cliquez sur** le bouton **+ Nouveau** ou **Créer**
3. **Nommez votre fichier** : `Système Réservations RDV`
4. **Notez l'URL** du fichier (vous en aurez besoin plus tard)

### Étape 2.2 : Ouvrir l'éditeur Apps Script

1. Dans votre Google Sheet, cliquez sur : **Extensions > Apps Script**
2. Un nouvel onglet s'ouvre avec l'éditeur de code
3. **Supprimez** le code par défaut (`function myFunction() {}`)

### Étape 2.3 : Copier le code Apps Script

1. **Ouvrez** le fichier `google-apps-script/Code.gs` fourni
2. **Copiez** tout son contenu
3. **Collez-le** dans l'éditeur Apps Script
4. **Cliquez sur** l'icône 💾 **Enregistrer**
5. **Nommez votre projet** : `API Réservations`

### Étape 2.4 : Personnaliser la configuration

Dans le code, localisez la section `CONFIG` (ligne ~10) et modifiez :

```javascript
const CONFIG = {
  EMAIL_FROM: 'votre-email@gmail.com', // ⚠️ CHANGEZ PAR VOTRE EMAIL
  
  ALLOWED_ORIGINS: [
    'http://localhost:5173',           // Développement local
    'https://votre-domaine.com'        // ⚠️ CHANGEZ PAR VOTRE DOMAINE
  ]
};
```

### Étape 2.5 : Initialiser les feuilles et créneaux

**Option A : Automatique (recommandé)**

1. **Retournez** sur votre Google Sheet (rafraîchissez la page si besoin)
2. Vous devriez voir un nouveau menu : **📅 Gestion RDV**
3. **Cliquez sur** : `Gestion RDV > Générer les créneaux`
4. ✅ Acceptez les autorisations si demandé
5. ✅ Les feuilles "Disponibilités" et "Réservations" sont créées avec 30 jours de créneaux

**Option B : Manuelle**

Depuis l'éditeur Apps Script :
1. **Sélectionnez** la fonction `generateSlots` dans le menu déroulant en haut
2. **Cliquez sur** le bouton ▶️ **Exécuter**
3. ✅ Acceptez les autorisations

---

## 3️⃣ Déploiement de l'API

### Étape 3.1 : Créer un déploiement

1. Dans l'éditeur Apps Script, **cliquez sur** le bouton **Déployer** (en haut à droite)
2. **Sélectionnez** : `Nouveau déploiement`

### Étape 3.2 : Configurer le déploiement

1. **Cliquez sur** l'icône ⚙️ **Sélectionner un type**
2. **Choisissez** : `Application Web`

### Étape 3.3 : Paramètres du déploiement

Configurez comme suit :

| Paramètre | Valeur | Explication |
|-----------|--------|-------------|
| **Description** | `API v1.0` | Version de votre API |
| **Exécuter en tant que** | **Moi** | L'API utilisera vos permissions |
| **Qui peut accéder** | **Tout le monde** | ⚠️ Nécessaire pour que votre site puisse appeler l'API |

⚠️ **Important** : "Tout le monde" signifie que n'importe qui avec l'URL peut l'utiliser. On sécurisera cela plus tard.

### Étape 3.4 : Autoriser les permissions

1. **Cliquez sur** `Déployer`
2. Google affiche un écran d'autorisation
3. **Cliquez sur** `Autoriser l'accès`
4. **Connectez-vous** avec votre compte Google
5. Google affiche un avertissement : **"Application non vérifiée"**
6. **Cliquez sur** `Paramètres avancés`
7. **Cliquez sur** `Accéder à [nom du projet] (non sécurisé)`
8. **Cochez** toutes les autorisations demandées
9. **Cliquez sur** `Autoriser`

### Étape 3.5 : Récupérer l'URL de l'API

Après le déploiement, vous obtenez une **URL unique** :

```
https://script.google.com/macros/s/AKfycbx.../exec
```

📋 **COPIEZ cette URL** et conservez-la précieusement !

### Étape 3.6 : Tester l'API manuellement

Ouvrez un navigateur et testez :

```
https://script.google.com/macros/s/VOTRE_ID/exec?action=getSlots
```

Vous devriez voir une réponse JSON avec vos créneaux :

```json
{
  "success": true,
  "data": [
    {
      "id": "20250121_0900",
      "date": "21/01/2025",
      "time": "09:00",
      "status": "disponible"
    }
  ],
  "count": 480
}
```

✅ Si vous voyez cela, **votre API fonctionne** !

---

## 4️⃣ Configuration du Front-End

### Étape 4.1 : Créer le fichier de configuration

Créez un fichier : `src/config/api.js`

```javascript
export const API_CONFIG = {
  // ⚠️ REMPLACEZ PAR VOTRE URL D'API
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/VOTRE_ID/exec',
  
  // Configuration des requêtes
  TIMEOUT: 10000, // 10 secondes
  
  // Pour le développement
  isDevelopment: import.meta.env.MODE === 'development'
};
```

### Étape 4.2 : Créer le service API

Créez un fichier : `src/services/appointmentService.js`

```javascript
import { API_CONFIG } from '@/config/api';

/**
 * Service pour gérer les rendez-vous
 */
class AppointmentService {
  constructor() {
    this.baseUrl = API_CONFIG.GOOGLE_SCRIPT_URL;
  }

  /**
   * Récupère tous les créneaux disponibles
   */
  async getAvailableSlots() {
    try {
      const url = `${this.baseUrl}?action=getSlots&t=${Date.now()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la récupération des créneaux');
      }

      return data.data;
      
    } catch (error) {
      console.error('Erreur getAvailableSlots:', error);
      throw new Error('Impossible de récupérer les créneaux disponibles');
    }
  }

  /**
   * Crée une nouvelle réservation
   */
  async createReservation(appointmentData) {
    try {
      const payload = {
        action: 'createReservation',
        ...appointmentData
      };

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors' // Important pour éviter les erreurs CORS
      });

      // Avec no-cors, on ne peut pas lire la réponse
      // On suppose que la requête a réussi si aucune erreur
      return {
        success: true,
        message: 'Réservation envoyée avec succès'
      };
      
    } catch (error) {
      console.error('Erreur createReservation:', error);
      throw new Error('Impossible de créer la réservation');
    }
  }

  /**
   * Organise les créneaux par date
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
    
    return organized;
  }

  /**
   * Filtre les créneaux pour un jour spécifique
   */
  getSlotsForDate(slots, dateString) {
    return slots.filter(slot => slot.date === dateString);
  }
}

export default new AppointmentService();
```

### Étape 4.3 : Mettre à jour Contact.vue

Le fichier `src/views/Contact.vue` a déjà été mis à jour. Modifiez uniquement la partie qui charge les créneaux :

Dans la section `<script>`, remplacez la fonction `getAvailableSlots()` par un appel au service :

```javascript
import appointmentService from '@/services/appointmentService';

// Dans setup()
const loadAvailableSlots = async () => {
  try {
    isLoading.value = true;
    const slots = await appointmentService.getAvailableSlots();
    // Traiter les créneaux reçus...
  } catch (error) {
    console.error('Erreur:', error);
    // Gérer l'erreur...
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadAvailableSlots();
});
```

---

## 5️⃣ Tests et validation

### Test 1 : Récupération des créneaux

1. **Lancez** votre application : `npm run dev`
2. **Naviguez** vers la page Contact
3. **Vérifiez** que les créneaux s'affichent dans le calendrier
4. **Ouvrez** la console développeur (F12) pour voir les logs

### Test 2 : Création d'une réservation

1. **Sélectionnez** une date dans le calendrier
2. **Choisissez** un créneau horaire
3. **Remplissez** le formulaire (nom, email, message)
4. **Cliquez sur** "Confirmer le rendez-vous"
5. **Vérifiez** que la confirmation apparaît
6. **Allez** dans votre Google Sheet et vérifiez :
   - Le créneau est marqué "réservé" dans "Disponibilités"
   - Une nouvelle ligne apparaît dans "Réservations"

### Test 3 : Email de confirmation

1. **Vérifiez** votre boîte email (celle configurée dans `CONFIG.EMAIL_FROM`)
2. Vous devriez recevoir 2 emails :
   - Un pour le client
   - Un pour vous (notification admin)

---

## 6️⃣ Sécurité et permissions

### Sécurisation de l'API

#### Option 1 : Vérification de l'origine (Déjà implémentée)

Dans le code Apps Script, les origines autorisées sont définies dans `CONFIG.ALLOWED_ORIGINS`.

#### Option 2 : Ajouter une clé API simple

Modifiez le code Apps Script :

```javascript
const API_KEY = 'votre_cle_secrete_123';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  // Vérifier la clé API
  if (data.apiKey !== API_KEY) {
    return jsonResponse({
      success: false,
      error: 'Clé API invalide'
    }, 403);
  }
  
  // ... reste du code
}
```

Et dans le front-end :

```javascript
const payload = {
  action: 'createReservation',
  apiKey: 'votre_cle_secrete_123',
  ...appointmentData
};
```

⚠️ **Note** : Ne commitez JAMAIS la clé API dans Git ! Utilisez des variables d'environnement.

### Protection contre le spam

Ajoutez un rate limiting côté client :

```javascript
// Limiter à 3 tentatives par heure
const attempts = localStorage.getItem('booking_attempts') || 0;
const lastAttempt = localStorage.getItem('last_booking_attempt') || 0;

if (attempts >= 3 && (Date.now() - lastAttempt) < 3600000) {
  alert('Trop de tentatives. Veuillez réessayer dans une heure.');
  return;
}
```

---

## 7️⃣ Déploiement en production

### Étape 7.1 : Build du front-end

```bash
npm run build
```

### Étape 7.2 : Déployer sur Netlify, Vercel, ou GitHub Pages

**Netlify (recommandé) :**

```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Vercel :**

```bash
npm install -g vercel
vercel --prod
```

### Étape 7.3 : Mettre à jour les origines autorisées

Après le déploiement, ajoutez votre domaine de production dans Apps Script :

```javascript
ALLOWED_ORIGINS: [
  'http://localhost:5173',
  'https://votre-site-deploye.netlify.app'  // ← Ajoutez votre URL
]
```

Puis **redéployez** l'API (Déployer > Nouveau déploiement).

---

## 8️⃣ Dépannage

### Problème : Erreur CORS

**Solution** :
- Vérifiez que l'URL de l'API est correcte
- Utilisez `mode: 'no-cors'` dans les fetch POST
- Ajoutez votre domaine dans `ALLOWED_ORIGINS`

### Problème : Les emails ne sont pas envoyés

**Solutions** :
- Vérifiez `CONFIG.EMAIL_FROM`
- Quota Gmail : 100 emails/jour max
- Vérifiez les permissions dans Apps Script

### Problème : "Script function not found"

**Solution** :
- Assurez-vous que les fonctions `doGet` et `doPost` existent
- Redéployez l'API (nouveau déploiement)

### Problème : Double réservation

**Solution** :
- Le script vérifie déjà la disponibilité
- Si cela arrive, vérifiez la colonne "Statut" dans la feuille

### Problème : Créneaux vides

**Solution** :
- Exécutez : `Gestion RDV > Générer les créneaux`
- Vérifiez que la feuille "Disponibilités" existe

---

## 📚 Ressources complémentaires

- [Documentation Google Apps Script](https://developers.google.com/apps-script)
- [Guide Vue.js](https://vuejs.org/guide/)
- [Fetch API MDN](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)

---

## ✅ Checklist finale

Avant de mettre en production :

- [ ] ✅ API déployée et testée
- [ ] ✅ URL de l'API configurée dans le front-end
- [ ] ✅ Email configuré dans `CONFIG.EMAIL_FROM`
- [ ] ✅ Origines autorisées configurées
- [ ] ✅ Créneaux générés (30 jours)
- [ ] ✅ Tests de réservation effectués
- [ ] ✅ Emails de confirmation reçus
- [ ] ✅ Build de production créé
- [ ] ✅ Application déployée
- [ ] ✅ Domaine ajouté dans les origines autorisées

---

**🎉 Félicitations ! Votre système de réservation est maintenant opérationnel !**

