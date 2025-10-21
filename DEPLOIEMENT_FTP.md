# 🚀 Guide de déploiement sur FTP OVH

## 📋 Prérequis

✅ Votre Google Apps Script est déployé (URL copiée)  
✅ Accès FTP à votre hébergement OVH  
✅ Node.js installé sur votre machine  
✅ Le domaine `http://vrhuqfl.cluster021.hosting.ovh.net/` est ajouté dans `Code.gs`

---

## 🔧 Étape 1 : Configuration de l'API

### 1.1. Mettre à jour le domaine dans Google Apps Script

✅ **Déjà fait !** Votre domaine est configuré dans `Code.gs` ligne 27 :
```javascript
ALLOWED_ORIGINS: [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://vrhuqfl.cluster021.hosting.ovh.net/'
]
```

### 1.2. Redéployer l'API Google Apps Script

1. Ouvrez votre projet Apps Script
2. Cliquez sur **Déployer** > **Gérer les déploiements**
3. Cliquez sur ✏️ **Modifier** à côté de votre déploiement
4. Changez la version : **Nouvelle version**
5. Cliquez sur **Déployer**
6. **Copiez l'URL** (elle reste la même normalement)

---

## 🏗️ Étape 2 : Configuration du fichier de production

### 2.1. Modifier `.env.production`

Le fichier `.env.production` a été créé. **Modifiez-le** avec votre URL d'API :

```bash
# Ouvrez .env.production et remplacez VOTRE_ID
VITE_API_URL=https://script.google.com/macros/s/VOTRE_ID_REEL/exec
VITE_ENV=production
```

### 2.2. Vérifier la configuration

Ouvrez `src/config/api.js` - il charge automatiquement la bonne config :

```javascript
GOOGLE_SCRIPT_URL: import.meta.env.VITE_API_URL || '...'
```

✅ Pas de modification nécessaire !

---

## 📦 Étape 3 : Build de production

### 3.1. Construire le projet

Dans votre terminal (à la racine du projet) :

```bash
# Installer les dépendances (si pas déjà fait)
npm install

# Créer le build de production
npm run build
```

⏳ Cela va prendre 30-60 secondes...

### 3.2. Vérifier le build

Un dossier **`dist/`** est créé avec :

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ... (autres fichiers)
├── vite.svg
└── ... (autres fichiers statiques)
```

✅ C'est ce dossier que vous allez uploader sur FTP !

---

## 📤 Étape 4 : Upload sur FTP OVH

### Option A : Via FileZilla (Recommandé)

1. **Téléchargez** [FileZilla](https://filezilla-project.org/) si pas déjà installé

2. **Connectez-vous à votre FTP** :
   - **Hôte** : `ftp.cluster021.hosting.ovh.net` (ou votre serveur FTP)
   - **Nom d'utilisateur** : Votre identifiant OVH
   - **Mot de passe** : Votre mot de passe FTP
   - **Port** : 21

3. **Naviguez** vers le dossier de votre site (généralement `www/` ou `public_html/`)

4. **Uploadez** le contenu du dossier `dist/` :
   - ⚠️ **Attention** : Uploadez le **CONTENU** de `dist/`, pas le dossier lui-même
   - Sélectionnez tous les fichiers dans `dist/`
   - Faites glisser vers le panneau de droite (serveur)

5. **Attendez** que tous les fichiers soient transférés

### Option B : Via ligne de commande (lftp)

```bash
# Installer lftp (si nécessaire)
# Windows : via Chocolatey -> choco install lftp
# Linux/Mac : sudo apt-get install lftp

# Se connecter et uploader
lftp -u VOTRE_USERNAME,VOTRE_PASSWORD ftp.cluster021.hosting.ovh.net
cd www/
mirror -R dist/ ./
exit
```

### Option C : Via le manager OVH (plus lent)

1. Connectez-vous sur [ovh.com](https://www.ovh.com)
2. Allez dans **Web Cloud** > **Hébergements**
3. Cliquez sur votre hébergement
4. Onglet **FTP - SSH**
5. Utilisez l'explorateur de fichiers web
6. Uploadez les fichiers du dossier `dist/`

---

## ✅ Étape 5 : Test du déploiement

### 5.1. Vérifier le site

1. Ouvrez votre navigateur
2. Allez sur : `http://vrhuqfl.cluster021.hosting.ovh.net/`
3. Le site devrait s'afficher

### 5.2. Tester le calendrier

1. Allez sur la page **Contact**
2. Le calendrier devrait s'afficher
3. Cliquez sur une date
4. Les créneaux devraient apparaître
5. Testez une réservation complète

### 5.3. Vérifier dans la console

