# 🔧 CORRECTIONS APPLIQUÉES - Page Blanche OVH

## 📋 Problèmes identifiés et corrigés

### ❌ **Problème 1 : Chemins absolus des assets**
**Symptôme** : Page blanche, seul le titre s'affiche
**Cause** : Les fichiers JS/CSS étaient référencés avec des chemins absolus (`/assets/...`) au lieu de chemins relatifs (`./assets/...`)

✅ **Correction appliquée** :
- Ajout de `base: './'` dans `vite.config.js`
- Nouveau build généré avec chemins relatifs

### ❌ **Problème 2 : Routing Vue Router**
**Symptôme** : Navigation impossible entre les pages
**Cause** : `createWebHistory()` nécessite une configuration serveur `.htaccess`

✅ **Corrections appliquées** :
- Utilisation de `createWebHashHistory()` en production (URLs avec #)
- Création d'un fichier `.htaccess` pour le routage SPA
- `.htaccess` copié dans `dist/`

### ❌ **Problème 3 : Configuration API manquante**
**Symptôme** : Formulaire de contact ne fonctionne pas
**Cause** : Pas de fichier `.env.production`

⚠️ **Action requise** : Voir section suivante

---

## 🚀 ÉTAPES DE REDÉPLOIEMENT

### 1️⃣ Supprimer l'ancien contenu sur OVH

Via **FileZilla** :
1. Connectez-vous à votre FTP OVH
2. Allez dans le dossier `www/` (ou `public_html/`)
3. **Supprimez TOUS les fichiers** du portfolio actuel
   - `index.html`
   - Dossier `assets/`
   - Tous les autres fichiers du portfolio

### 2️⃣ Uploader les nouveaux fichiers

1. Ouvrez le dossier `dist/` de votre projet local
2. **Sélectionnez TOUT le contenu** de `dist/` :
   - ✅ `index.html`
   - ✅ Dossier `assets/`
   - ✅ `vite.svg`
   - ✅ `robots.txt`
   - ✅ `sitemap.xml`
   - ✅ `.htaccess` ⚠️ **IMPORTANT !**

3. **Glissez-déposez** tous ces fichiers dans le dossier `www/` sur le serveur OVH

⏳ Attendez que le transfert soit terminé (quelques minutes)

### 3️⃣ Vérifier que .htaccess est bien uploadé

⚠️ **TRÈS IMPORTANT** : Le fichier `.htaccess` peut être caché !

**Sur FileZilla** :
1. Menu **Serveur** > **Forcer l'affichage des fichiers cachés**
2. Vérifiez que `.htaccess` apparaît dans le dossier `www/`
3. Si absent, uploadez-le manuellement depuis `dist/.htaccess`

### 4️⃣ Tester le site

1. Ouvrez votre navigateur
2. Allez sur : `http://vrhuqfl.cluster021.hosting.ovh.net/`
3. **Videz le cache** : `Ctrl + Shift + R` (ou `Cmd + Shift + R` sur Mac)
4. Le site devrait maintenant s'afficher ! 🎉

### 5️⃣ Tester la navigation

Les URLs seront sous la forme :
- `http://vrhuqfl.cluster021.hosting.ovh.net/#/`
- `http://vrhuqfl.cluster021.hosting.ovh.net/#/competences`
- `http://vrhuqfl.cluster021.hosting.ovh.net/#/projets`
- `http://vrhuqfl.cluster021.hosting.ovh.net/#/contact`

✅ Le `#` est normal avec `createWebHashHistory()` et fonctionne sans configuration serveur

---

## 🔄 Si vous voulez des URLs propres (sans #)

### Option : Utiliser createWebHistory() + .htaccess

1. Ouvrez `src/router/index.js`
2. Changez la ligne 59 :
```javascript
// Avant (avec #)
history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(),

// Après (sans #)
history: createWebHistory(),
```

3. Rebuild :
```bash
npm run build
```

4. Uploadez le nouveau `dist/` sur FTP

5. **Vérifiez que `.htaccess` est bien présent** sur le serveur

⚠️ **Attention** : Cela nécessite que le `.htaccess` fonctionne correctement sur votre hébergement OVH. Si vous avez une page blanche, revenez à `createWebHashHistory()`.

---

## 🔧 Configuration de l'API Google Apps Script (optionnel)

Si vous utilisez le formulaire de contact avec Google Sheets :

### 1. Créer `.env.production`

Dans le dossier racine du projet, créez le fichier `.env.production` :

```bash
# Configuration de production
VITE_API_URL=https://script.google.com/macros/s/VOTRE_ID_REEL/exec
VITE_ENV=production
```

⚠️ Remplacez `VOTRE_ID_REEL` par l'ID de votre Google Apps Script

### 2. Rebuild et redéployer

```bash
npm run build
```

Puis uploadez le nouveau `dist/` sur FTP.

---

## 📊 Vérification finale

### ✅ Checklist avant de valider :

- [ ] Tous les fichiers de `dist/` sont sur le serveur
- [ ] Le fichier `.htaccess` est présent (vérifier les fichiers cachés)
- [ ] Le site s'affiche sans page blanche
- [ ] La navigation fonctionne (testez tous les liens du menu)
- [ ] Les images s'affichent correctement
- [ ] Le CSS est appliqué (design visible)
- [ ] Le mode sombre fonctionne (bouton en haut à droite)

### 🐛 Si la page est toujours blanche :

1. **Ouvrez la console du navigateur** : `F12` > onglet **Console**
2. Regardez les **erreurs en rouge**
3. Vérifiez les erreurs de type :
   - `404 Not Found` → Fichiers mal uploadés
   - `Failed to load module` → Chemins incorrects
   - `CORS error` → Problème d'API

4. **Vérifiez l'onglet Network** (Réseau) :
   - Les fichiers `index.js` et `vendor.js` se chargent-ils ?
   - Quel est leur code de statut ? (devrait être 200)

5. **Cas particulier** : Si votre site n'est pas à la racine du domaine
   - Exemple : `http://vrhuqfl.cluster021.hosting.ovh.net/mon-portfolio/`
   - Il faudrait changer `base: './'` en `base: '/mon-portfolio/'` dans `vite.config.js`

---

## 🎯 Résumé des modifications

| Fichier | Modification | Raison |
|---------|-------------|--------|
| `vite.config.js` | Ajout de `base: './'` | Chemins relatifs pour OVH |
| `src/router/index.js` | `createWebHashHistory()` en prod | Fonctionne sans .htaccess |
| `.htaccess` | Créé à la racine | Routage SPA (optionnel) |
| `dist/` | Nouveau build généré | Application des corrections |

---

## 📞 Support

Si le problème persiste après ces corrections :

1. **Vérifiez la console navigateur** (`F12`)
2. **Prenez une capture d'écran** des erreurs
3. **Vérifiez la structure de fichiers** sur le serveur FTP
4. **Testez en local** : `npm run preview` pour vérifier que le build fonctionne

---

## 🎉 Félicitations !

Une fois ces étapes terminées, votre portfolio devrait fonctionner parfaitement sur OVH !

**Prochaines étapes recommandées** :
- ✅ Activer HTTPS avec Let's Encrypt (gratuit sur OVH)
- ✅ Configurer votre nom de domaine personnalisé
- ✅ Tester le formulaire de contact avec l'API Google Sheets
- ✅ Optimiser les images pour de meilleures performances

---

**Bon déploiement ! 🚀**

