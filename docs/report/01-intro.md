# 1. Introduction

Dans le carde de l'unité d'enseignement d'Algorithmique Avancée (MU4IN500 - AlgAv), nous avons réaliser ce projet portant sur les structures de trie : Trie Hybride, et Patricia Trie afin de représenter un dictionnaire de mot.


## Langage et interpréteur

Nous avons réalisé ce projet en utilisant un sur-ensemble de Javascript, à savoir **Typescript**. Le projet a été codé et testé avec **Deno 2.0.5** mais n'importe quelle version de Deno 2.x.x devrait marcher.

**Javascript** est un langage multiparadigme, pour notre cas son coté fonctionnel et orienté objet nous a permis de réaliser ce projet de manière efficace. Il dispose d'une bibliothèque standard très étoffée notamment en ce qui concerne la manipulation des chaînes de caractères et supporte nativement le JSON. Les moteurs Javascript sont très performants ce qui est crucial quand il s'agit de traiter de grandes quantités de données.

Nous avons choisi d'utiliser **Typescript** car il permet de définir des types pour les variables et les fonctions, ce qui permet de détecter plus facilement les erreurs de programmation et avoir un code plus robuste.

**Deno** est un environnement d'exécution pour Javascript et Typescript, et un des seuls qui supporte nativement le Typescript sans avoir besoin de transpiler le code. Il est sécurisé par défaut, et ne permet pas l'accès au système de fichiers ou au réseau sans autorisation explicite. Il est également très performant et dispose d'une bibliothèque standard très complète.


## Utilisation

`deno run cli` vous permet d'intéragir avec les différentes commandes demandé par l'énoncer par exemple :

- `deno run cli inserer 1 temp.txt` permet d'insérer les mots dans le fichier temp.txt dans un Trie Hybrid

`deno test` permet de lancer les tests unitaires. Les test sont reconnaissable par leur extension sous la forme `.test.ts`. Il y en a un pour chaque trie dans le dossier correspondant.

`deno run bench` permet de lancer les benchmarks. Les benchmarks sont reconnaissable par leur extension sous la forme `.bench.ts`. Il y en a un pour chaque trie dans le dossier correspondant.

<!> Exécutez les commandes au root du projet. soit le **parent** de /src (là où se trouve les fichiers de configuration de Deno et le README.Md).

## Arborecense

- `src/` contient le code source du projet
- `src/cli.ts` contient le code de l'interface en ligne de commande
- `src/dev.ts` contient un playground pour tester les tries (executable avec `deno run dev`)
- `src/HybridTrie/` contient le code du Trie Hybride (incluant les tests et les benchmarks)
- `src/PatriciaTrie/` contient le code du Patricia Trie (incluant les tests et les benchmarks)
- `src/helpers/` contient des fonctions utilitaires

- `docs/` contient le code source du rapport
- `docs/diapos/` contient les fichiers sources des diapositives
- `docs/report/` contient les fichiers sources du rapport
- `docs/scripts/` contient les scripts pour générer les images du rapport

- `Shakespeare/` contient les texts de Shakespeare (fournis par l'énoncé et utilisés pour les tests et les benchmarks)

Au root du projet, on trouve aussi :
- `deno.json` et `deno.lock` les fichiers de configuration de Deno
- `README.md` 
- `rapport.pdf` le rapport généré (que vous êtes en train de lire)
- `diapos.pdf` les diapositives générées

Tous les fichiers générés et lu par le cli doivent être dans le root du projet. (pour les fichiers lu le chemain doit être relatif au root du projet).