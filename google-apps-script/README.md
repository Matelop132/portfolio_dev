# 📅 Système de Prise de Rendez-vous avec Google Sheets

## 🎯 Vue d'ensemble

Ce système permet de gérer des prises de rendez-vous **sans serveur backend traditionnel**, en utilisant **Google Sheets** comme base de données et **Google Apps Script** comme API.

### Avantages

✅ **Gratuit** - Pas de coûts d'hébergement serveur  
✅ **Simple** - Pas de base de données à configurer  
✅ **Sécurisé** - Authentification Google intégrée  
✅ **Accessible** - Interface Google Sheets pour gérer les RDV  
✅ **Scalable** - Supporte des milliers de réservations  
✅ **Emails automatiques** - Confirmations envoyées automatiquement

---

## 📁 Structure du projet

```
portfolio/
├── google-apps-script/
│   ├── Code.gs                      # ⭐ Code Google Apps Script (API)
│   ├── SCHEMA_GOOGLE_SHEETS.md     # 📋 Documentation du schéma
│   ├── GUIDE_DEPLOIEMENT.md        # 🚀 Guide de déploiement détaillé
│   └── README.md                   # 📖 Ce fichier
│
├── src/
│   ├── config/
│   │   └── api.js                  # ⚙️ Configuration de l'API
│   ├── services/
│   │   └── appointmentService.js   # 🔧 Service de gestion des RDV
│   └── views/
│       └── Contact.vue             # 📅 Interface du calendrier
│
└── .env.example                    # 🔐 Variables d'environnement
```

---

## 🚀 Démarrage rapide

### Étape 1 : Configuration Google Sheets

