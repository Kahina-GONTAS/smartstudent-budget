# SmartStudent Budget

## Présentation du projet

SmartStudent Budget est une application web de gestion de finances personnelles destinée aux étudiants. Elle permet de suivre ses revenus et dépenses, de catégoriser ses transactions et de visualiser ses habitudes de consommation.

Ce projet a été développé dans le cadre de l'apprentissage du développement front-end avec React. Il démontre la maîtrise des concepts fondamentaux de React ainsi que l'intégration de bibliothèques modernes.

---

## Technologies utilisées: | Technologie | Version | Rôle |


| React | 18.3.0 | Bibliothèque d'interface utilisateur |
| JavaScript (JSX) | ES6+ | Logique et affichage |
| Tailwind CSS | 3.4.0 | Styles et mise en page |
| Vite | 5.0.0 | Outil de build et serveur de développement |
| Chart.js | Dernière | Graphiques statistiques |
| LocalStorage | API native | Persistance des données |

---

## Fonctionnalités

### Gestion des transactions
- Ajout de revenus et de dépenses
- Catégorisation des dépenses (Nourriture, Transport, Logement, etc.)
- Suppression d'une transaction
- Description personnalisée

### Visualisation des données
- Affichage du solde total
- Affichage du total des revenus
- Affichage du total des dépenses
- Graphique circulaire des dépenses par catégorie
- Barres de progression avec pourcentages

### Filtrage et organisation
- Filtrage des transactions par mois
- Historique complet des transactions
- Sauvegarde automatique dans le navigateur

### Interface utilisateur
- Design responsive (mobile, tablette, desktop)
- Modal pour l'ajout de transaction
- Animations au survol
- Bannière de recherche d'alternance

---
```
## Architecture du projet
src/
|___  components/
│ |___BanniereAlternance.jsx # Bannière de recherche d'alternance
│ |___ CartesStats.jsx # Trois cartes (solde, revenus, dépenses)
│ |___ Danseurs.jsx # Éléments décoratifs animés
│ |___ FiltreMois.jsx # Filtre par mois
│ |___FormulaireTransaction.jsx # Formulaire d'ajout
│ |___ GraphiqueCamembert.jsx # Graphique circulaire
│ |___  Historique.jsx # Liste des transactions
│ |___ StatistiquesCategories.jsx # Barres de progression
│ |___ TransactionItem.jsx # Ligne d'une transaction
|___  data/
│ |___  categories.js # Liste des catégories (icônes, couleurs)
|___  hooks/
│ |___ useTransactions.js # Logique métier (hook personnalisé)
|___  App.jsx # Composant principal
|___ main.jsx # Point d'entrée
|___  index.css # Styles globaux Tailwind

```
---

## Structure des données

### Format d'une transaction


  id: "1678901234567",   // Identifiant unique (timestamp)
  type: "depense",    // "revenu" ou "depense"
  categorie: "Nourriture", // Catégorie sélectionnée
  montant: 45.50,   // Montant en euros
  description: "Courses", // Description libre
  date: "2026-04-17"      // Date au format ISO (YYYY-MM-DD)


## Explication technique

L'application stocke les transactions dans le navigateur avec localStorage. Au démarrage, elle charge les données sauvegardées. À chaque ajout ou suppression, elle sauvegarde automatiquement les modifications

L'interface est découpée en petits composants React indépendants. Les données circulent du composant principal vers les composants enfants via les props

Technologies utilisées : React, Tailwind CSS, Chart.js, localStorage, Vite.


----

## Installation et utilisation

### Prérequis

- Node.js (version 18 ou supérieure) doit être installé sur votre ordinateur
- npm est installé automatiquement avec Node.js

### Installation

1. Téléchargez le projet
2. Ouvrez un terminal dans le dossier du projet
3. Installez toutes les dépendances nécessaires avec la commande :
```bash
npm install
```
### lancer L'installation
Une fois l'installation terminée, tapez la commande suivante :
```
npm run dev
```
L'application s'ouvrira automatiquement à l'adresse : http://localhost:5173

## Utilisation

- Choisissez Revenu ou Dépense
- Entrez le montant et une description
- Sélectionnez une catégorie
- Cliquez sur Ajouter

Le solde et l'historique se mettent à jour automatiquement.
