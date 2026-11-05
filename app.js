// Journal météorologique de la ferme — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { ajouterReleve, formaterReleve, listerReleves, trouverParId } from './src/registre.js';
import { SEUIL_JOUR_PLUVIEUX, joursPluvieux, trierParPluie, trierParTemperature, trouverParDate } from './src/recherche.js';
import { cumulPluie, moyenneTemperature, temperatureMinMax } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/releves.json';

async function main() {
  ouvrirSaisie();
  const releves = await chargerJson(FICHIER_DONNEES);
console.log(`${releves.length} relevé(s) chargé(s) depuis ${FICHIER_DONNEES}.`);
  console.log("==============================================");
  let choix = "";
do {
console.log("   JOURNAL MÉTÉOROLOGIQUE DE LA FERME");
console.log("   Suivi agroclimatique de la ferme pédagogique");
console.log("==============================================");
console.log("--------------- MENU ---------------");
console.log("1. Ajouter un relevé");
console.log("2. Lister les relevés");const releves = await chargerJson(FICHIER_DONNEES);
console.log(`${releves.length} relevé(s) chargé(s) depuis ${FICHIER_DONNEES}.`);
console.log("3. Rechercher (identifiant, date, journées pluvieuses)");
console.log("4. Trier (température, pluie)");
console.log("5. Synthèse de la série");
console.log("0. Quitter");
  choix = await demander("Votre choix : ");
  if (choix === null) {
  console.log("Saisie interrompue. Au revoir !");
  break;
}
if (choix === "0") {
console.log("Au revoir !");
} else if (choix === "1") {
 console.log("----- AJOUTER UN RELEVÉ -----");
  const id = await demander("Identifiant : ");
  const date = await demander("Date (AAAA-MM-JJ) : ");
  const temperatureC = await demander("Température (°C) : ");
  const pluieMm = await demander("Pluie (mm) : ");
  const humiditeAirPct = await demander("Humidité de l'air (%) : ");
  const saisie = {
    id,
    date,
    temperatureC: Number(temperatureC),
    pluieMm: Number(pluieMm),
    humiditeAirPct: Number(humiditeAirPct)
  };
  const erreurs = ajouterReleve(releves, saisie);
  if (erreurs.length > 0) {
    console.log("Relevé refusé :");
    console.log(erreurs.join("\n"));
  } else {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log("Relevé ajouté et enregistré avec succès !");
  }
} else if (choix === "2") {
console.log("----- LISTE DES RELEVÉS -----");
  console.log(listerReleves(releves));
} else {
console.log("Option pas encore disponible.");
}
console.log("--------------------------------");
} while (choix !== "0");






  fermerSaisie();
}

main();