1. **Créez un Google Sheet** sur [sheets.google.com](https://sheets.google.com)
2. **Ouvrez Apps Script** : Extensions > Apps Script
3. **Copiez le code** depuis `Code.gs`
4. **Modifiez la config** :
   ```javascript
   EMAIL_FROM: 'votre-email@gmail.com'
   ```
5. **Enregistrez** et **exécutez** `generateSlots` pour initialiser

### Étape 2 : Déployer l'API

1. Dans Apps Script : **Déployer > Nouveau déploiement**
2. Type : **Application Web**
3. Exécuter en tant que : **Moi**
4. Qui peut accéder : **Tout le monde**
5. **Copiez l'URL** générée

### Étape 3 : Configurer le Front-End

1. **Créez `.env`** :
   ```bash
   cp .env.example .env
   ```

2. **Ajoutez l'URL de l'API** dans `.env` :
   ```
   VITE_API_URL=https://script.google.com/macros/s/VOTRE_ID/exec
   ```

3. **Installez et lancez** :
   ```bash
   npm install
   npm run dev
   ```

---

## 📚 Documentation complète

| Document | Description |
|----------|-------------|
| [📋 SCHEMA_GOOGLE_SHEETS.md](./SCHEMA_GOOGLE_SHEETS.md) | Structure détaillée des feuilles et colonnes |
| [🚀 GUIDE_DEPLOIEMENT.md](./GUIDE_DEPLOIEMENT.md) | Guide complet de configuration et déploiement |
| [🔧 Code.gs](./Code.gs) | Code source commenté de l'API |

---

## 🔌 Endpoints de l'API

### GET - Récupérer les créneaux disponibles

```
GET https://script.google.com/macros/s/VOTRE_ID/exec?action=getSlots
```

**Réponse** :
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

### POST - Créer une réservation

```
POST https://script.google.com/macros/s/VOTRE_ID/exec
Content-Type: application/json

{
  "action": "createReservation",
  "slotId": "20250121_0900",
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "06 12 34 56 78",
  "message": "Besoin de discuter d'un projet web"
}
```

**Réponse** :
```json
{
  "success": true,
  "reservationId": "RES_1705756234567",
  "message": "Réservation confirmée avec succès",
  "details": {
    "name": "Jean Dupont",
    "date": "21/01/2025",
    "time": "09:00"
  }
}
```

---

## 📊 Structure Google Sheets

### Feuille "Disponibilités"

| Colonne | Type | Description |
|---------|------|-------------|
| A - ID | Texte | `20250121_0900` |
| B - Date | Date | `21/01/2025` |
| C - Heure | Texte | `09:00` |
| D - Statut | Texte | `disponible` ou `réservé` |
| E - Réservé par | Texte | Nom du client |
| F - Email | Texte | Email du client |
| G - Date réservation | Date/Heure | Timestamp |

### Feuille "Réservations"

| Colonne | Type | Description |
|---------|------|-------------|
| A - ID | Texte | `RES_1705756234567` |
| B - Nom | Texte | Nom complet |
| C - Email | Texte | Email du client |
| D - Téléphone | Texte | Numéro (optionnel) |
| E - Date RDV | Date | Date du rendez-vous |
| F - Heure RDV | Texte | Heure du rendez-vous |
| G - Message | Texte | Message du client |
| H - Date création | Date/Heure | Timestamp |
| I - Statut | Texte | Confirmé/Annulé/Complété |
| J - Notes | Texte | Notes admin |

---

## ⚙️ Configuration avancée

### Personnaliser les horaires

Dans `Code.gs`, ligne ~145 :

```javascript
const timeSlots = [
  '08:00', '08:30', '09:00', '09:30',  // Modifiez selon vos besoins
  '10:00', '10:30', '11:00', '11:30'
];
```

### Modifier la période de génération

Ligne ~156 :

```javascript
for (let day = 0; day < 30; day++) {  // 30 jours → modifiez
```

### Ajouter des jours fériés

```javascript
const holidays = ['2025-12-25', '2026-01-01'];
if (holidays.includes(dateStr)) continue;
```

---

## 🔒 Sécurité

### Protections intégrées

✅ Validation des données (email, téléphone, etc.)  
✅ Vérification de disponibilité des créneaux  
✅ Protection contre les doubles réservations  
✅ Filtrage des origines (CORS)

### Recommandations production

1. **Limiter les origines** dans `CONFIG.ALLOWED_ORIGINS`
2. **Ajouter une clé API** (voir guide de déploiement)
3. **Activer rate limiting** côté client
4. **Restreindre les permissions** du Google Sheet
5. **Monitorer les quotas** Gmail (100 emails/jour)

---

## 📈 Quotas et limites

| Ressource | Limite gratuite | Notes |
|-----------|-----------------|-------|
| Google Sheets | 10 millions de cellules | Largement suffisant |
| Apps Script | 20 000 exécutions/jour | ~6 min d'exécution totale |
| Gmail (MailApp) | 100 emails/jour | Compte gratuit |
| Gmail (Workspace) | 1500 emails/jour | Compte payant |

---

## 🛠️ Améliorations possibles

### Court terme
- [ ] Ajouter un captcha (reCAPTCHA)
- [ ] Système de rappels automatiques (24h avant)
- [ ] Export des réservations en CSV
- [ ] Filtres et recherche dans les réservations

### Moyen terme
- [ ] Synchronisation avec Google Calendar
- [ ] SMS de confirmation (via Twilio)
- [ ] Dashboard d'administration
- [ ] Gestion des annulations en ligne

### Long terme
- [ ] Système de paiement (Stripe)
- [ ] Multi-utilisateurs (plusieurs consultants)
- [ ] Répétition de créneaux (RDV récurrents)
- [ ] Intégration vidéo (Google Meet, Zoom)

---

## 🐛 Dépannage

### Problème : "Script function not found"

**Solution** : Assurez-vous que `doGet` et `doPost` existent et redéployez l'API.

### Problème : CORS errors

**Solutions** :
- Vérifiez l'URL de l'API dans `.env`
- Ajoutez votre domaine dans `ALLOWED_ORIGINS`
- Utilisez `mode: 'no-cors'` pour les POST

### Problème : Les emails ne partent pas

**Solutions** :
- Vérifiez `CONFIG.EMAIL_FROM`
- Quota Gmail atteint (100/jour)
- Autorisations Apps Script manquantes

### Problème : Double réservation

**Solution** : Le script vérifie déjà, mais vérifiez que la colonne "Statut" est bien mise à jour.

---

## 📞 Support

Pour toute question ou problème :

1. Consultez le [📋 Guide de déploiement](./GUIDE_DEPLOIEMENT.md)
2. Vérifiez les logs dans Apps Script (Exécutions)
3. Testez l'API directement dans le navigateur

---

## 📝 Licence

Ce projet est fourni à titre d'exemple et peut être librement modifié et adapté à vos besoins.

---

## 🎉 Crédits

Développé avec ❤️ en utilisant :
- Vue.js 3
- Tailwind CSS
- Google Apps Script
- Google Sheets

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2025

