# Langage et interpréteur

Javascript Typescript
le projet a été codé et testé avec **Deno 2.0.5** mais n'importe quelle version de Deno 2.x.x devrait marcher

# Utilisation

- `deno run cli` vous permet d'intéragir avec les différentes commandes demandé par l'énoncer par exemple :
  - `deno run cli inserer 1 temp.txt` permet d'insérer les mots dans le fichier temp.txt dans un Trie Hybrid

- `deno test` permet de lancer les tests unitaires. Les test sont reconnaissable par leur extension sous la forme `.test.ts`. Il y en a un pour chaque trie dans le dossier correspondant.

- `deno run bench` permet de lancer les benchmarks. Les benchmarks sont reconnaissable par leur extension sous la forme `.bench.ts`. Il y en a un pour chaque trie dans le dossier correspondant.