1. Appuyez sur **F12** pour ouvrir la console
2. Allez dans l'onglet **Console**
3. Vous devriez voir :
   ```
   📡 Chargement des créneaux disponibles...
   ✅ 480 créneaux chargés
   ```
4. Aucune erreur en rouge

---

## 🐛 Dépannage

### ❌ Erreur : "Erreur de connexion"

**Causes possibles** :
1. L'URL de l'API n'est pas configurée dans `.env.production`
2. Le domaine n'est pas dans `ALLOWED_ORIGINS`
3. L'API n'est pas redéployée avec le nouveau domaine

**Solutions** :
1. Vérifiez `.env.production`
2. Rebuild : `npm run build`
3. Re-uploadez sur FTP
4. Videz le cache du navigateur (Ctrl+Shift+R)

### ❌ Erreur CORS

**Cause** : Le domaine n'est pas autorisé

**Solution** :
1. Vérifiez que `http://vrhuqfl.cluster021.hosting.ovh.net/` est dans `Code.gs`
2. Redéployez l'API (nouvelle version)
3. Attendez 1-2 minutes que le déploiement soit effectif

### ❌ Page blanche

**Causes possibles** :
1. Mauvais chemin des fichiers
2. `.htaccess` mal configuré

**Solutions** :

Créez un fichier `.htaccess` dans le dossier racine sur FTP :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### ❌ Les créneaux ne se chargent pas

**Vérifications** :
1. Ouvrez `https://script.google.com/macros/s/VOTRE_ID/exec?action=getSlots` directement
2. Vous devriez voir du JSON avec les créneaux
3. Si erreur, revérifiez le déploiement de l'API

---

## 🔒 Sécurité en production

### 1. HTTPS recommandé

Pour activer HTTPS sur OVH :
1. Manager OVH > Hébergements
2. Onglet **Informations générales**
3. Section **Certificat SSL**
4. Cliquez sur **Commander un certificat SSL** (gratuit avec Let's Encrypt)

Puis mettez à jour `Code.gs` :
```javascript
ALLOWED_ORIGINS: [
  'https://vrhuqfl.cluster021.hosting.ovh.net/'  // HTTPS au lieu de HTTP
]
```

### 2. Limiter les origines

En production, **supprimez** les localhost :

```javascript
ALLOWED_ORIGINS: [
  'https://vrhuqfl.cluster021.hosting.ovh.net/'  // Seulement le domaine prod
]
```

### 3. Protéger .env

Le fichier `.env.production` ne sera **pas** uploadé sur FTP (les variables sont compilées dans le build).

---

## 📊 Fichiers à uploader

### À uploader (dossier `dist/`) :

✅ `index.html`  
✅ `assets/` (tous les fichiers)  
✅ `vite.svg`  
✅ Tous les autres fichiers dans `dist/`  
✅ `.htaccess` (à créer si routing problème)

### À NE PAS uploader :

❌ `node_modules/`  
❌ `src/`  
❌ `.env`  
❌ `.env.production`  
❌ `package.json`  
❌ Fichiers de développement

---

## 🔄 Workflow de mise à jour

Pour mettre à jour le site après des modifications :

```bash
# 1. Modifier votre code
# 2. Tester en local
npm run dev

# 3. Builder
npm run build

# 4. Uploader le contenu de dist/ sur FTP
# (via FileZilla ou autre)

# 5. Vider le cache navigateur
# Ctrl+Shift+R sur la page
```

---

## 📝 Checklist finale

Avant de dire "c'est fini" :

- [ ] ✅ `.env.production` configuré avec la bonne URL d'API
- [ ] ✅ `npm run build` exécuté sans erreur
- [ ] ✅ Dossier `dist/` généré
- [ ] ✅ Domaine OVH ajouté dans `Code.gs`
- [ ] ✅ API Google Apps Script redéployée (nouvelle version)
- [ ] ✅ Contenu de `dist/` uploadé sur FTP
- [ ] ✅ Site accessible sur le domaine OVH
- [ ] ✅ Page Contact affichée
- [ ] ✅ Calendrier fonctionnel
- [ ] ✅ Créneaux chargés depuis l'API
- [ ] ✅ Test de réservation effectué et confirmé dans Google Sheets
- [ ] ✅ Email de confirmation reçu

---

## 🎉 Félicitations !

Votre système de réservation est maintenant **en ligne** et **opérationnel** !

### Pour gérer les réservations :

1. Ouvrez votre Google Sheet
2. Consultez l'onglet **"Réservations"**
3. Utilisez le menu **📅 Gestion RDV** pour les statistiques

### Support :

- Logs Apps Script : Script editor > Exécutions
- Logs navigateur : F12 > Console
- Google Sheets : Historique des versions

---

**Bon succès avec votre site ! 🚀**

