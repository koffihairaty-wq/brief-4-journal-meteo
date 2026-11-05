# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : 
**Température moyenne :**
26+28+30+27+29+28+27+29+30+26=280; 280:10
=28 °C
**Température minimale :**
26 °C (M03 et M08)
**Température maximale :**
30 °C (M06 et M10)
**Cumul de pluie :**
0+5+12+0+3+0+8+15+0+2 = 45mm
**Journées avec au moins 10 mm de pluie :**
M03 = 12 mm
M08 = 15 mm
Total = 2 journées
Ces calculs ont été réalisés à partir des 10 relevés du fichier donnees/releves.json.
Les résultats seront comparés avec ceux du programme lors des tests.

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Afficher la synthèse (choix 5) |10 relevés, 45 mm, moyenne 28 °C, min 26 °C, max 30 °C, 2 journées pluvieuses |Conforme | Moi|
| Saisir un choix inconnu (9) |Affichage de « Choix invalide. » et retour au menu |Conforme | Moi|
| Rechercher un identifiant inexistant (M99) |Afficher « Aucun relevé trouvé. » |Conforme | Moi|
| Trier par température croissante (choix 4 puis 1) |Températures classées de 26 °C à 30 °C |Conforme |Moi |
| Trier par pluie croissante (choix 4 puis 2) |Pluies classées de 0 à 15 mm |Conforme |Moi  |
|  Afficher les journées pluvieuses (choix 3 puis 3) |Affichage de M03 (12 mm) et M08 (15 mm) |Conforme |Moi |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : Test réalisé avec succès sur un autre ordinateur : récupération du projet avec git clone, lancement de l'application avec node app.js et exécution des tests avec npm test.
