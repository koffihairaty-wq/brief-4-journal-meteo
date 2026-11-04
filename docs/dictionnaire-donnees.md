# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | M09 |
| date | date du relevé| |texte | format AAAA-10-22|- |2026-10-22 |
| temperatureC|température de l'air| nombre|Nombre valide, négatif ou décimal accepté |°C| 26|
| pluie Mm |quantité de pluie tombée |supérieur ou égal à 0| mm|15|
| humiditeAirPct |humidité relative l'air |nombre | entre 0 et 100|% | 9|

**Listes de valeurs autorisées** : il n'y a pas de liste fixe. Les valeurs doivent simplement respecter les règles indiquées dns le tableau.

**Sources** : SUJET .md et donnees/releves.js
