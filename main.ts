import { PatriciaTrie } from "./Patricia/index.ts";
import { HybridTrie } from "./Hybrid/index.ts";

let mots =
  `uwu awa ewe owo duwu o jdiao ioazd isnia iusui jisiu siusiu uisius iusiu sius iu siu suisuh`
    .replace(/[.,?]/g, "") // Retirer les ponctuations (non nécessaire, ligne facultative)
    .toLowerCase() // Convertir en minuscules (non nécessaire, ligne facultative)
    .split(/\s+/) // Diviser en mots par espaces
    .filter((mot) => mot.length > 0); // Retirer les mots vides

console.log("Hybrid Trie");

let hybridTrie = new HybridTrie();

hybridTrie.insert("car").insert("cat");
hybridTrie.display();
console.log("Nombre de mots: ", hybridTrie.count());
hybridTrie.delete("cat");
hybridTrie.display();

console.log(hybridTrie)
console.log(hybridTrie.search("cat"));
console.log(hybridTrie.search("car"))
