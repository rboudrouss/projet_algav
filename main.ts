import { PatriciaTrie } from "./Patricia";

let mots =
  `A quel genial professeur de dactylographie sommes nous redevables de la superbe phrase ci dessous, un modele du genre, que toute dactylo connait par coeur puisque elle fait appel a chacune des touches du clavier de la machine a ecrire ?`
    .replace(/[.,?]/g, "") // Retirer les ponctuations (non nécessaire, ligne facultative)
    .toLowerCase() // Convertir en minuscules (non nécessaire, ligne facultative)
    .split(/\s+/) // Diviser en mots par espaces
    .filter((mot) => mot.length > 0); // Retirer les mots vides

const trie = new PatriciaTrie();

mots.forEach((mot) => trie.insert(mot));

trie.display();
