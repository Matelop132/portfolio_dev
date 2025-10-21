# 🎯 Instructions finales - Configuration complète

## ✅ Ce qui a été créé

Voici tous les fichiers que je viens de générer pour votre système de réservation :

### 📁 Backend (Google Apps Script)

```
google-apps-script/
├── Code.gs                        # ⭐ API complète avec gestion des RDV
├── SCHEMA_GOOGLE_SHEETS.md        # 📋 Structure des feuilles Google Sheets
├── GUIDE_DEPLOIEMENT.md           # 🚀 Guide de déploiement étape par étape
├── README.md                      # 📖 Documentation générale
└── INSTRUCTIONS_FINALES.md        # 📝 Ce fichier
```

### 🎨 Frontend (Vue.js)

```
src/
├── config/
│   └── api.js                     # ⚙️ Configuration de l'API
├── services/
│   └── appointmentService.js      # 🔧 Service de communication avec l'API
└── views/
    └── Contact.vue                # 📅 Interface utilisateur (mise à jour)
```

---

## 🚀 Checklist de déploiement

Suivez ces étapes dans l'ordre :

### ✅ Étape 1 : Google Sheets & Apps Script

- [ ] 1.1. Créer un nouveau Google Sheet
- [ ] 1.2. Aller dans Extensions > Apps Script
- [ ] 1.3. Copier le contenu de `Code.gs`
- [ ] 1.4. Modifier `CONFIG.EMAIL_FROM` avec votre email
- [ ] 1.5. Enregistrer le script
- [ ] 1.6. Exécuter `generateSlots` pour créer les feuilles

### ✅ Étape 2 : Déployer l'API

- [ ] 2.1. Cliquer sur "Déployer" > "Nouveau déploiement"
- [ ] 2.2. Sélectionner "Application Web"
- [ ] 2.3. Configuration :
  - Exécuter en tant que : **Moi**
  - Qui peut accéder : **Tout le monde**
- [ ] 2.4. Accepter les autorisations
- [ ] 2.5. **Copier l'URL de l'API** (très important !)

### ✅ Étape 3 : Configuration Front-End

- [ ] 3.1. Créer un fichier `.env` à la racine du projet
- [ ] 3.2. Ajouter cette ligne (avec VOTRE URL) :
  ```
  VITE_API_URL=https://script.google.com/macros/s/VOTRE_ID/exec
  ```
- [ ] 3.3. Installer les dépendances : `npm install`
- [ ] 3.4. Lancer le projet : `npm run dev`

### ✅ Étape 4 : Tests

- [ ] 4.1. Ouvrir la page Contact
- [ ] 4.2. Vérifier que le calendrier s'affiche
- [ ] 4.3. Sélectionner une date et un créneau
- [ ] 4.4. Remplir le formulaire
- [ ] 4.5. Confirmer la réservation
- [ ] 4.6. Vérifier dans Google Sheets que :
  - Le créneau est marqué "réservé"
  - Une ligne apparaît dans "Réservations"
- [ ] 4.7. Vérifier la réception des emails

---

## 📝 Configuration du fichier .env

Créez un fichier `.env` à la racine avec ce contenu :

```bash
# URL de votre Google Apps Script déployé
VITE_API_URL=https://script.google.com/macros/s/VOTRE_ID_UNIQUE_ICI/exec

# Environnement
VITE_ENV=development
```

⚠️ **IMPORTANT** : Remplacez `VOTRE_ID_UNIQUE_ICI` par l'ID que vous avez obtenu lors du déploiement !

---

## 🔧 Personnalisation

### Modifier les horaires disponibles

Éditez `Code.gs`, ligne ~245 :

```javascript
const timeSlots = [
  '08:00', '08:30',  // Ajoutez vos horaires
  '09:00', '09:30',
  // ...
];
```

Puis dans Google Sheets :
1. Menu : `📅 Gestion RDV > Générer les créneaux`
2. Acceptez de remplacer les anciens créneaux

### Modifier la durée de génération

Dans `Code.gs`, ligne ~156 :

```javascript
for (let day = 0; day < 60; day++) {  // 60 jours au lieu de 30
```

### Ajouter votre domaine en production

Une fois déployé sur Netlify/Vercel, mettez à jour `Code.gs` :

```javascript
ALLOWED_ORIGINS: [
  'http://localhost:5173',
  'https://votre-site.netlify.app'  // Ajoutez votre domaine
]
```

Puis **redéployez l'API** (Déployer > Nouveau déploiement).

---

## 📊 Utilisation au quotidien

### Consulter les réservations

1. Ouvrez votre Google Sheet
2. Allez dans l'onglet **"Réservations"**
3. Toutes les réservations sont listées avec les détails

### Voir les statistiques

1. Dans Google Sheets, menu : **📅 Gestion RDV**
2. Cliquez sur **Voir les statistiques**
3. Un popup affiche le résumé

### Exporter les données

1. **Fichier > Télécharger > Microsoft Excel (.xlsx)**
2. Ou utilisez Google Takeout pour une sauvegarde complète

### Ajouter manuellement des créneaux

1. Allez dans l'onglet **"Disponibilités"**
2. Ajoutez une ligne avec :
   - **ID** : `20250125_1400` (format AAAAMMJJ_HHMM)
   - **Date** : `25/01/2025`
   - **Heure** : `14:00`
   - **Statut** : `disponible`
   - Laissez les autres colonnes vides

### Annuler une réservation

1. Dans **"Disponibilités"**, trouvez le créneau
2. Changez le statut de `réservé` à `disponible`
3. Effacez les colonnes "Réservé par", "Email", "Date de réservation"
4. Dans **"Réservations"**, changez le statut en `Annulé`

