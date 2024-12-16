import { PatriciaTrie } from "./Patricia/index.ts";
import { HybridTrie } from "./Hybrid/index.ts";

let mots =
  `A quel genial professeur de dactylographie sommes nous redevables de la superbe phrase ci dessous, un modele du genre, que toute dactylo connait par coeur puisque elle fait appel a chacune des touches du clavier de la machine a ecrire ?`
    .replace(/[.,?]/g, "") // Retirer les ponctuations (non nécessaire, ligne facultative)
    .toLowerCase() // Convertir en minuscules (non nécessaire, ligne facultative)
    .split(/\s+/) // Diviser en mots par espaces
    .filter((mot) => mot.length > 0); // Retirer les mots vides

console.log("Patricia Trie");

let trie = new PatriciaTrie();

mots.forEach((mot) => trie.insert(mot));

trie.display();

console.log(trie.search("professeur")); // true

console.log("Hybrid Trie");

let hybridTrie = new HybridTrie();

mots.forEach((mot) => {
  hybridTrie.insert(mot);
  hybridTrie.display();
});

hybridTrie.display();

hybridTrie.display();
