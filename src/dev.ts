// Just a playground file
// Everything you write here will be executed by the commande
// deno run dev
// You can use this file to test things

import { PatriciaTrie } from "./Patricia/index.ts";
import { HybridTrie } from "./Hybrid/index.ts";
import { replacer } from "./helpers/index.ts";

let mots =
  `uwu awa ewe owo duwu o jdiao ioazd isnia iusui jisiu siusiu uisius iusiu sius iu siu suisuh`
    .replace(/[.,?]/g, "") // Retirer les ponctuations (non nécessaire, ligne facultative)
    .toLowerCase() // Convertir en minuscules (non nécessaire, ligne facultative)
    .split(/\s+/) // Diviser en mots par espaces
    .filter((mot) => mot.length > 0); // Retirer les mots vides

console.log("Hybrid Trie");

const trie = new HybridTrie();
// trie.insertMany("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k");
// trie.insertMany("aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak");
trie.insertMany("car");
console.log(JSON.stringify(trie, replacer, 2));
console.log(trie.listWords().sort());
