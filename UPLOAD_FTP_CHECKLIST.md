# ✅ Checklist de déploiement FTP - Portfolio

## 🎯 Résumé rapide

Vous allez déployer votre portfolio sur : **http://vrhuqfl.cluster021.hosting.ovh.net/**

---

## 📋 Avant de commencer

### Vérifications préalables

- [ ] Google Apps Script déployé (vous avez l'URL)
- [ ] Accès FTP OVH (identifiant + mot de passe)
- [ ] FileZilla ou autre client FTP installé
- [ ] Node.js installé sur votre machine

---

## 🔧 Étape 1 : Configuration de l'API (5 min)

### 1.1. Mettre à jour Code.gs

✅ **Déjà fait !** Le domaine OVH est configuré (ligne 27) :
```javascript
'http://vrhuqfl.cluster021.hosting.ovh.net/'
```

### 1.2. Redéployer l'API

1. [ ] Ouvrir Google Apps Script
2. [ ] Cliquer sur **Déployer** > **Gérer les déploiements**
3. [ ] Cliquer sur ✏️ **Modifier**
4. [ ] Sélectionner **Nouvelle version**
5. [ ] Cliquer sur **Déployer**
6. [ ] Vérifier que l'URL reste la même

---

## 📝 Étape 2 : Configuration du projet (2 min)

### 2.1. Modifier .env.production

1. [ ] Ouvrir le fichier `.env.production` à la racine
2. [ ] Remplacer `VOTRE_ID` par votre vrai ID d'API :

```bash
VITE_API_URL=https://script.google.com/macros/s/VOTRE_VRAI_ID_ICI/exec
```

**Comment trouver l'ID ?**
- C'est dans l'URL de déploiement Google Apps Script
- Format : `https://script.google.com/macros/s/AKfycbx...../exec`
- L'ID est la partie entre `/s/` et `/exec`

### 2.2. Vérifier que tout est prêt

```bash
# Dans le terminal à la racine du projet
npm install
```

---

## 🏗️ Étape 3 : Build de production (3 min)

### 3.1. Créer le build

```bash
npm run build
```

⏳ Attendez que la commande se termine (30-60 secondes)

### 3.2. Vérifier le dossier dist/

1. [ ] Un dossier `dist/` est créé
2. [ ] Il contient :
   - `index.html`
   - Dossier `assets/`
   - Autres fichiers statiques

✅ C'est prêt pour l'upload !

---

## 📤 Étape 4 : Upload sur FTP (5 min)

### 4.1. Se connecter au FTP

**Avec FileZilla** :

1. [ ] Ouvrir FileZilla
2. [ ] Remplir les champs :
   - **Hôte** : `ftp.cluster021.hosting.ovh.net`
   - **Identifiant** : Votre login OVH
   - **Mot de passe** : Votre mot de passe FTP
   - **Port** : 21
3. [ ] Cliquer sur **Connexion rapide**

### 4.2. Naviguer vers le bon dossier

Sur le serveur (panneau de droite) :
1. [ ] Aller dans le dossier `www/` ou `public_html/`
2. [ ] Si des fichiers existent, faites une sauvegarde

### 4.3. Uploader les fichiers

**⚠️ IMPORTANT : Uploader le CONTENU de dist/, pas le dossier dist/ lui-même**

1. [ ] Sur votre ordinateur (panneau gauche), ouvrir le dossier `dist/`
2. [ ] Sélectionner **TOUS** les fichiers dans `dist/` (Ctrl+A)
3. [ ] Clic droit > **Upload**
4. [ ] Attendre que tous les fichiers soient transférés

### 4.4. Uploader .htaccess

1. [ ] Trouver le fichier `.htaccess` à la racine de votre projet
2. [ ] L'uploader dans le même dossier que `index.html` sur le serveur
3. [ ] S'assurer qu'il est bien nommé `.htaccess` (avec le point)

---

## ✅ Étape 5 : Test du site (5 min)

### 5.1. Vérifier l'affichage

1. [ ] Ouvrir le navigateur
2. [ ] Aller sur : `http://vrhuqfl.cluster021.hosting.ovh.net/`
3. [ ] Le site s'affiche correctement
4. [ ] Naviguer entre les pages (Home, About, Projects, Contact)
5. [ ] Toutes les pages fonctionnent

### 5.2. Tester le calendrier

1. [ ] Aller sur la page **Contact**
2. [ ] Le calendrier s'affiche
3. [ ] Cliquer sur une date future (pas week-end)
4. [ ] Les créneaux horaires apparaissent
5. [ ] Les créneaux sont cliquables

### 5.3. Tester une réservation

1. [ ] Sélectionner une date + un créneau
2. [ ] Remplir le formulaire :
   - Nom : Test Déploiement
   - Email : Votre email
   - Message : Test du système
3. [ ] Cliquer sur **Confirmer le rendez-vous**
4. [ ] Un message de confirmation apparaît
5. [ ] Vérifier dans Google Sheets :
   - Onglet **Disponibilités** : le créneau est marqué "réservé"
   - Onglet **Réservations** : une nouvelle ligne apparaît
6. [ ] Vérifier la réception de l'email de confirmation

### 5.4. Vérifier la console (F12)

1. [ ] Appuyer sur **F12** (outils développeur)
2. [ ] Onglet **Console**
3. [ ] Vous devriez voir :
   ```
   📡 Chargement des créneaux disponibles...
   ✅ 480 créneaux chargés (ou un nombre similaire)
   ```
4. [ ] Aucune erreur en rouge

---

## 🐛 En cas de problème

### ❌ "Erreur de connexion" ou créneaux qui ne chargent pas

**Solutions** :

1. [ ] Vérifier que `.env.production` contient la bonne URL
2. [ ] Refaire le build : `npm run build`
3. [ ] Re-uploader les fichiers
4. [ ] Vider le cache : Ctrl+Shift+R

### ❌ Page blanche

**Solutions** :

1. [ ] Vérifier que `.htaccess` est bien uploadé
2. [ ] Vérifier que les fichiers sont à la racine (pas dans un sous-dossier `dist/`)
3. [ ] Regarder la console F12 pour voir les erreurs

### ❌ Erreur CORS

**Solutions** :

1. [ ] Vérifier que le domaine est dans `Code.gs` ligne 27
2. [ ] Redéployer l'API (nouvelle version)
3. [ ] Attendre 2-3 minutes

### ❌ Routing ne fonctionne pas (404 sur les pages)

**Solution** :

1. [ ] Vérifier que `.htaccess` est uploadé
2. [ ] Vérifier que mod_rewrite est activé sur OVH (normalement oui)

---

## 🔒 Sécurité (Optionnel mais recommandé)

### Activer HTTPS

1. [ ] Se connecter au Manager OVH
2. [ ] Hébergements > Votre hébergement
3. [ ] Onglet **Informations générales**
4. [ ] Section **Certificat SSL**
5. [ ] Commander un certificat SSL (gratuit Let's Encrypt)
6. [ ] Attendre l'activation (quelques minutes à 24h)
7. [ ] Mettre à jour `Code.gs` :
   ```javascript
   'https://vrhuqfl.cluster021.hosting.ovh.net/'  // HTTPS
   ```
8. [ ] Redéployer l'API
9. [ ] Rebuilder et re-uploader : `npm run build`

---

## 📊 Structure finale sur FTP

Votre dossier `www/` ou `public_html/` doit contenir :

```
www/
├── .htaccess
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ... (autres fichiers)
├── vite.svg
└── ... (autres fichiers du build)
```

---

## 🎉 Félicitations !

Si toutes les cases sont cochées, votre site est **EN LIGNE** et **OPÉRATIONNEL** ! 🚀

### Prochaines étapes

- [ ] Partager le lien avec vos clients
- [ ] Tester régulièrement les réservations
- [ ] Consulter Google Sheets pour les nouvelles réservations
- [ ] Répondre aux emails de confirmation

### Pour les mises à jour futures

```bash
# 1. Modifier votre code
# 2. Tester en local : npm run dev
# 3. Builder : npm run build
# 4. Uploader le contenu de dist/ sur FTP
# 5. Vider le cache : Ctrl+Shift+R
```

---

## 📞 Ressources

- **Site** : http://vrhuqfl.cluster021.hosting.ovh.net/
- **Google Sheets** : Vos réservations
- **Manager OVH** : https://www.ovh.com/manager/
- **Documentation** : Voir `DEPLOIEMENT_FTP.md`

---

**Bon déploiement ! 💪**

