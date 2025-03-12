# XLSX to DB Importer

This is a Unix-friendly command line application written in TypeScript that imports XLSX data into an SQLite database using **exceljs**'s streaming API.

# Best response time
<img src="/best-response-time.png" alt="Best response time" width="1000" />

## Features

- **CLI Tool:** Reads XLSX data from a file specified as a command-line argument.
- **Streaming:** Uses exceljs streaming API to efficiently process large XLSX files.
- **Database:** Uses SQLite to store data with a simple schema.
- **Batch Processing:** Inserts data in batches using transactions for performance.
- **Testing:** Includes tests (using Jest and ts-jest) for the XLSX streaming parser and database insertion.
- **Documentation:** Detailed instructions for installation, usage, and testing.

## Installation

1. Clone the repository.
2. Run `npm install` to install all dependencies.

## Usage

Assuming your XLSX file is named `people.xlsx` and is at the root of the repository, run:

```bash
npm start -- people.xlsx
```

## Test
```bash
npm test
```
---------------------------------------------------------------------------------------

# Importateur XLSX vers DB

Ceci est une application en ligne de commande compatible avec Unix écrite en TypeScript qui importe des données XLSX dans une base de données SQLite en utilisant l'API de streaming d'**exceljs**.

## Best response time
<img src="/best-response-time.png" alt="Best response time" width="1000" />

## Fonctionnalités

- **Outil CLI:** Lit les données XLSX à partir d'un fichier spécifié comme argument en ligne de commande.
- **Streaming:** Utilise l'API de streaming d'exceljs pour traiter efficacement les grands fichiers XLSX.
- **Base de données:** Utilise SQLite pour stocker les données avec un schéma simple.
- **Traitement par lots:** Insère les données par lots à l'aide de transactions pour les performances.
- **Tests:** Inclut des tests (utilisant Jest et ts-jest) pour l'analyseur de streaming XLSX et l'insertion dans la base de données.
- **Documentation:** Instructions détaillées pour l'installation, l'utilisation et les tests.

## Installation

1. Clonez le dépôt.
2. Exécutez `npm install` pour installer toutes les dépendances.

## Utilisation

```bash
npm start -- people.xlsx
```

## Test
```bash
npm test