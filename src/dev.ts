// Just a playground file
// Everything you write here will be executed by the commande
// deno run dev
// You can use this file to test things

import { PatriciaTrie } from "./Patricia/index.ts";
import { HybridTrie } from "./Hybrid/index.ts";

let mots =
  `uwu awa ewe owo duwu o jdiao ioazd isnia iusui jisiu siusiu uisius iusiu sius iu siu suisuh`
    .replace(/[.,?]/g, "") // Retirer les ponctuations (non nécessaire, ligne facultative)
    .toLowerCase() // Convertir en minuscules (non nécessaire, ligne facultative)
    .split(/\s+/) // Diviser en mots par espaces
    .filter((mot) => mot.length > 0); // Retirer les mots vides

console.log("Hybrid Trie");

const trie = new HybridTrie();
trie.insert("car").insert("carts").insert("cat").insert("dog");
console.log(trie);

console.log(trie.search(""), false);
console.log(trie.search("c"), false);
console.log(trie.search("ca"), false);
console.log(trie.search("car"), true);
console.log(trie.search("carts"), true);
console.log(trie.search("cart"), false);
console.log(trie.search("cat"), true);
console.log(trie.search("dog"), true);
console.log(trie.search("doggy"), false);
