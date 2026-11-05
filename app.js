// Journal météorologique de la ferme — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { ajouterReleve, formaterReleve, listerReleves, trouverParId } from './src/registre.js';
import { SEUIL_JOUR_PLUVIEUX, joursPluvieux, trierParPluie, trierParTemperature, trouverParDate } from './src/recherche.js';
import { cumulPluie, moyenneTemperature, temperatureMinMax } from './src/synthese.js';
import { supprimerReleve, modifierReleve, trierParTemperatureDecroissante, journeeLaPlusChaude} from './src/bonus.js';

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
console.log("2. Lister les relevés");
console.log("3. Rechercher (identifiant, date, journées pluvieuses)");
console.log("4. Trier (température, pluie)");
console.log("5. Synthèse de la série");
console.log("6. Supprimer un relevé");
console.log("7. Modifier un relevé");
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
} else if (choix === "3") {
  console.log("----- RECHERCHER UN RELEVÉ -----");
  console.log("1. Rechercher par identifiant");
  console.log("2. Rechercher par date");
  console.log("3. Afficher les journées pluvieuses");
const choixRecherche = await demander("Votre choix de recherche : ");
if (choixRecherche === "1") {
  const idRecherche = await demander("Identifiant à rechercher : ");
  const releveTrouve = trouverParId(releves, idRecherche);
  if (releveTrouve === undefined) {
    console.log("Aucun relevé trouvé.");
  } else {
    console.log(formaterReleve(releveTrouve));
  }
} else if (choixRecherche === "2") {
  const dateRecherche = await demander("Date à rechercher (AAAA-MM-JJ) : ");
  const releveTrouve = trouverParDate(releves, dateRecherche);
  if (releveTrouve === undefined) {
    console.log("Aucun relevé trouvé pour cette date.");
  } else {
  console.log(formaterReleve(releveTrouve));
}
} else if (choixRecherche === "3") {
  const resultat = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
  console.log("----- JOURNÉES PLUVIEUSES -----");
  if (resultat.length === 0) {
    console.log("Aucune journée pluvieuse trouvée.");
  } else {
    console.log(listerReleves(resultat));
  }
} else {
  console.log("Choix de recherche invalide.");
}
} else if (choix === "4") {
  console.log("TEST : LE CHOIX 4 EST BIEN EXECUTE");
  console.log("----- TRIER LES RELEVÉS -----");
  console.log("1. Trier par température croissante");
  console.log("2. Trier par pluie croissante");
  const choixTri = await demander("Votre choix de tri : ");
  if (choixTri === "1") {
    const resultat = trierParTemperature(releves);
    console.log("----- TRI PAR TEMPÉRATURE -----");
    console.log(listerReleves(resultat));
  } else if (choixTri === "2") {
    const resultat = trierParPluie(releves);
    console.log("----- TRI PAR PLUIE -----");
    console.log(listerReleves(resultat));
  } else {
    console.log("Choix de tri invalide.");
  }
} else if (choix === "5") {
  console.log("----- SYNTHÈSE DE LA SÉRIE -----");
  const totalPluie = cumulPluie(releves);
  const moyenne = moyenneTemperature(releves);
  const temperatures = temperatureMinMax(releves);
  const jours = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
  console.log(`Nombre de relevés : ${releves.length}`);
  console.log(`Cumul de pluie : ${totalPluie} mm`);
  console.log(`Température moyenne : ${moyenne === null ? "Aucune donnée" : moyenne + " °C"}`);
  console.log(`Température minimale : ${temperatures.min === null ? "Aucune donnée" : temperatures.min + " °C"}`);
  console.log(`Température maximale : ${temperatures.max === null ? "Aucune donnée" : temperatures.max + " °C"}`);
  console.log(`Journées avec au moins 10 mm de pluie : ${jours.length}`);
} else if (choix === "6") {
  console.log("----- SUPPRIMER UN RELEVÉ -----");
  const id = (await demander("Identifiant : ")).toUpperCase();
  const releveSupprime = supprimerReleve(releves, id);
  if (releveSupprime === undefined) {
    console.log(`Relevé ${id} introuvable.`);
  } else {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log(`Relevé ${id} supprimé. Le journal compte ${releves.length} relevé(s).`);
  } 
} else if (choix === "7") {
  console.log("----- MODIFIER UN RELEVÉ -----");
  const id = (await demander("Identifiant : ")).toUpperCase();
  const champ = await demander("Champ à modifier (date, temperatureC, pluieMm, humiditeAirPct) : ");
  const valeur = await demander("Nouvelle valeur : ");
  const erreurs = modifierReleve(releves, id, champ, valeur);
  if (erreurs.length > 0) {
    console.log("Modification refusée :");
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
  } else {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log(`Relevé ${id} modifié.`);
}
} else {
  console.log("Choix invalide.");
}
console.log("--------------------------------");
} while (choix !== "0");






  fermerSaisie();
}

main();