---

## 🔒 Sécurité en production

### 1. Protéger le fichier .env

Ajoutez `.env` dans votre `.gitignore` :

```gitignore
.env
.env.local
.env.production
```

### 2. Limiter les origines autorisées

Dans `Code.gs`, restreignez les domaines :

```javascript
ALLOWED_ORIGINS: [
  'https://votre-domaine-exact.com'  // Seulement votre domaine
]
```

### 3. Ajouter une clé API (optionnel)

Dans `Code.gs`, ajoutez :

```javascript
const API_KEY = 'votre_cle_secrete_xyz';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.apiKey !== API_KEY) {
    return jsonResponse({ success: false, error: 'Non autorisé' }, 403);
  }
  // ... reste du code
}
```

Et dans `src/services/appointmentService.js` :

```javascript
const payload = {
  action: 'createReservation',
  apiKey: import.meta.env.VITE_API_KEY,  // Ajoutez dans .env
  ...appointmentData
};
```

### 4. Rate limiting côté client

Déjà implémenté dans le service, mais vous pouvez ajuster les limites.

---

## 🐛 Problèmes courants

### ❌ Erreur : "Script function not found"

**Cause** : Les fonctions `doGet` ou `doPost` sont absentes  
**Solution** : Vérifiez que le code complet est bien copié et redéployez

### ❌ Erreur CORS

**Cause** : Origine non autorisée  
**Solution** : Ajoutez votre domaine dans `ALLOWED_ORIGINS` et redéployez

### ❌ Les emails ne sont pas envoyés

**Causes possibles** :
1. Quota Gmail dépassé (100 emails/jour)
2. Email dans `CONFIG.EMAIL_FROM` incorrect
3. Permissions manquantes

**Solution** : Vérifiez les logs dans Apps Script (Exécutions)

### ❌ "Créneau non disponible" alors qu'il l'est

**Cause** : Décalage entre le cache et les données réelles  
**Solution** : Rafraîchissez la page et réessayez

### ❌ Les créneaux ne se chargent pas

**Cause** : URL de l'API incorrecte ou non configurée  
**Solution** : Vérifiez le `.env` et que l'URL est exacte

---

## 📈 Quotas Google

| Service | Limite gratuite | Notes |
|---------|----------------|-------|
| Google Sheets | 10M cellules | ~200k réservations |
| Apps Script | 20k exécutions/jour | ~6 min total |
| Gmail | 100 emails/jour | Compte gratuit |
| Gmail Workspace | 1500 emails/jour | Compte payant |

---

## 🎨 Personnalisation de l'interface

### Changer les couleurs

Dans `tailwind.config.js` (si pas déjà fait) :

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... votre palette
          600: '#2563eb',
        }
      }
    }
  }
}
```

### Ajouter des champs au formulaire

1. Modifiez `appointmentForm` dans `Contact.vue`
2. Ajoutez le champ dans le template
3. Mettez à jour `appointmentService.js` pour l'envoyer
4. Modifiez `Code.gs` pour le traiter
5. Ajoutez une colonne dans Google Sheets

---

## 🚀 Déploiement en production

### Option 1 : Netlify

```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod
```

### Option 2 : Vercel

```bash
npm run build
npm install -g vercel
vercel --prod
```

### Option 3 : GitHub Pages

```bash
npm run build
# Puis poussez le dossier dist vers gh-pages
```

⚠️ **N'oubliez pas** de mettre à jour `ALLOWED_ORIGINS` après le déploiement !

---

## 📞 Support et maintenance

### Logs et débogage

1. **Apps Script** : Exécutions > Voir les logs
2. **Console navigateur** : F12 > Console
3. **Google Sheets** : Historique des versions

### Sauvegardes

- **Automatique** : Google Sheets sauvegarde automatiquement
- **Manuelle** : Fichier > Créer une copie
- **Export** : Fichier > Télécharger > Excel

### Mises à jour

Pour mettre à jour le code Apps Script :
1. Modifiez le code
2. Enregistrez
3. Déployez (Gérer les déploiements > Modifier)

---

## ✨ Améliorations futures

### Faciles à implémenter
- [ ] Captcha pour éviter le spam
- [ ] Choix de la durée du RDV (30min, 1h)
- [ ] Catégories de rendez-vous
- [ ] Rappels par email 24h avant

### Moyennes
- [ ] Synchronisation Google Calendar
- [ ] Dashboard d'administration
- [ ] Gestion des annulations clients
- [ ] Système de file d'attente

### Avancées
- [ ] Paiement en ligne (Stripe)
- [ ] Visioconférence (Google Meet)
- [ ] Multi-consultants
- [ ] Application mobile

---

## 🎉 Félicitations !

Vous avez maintenant un système de réservation complet et professionnel !

### Ce que vous avez :

✅ Une API robuste sans serveur  
✅ Une base de données Google Sheets facile à gérer  
✅ Une interface utilisateur moderne et responsive  
✅ Des emails automatiques de confirmation  
✅ Un système de validation des données  
✅ Une protection contre les doubles réservations  
✅ Une documentation complète  

### Ressources utiles :

- [📋 Schéma Google Sheets](./SCHEMA_GOOGLE_SHEETS.md)
- [🚀 Guide de déploiement](./GUIDE_DEPLOIEMENT.md)
- [📖 README](./README.md)
- [Documentation Apps Script](https://developers.google.com/apps-script)
- [Documentation Vue.js](https://vuejs.org/)

---

**Bon développement ! 🚀**

