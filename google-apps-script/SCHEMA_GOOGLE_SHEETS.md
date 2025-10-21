# 📊 Schéma Google Sheets - Système de Réservation

Ce document décrit la structure des feuilles Google Sheets nécessaires pour le système de prise de rendez-vous.

## 📋 Vue d'ensemble

Le système utilise **2 feuilles** dans un seul fichier Google Sheets :

1. **Disponibilités** - Gère les créneaux horaires disponibles
2. **Réservations** - Enregistre toutes les réservations confirmées

---

## 🗓️ Feuille 1 : "Disponibilités"

Cette feuille contient tous les créneaux horaires avec leur statut.

### Colonnes

| Colonne | Nom | Type | Description | Exemple |
|---------|-----|------|-------------|---------|
| A | **ID** | Texte | Identifiant unique du créneau (format: AAAAMMJJ_HHMM) | `20250120_0900` |
| B | **Date** | Date | Date du créneau | `20/01/2025` |
| C | **Heure** | Texte | Heure du créneau (format HH:MM) | `09:00` |
| D | **Statut** | Texte | État du créneau : "disponible" ou "réservé" | `disponible` |
| E | **Réservé par** | Texte | Nom de la personne ayant réservé (vide si disponible) | `Jean Dupont` |
| F | **Email** | Texte | Email de la personne ayant réservé | `jean@example.com` |
| G | **Date de réservation** | Date/Heure | Quand la réservation a été faite | `20/01/2025 14:30:45` |

### Structure d'exemple

```
ID                  | Date       | Heure | Statut      | Réservé par | Email            | Date de réservation
--------------------|------------|-------|-------------|-------------|------------------|--------------------
20250120_0900       | 20/01/2025 | 09:00 | disponible  |             |                  |
20250120_0930       | 20/01/2025 | 09:30 | réservé     | Jean Dupont | jean@example.com | 19/01/2025 10:15:30
20250120_1000       | 20/01/2025 | 10:00 | disponible  |             |                  |
20250120_1030       | 20/01/2025 | 10:30 | disponible  |             |                  |
```

### Notes importantes

