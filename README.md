# Journal météorologique de la ferme

## Contexte

Le Journal météorologique de la ferme est une application créée avec JavaScript et Node.js pour faciliter le suivi de la météo au niveau de la ferme pédagogique. Elle permet au responsable d'enregistrer chaque jour la température, la quantité de pluie et l'humidité de l'air.
Grâce à cette application, il peut retrouver les informations d'une journée, classer les relevés et obtenir un résumé des données enregistrées.
Cependant, les dix jours de relevés permettent seulement d'observer la météo sur une courte période et non de caractériser le climat de la région, qui s'étudie généralement sur une période d'environ 30 ans.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-4-journal-meteo.git
cd brief-4-journal-meteo
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [ X] Données lues et enregistrées dans `donnees/releves.json`
- [ X] Ajouter un relevé, saisies invalides refusées sans arrêter le programme
- [ X] Lister les relevés, message si le journal est vide
- [ X] Rechercher par identifiant ou par date ; journées pluvieuses (au moins 10 mm)
- [X ] Trier par température ou par pluie
- [ X] Synthèse : température moyenne, minimale et maximale de la série, cumul de pluie, journées pluvieuses
- [ X] Bonus : supprimer et modifier un relevé (choix 6 et 7)
- [X ] Bonus : tri par température décroissante, journée la plus chaude

## Données

Le fichier `donnees/releves.json` contient initialement 10 relevés fictifs du 15 au 24 octobre 2026.
Chaque relevé comprend un identifiant unique, une date, une température en °C, une quantité de pluie en mm et une humidité relative de l'air en %.
Ces données sont utilisées uniquement dans le cadre de cet exercice pédagogique.

## Limites

- Les 10 jours de relevés sont insuffisants pour décrire le climat d'une région.
- Les données sont fictives et ne proviennent pas d'une station météorologique réelle.
- L'application fonctionne uniquement dans le terminal et ne possède pas d'interface graphique.

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

**Prénom et nom :** KOFFI Amoin Hairaty Victoire
**Compte GitHub :** koffihairaty-wq
**Entraide :** Pendant la réalisation de ce projet individuel, j'ai travaillé en collaboration avec un groupe de dix apprenants de ma salle ayant le même sujet que moi. Nous avons partagé nos idées, confronté nos interprétations des consignes et recherché ensemble des solutions aux difficultés rencontrées.
J'ai également bénéficié de l'accompagnement de certains camarades, qui m'ont aidée à mieux comprendre plusieurs notions techniques et à progresser dans mon travail.
Personnes m'ayant particulièrement apporté leur aide :
- KOUAME KOUADIO K. Florent
- KANGA Jules Chris