- **Format ID** : AAAAMMJJ_HHMM (année, mois, jour, heure, minute sans séparateur)
- Les **week-ends sont exclus** automatiquement lors de la génération
- La ligne d'en-tête (ligne 1) doit être **conservée**
- Les créneaux réservés sont automatiquement **colorés en jaune** (#fff3cd)
- Pour initialiser les créneaux, utilisez le menu personnalisé : `📅 Gestion RDV > Générer les créneaux`

---

## 📝 Feuille 2 : "Réservations"

Cette feuille enregistre toutes les réservations avec les détails complets des clients.

### Colonnes

| Colonne | Nom | Type | Description | Exemple |
|---------|-----|------|-------------|---------|
| A | **ID** | Texte | Identifiant unique de la réservation | `RES_1705756234567` |
| B | **Nom** | Texte | Nom complet du client | `Jean Dupont` |
| C | **Email** | Texte | Email du client | `jean@example.com` |
| D | **Téléphone** | Texte | Numéro de téléphone (optionnel) | `06 12 34 56 78` |
| E | **Date RDV** | Date | Date du rendez-vous | `20/01/2025` |
| F | **Heure RDV** | Texte | Heure du rendez-vous | `09:30` |
| G | **Message** | Texte | Message/raison du rendez-vous | `Besoin de discuter d'un projet web` |
| H | **Date de création** | Date/Heure | Timestamp de la réservation | `19/01/2025 10:15:30` |
| I | **Statut** | Texte | État de la réservation | `Confirmé` |
| J | **Notes** | Texte | Notes administratives (optionnel) | `Client prioritaire` |

### Structure d'exemple

```
ID               | Nom         | Email            | Téléphone      | Date RDV   | Heure RDV | Message              | Date de création     | Statut    | Notes
-----------------|-------------|------------------|----------------|------------|-----------|----------------------|---------------------|-----------|-------
RES_1705756234567| Jean Dupont | jean@example.com | 06 12 34 56 78 | 20/01/2025 | 09:30     | Projet site web      | 19/01/2025 10:15:30 | Confirmé  |
RES_1705756890123| Marie Martin| marie@example.com| 06 98 76 54 32 | 21/01/2025 | 14:00     | Refonte application  | 19/01/2025 11:45:12 | Confirmé  |
```

### États possibles

- **Confirmé** : Réservation validée
- **Annulé** : Client a annulé
- **Complété** : Rendez-vous effectué
- **No-show** : Client absent

---

## 🚀 Initialisation rapide

### Étape 1 : Créer le fichier Google Sheets

1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez un nouveau fichier
3. Nommez-le : **"Système Réservations"** (ou autre nom de votre choix)

### Étape 2 : Copier le code Apps Script

1. Dans le fichier Google Sheets, allez dans : **Extensions > Apps Script**
2. Supprimez le code par défaut
3. Copiez-collez le contenu du fichier `Code.gs`
4. Cliquez sur **💾 Enregistrer**

### Étape 3 : Initialiser les feuilles

Deux options :

**Option A : Automatique (recommandé)**
1. Rafraîchissez la page Google Sheets
2. Un nouveau menu apparaît : **📅 Gestion RDV**
3. Cliquez sur : **Gestion RDV > Générer les créneaux**
4. ✅ Les deux feuilles sont créées automatiquement avec des créneaux pour les 30 prochains jours

**Option B : Manuelle**
1. Créez une feuille nommée exactement **"Disponibilités"**
2. Créez une feuille nommée exactement **"Réservations"**
3. Ajoutez les en-têtes de colonnes comme indiqué ci-dessus
4. Remplissez manuellement les créneaux disponibles

---

## 🎨 Formatage recommandé

### Pour "Disponibilités"

- **En-têtes** : Fond bleu (#4285f4), texte blanc, gras
- **Lignes réservées** : Fond jaune (#fff3cd)
- **Format Date colonne B** : `JJ/MM/AAAA`
- **Format Heure colonne C** : Texte brut `HH:MM`

### Pour "Réservations"

- **En-têtes** : Fond vert (#0f9d58), texte blanc, gras
- **Format Date colonne E** : `JJ/MM/AAAA`
- **Format Date/Heure colonne H** : `JJ/MM/AAAA HH:MM:SS`

---

## 📊 Statistiques et suivi

Le menu personnalisé **📅 Gestion RDV** offre :

- **Générer les créneaux** : Crée automatiquement 30 jours de créneaux (du lundi au vendredi)
- **Voir les statistiques** : Affiche un résumé des créneaux disponibles/réservés

---

## 🔧 Personnalisation

### Modifier les horaires disponibles

Dans le fichier `Code.gs`, ligne ~145, modifiez le tableau `timeSlots` :

```javascript
const timeSlots = [
  '09:00', '09:30', '10:00', '10:30',  // Matin
  '11:00', '11:30',                     // Fin de matinée
  '13:30', '14:00',                     // Après-midi
  '14:30', '15:00', '15:30', '16:00',
  '16:30', '17:00', '17:30', '18:00'   // Fin d'après-midi
];
```

### Modifier la période de génération

Dans la fonction `generateSlots()`, ligne ~156 :

```javascript
// Générer des créneaux pour les 30 prochains jours
for (let day = 0; day < 30; day++) {  // ← Changez 30 par le nombre de jours souhaité
```

### Exclure des jours fériés

Ajoutez cette vérification dans la boucle de génération :

```javascript
const holidays = ['2025-01-01', '2025-12-25']; // Format AAAA-MM-JJ
const dateStr = Utilities.formatDate(currentDate, 'GMT', 'yyyy-MM-dd');
if (holidays.includes(dateStr)) {
  continue;
}
```

---

## 🔍 Validation des données

Le script valide automatiquement :

- ✅ Format d'email valide
- ✅ Disponibilité du créneau (pas de double réservation)
- ✅ Données obligatoires présentes
- ✅ Format des dates cohérent

---

## 🆘 Résolution de problèmes

### Problème : Les feuilles ne se créent pas

**Solution** : Exécutez manuellement la fonction `initializeSheet()` depuis l'éditeur Apps Script

### Problème : Les emails ne sont pas envoyés

**Solutions** :
1. Vérifiez les quotas Gmail (100 emails/jour pour compte gratuit)
2. Modifiez `CONFIG.EMAIL_FROM` avec votre adresse email
3. Autorisez les permissions lors de la première exécution

### Problème : Erreur "Créneau non disponible"

**Solutions** :
1. Vérifiez que la colonne "Statut" contient bien "disponible"
2. Assurez-vous que l'ID du créneau est correct
3. Rafraîchissez les données de la feuille

---

## 📦 Sauvegarde

Pour sauvegarder vos données :

1. **Fichier > Télécharger > Microsoft Excel (.xlsx)**
2. Ou utilisez **Google Takeout** pour une sauvegarde complète

---

## 🔐 Sécurité

- Ne partagez jamais publiquement l'URL de votre Google Sheet
- Restreignez l'accès à "Personnes spécifiques"
- Pour l'API déployée, utilisez le mode "Exécuter en tant que : Moi" et "Accès : Tout le monde"

---

## 📚 Ressources

- [Documentation Google Apps Script](https://developers.google.com/apps-script)
- [SpreadsheetApp Reference](https://developers.google.com/apps-script/reference/spreadsheet)
- [MailApp Reference](https://developers.google.com/apps-script/reference/mail)

