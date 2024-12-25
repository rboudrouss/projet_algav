// CLI pour manipuler les arbres Patricia et Hybrid

import { readAndProcessFile, readJsonFile, replacer } from "./helpers/index.ts";
import { HybridTrie, type HybridTrieNodeJSON } from "./Hybrid/index.ts";
import { PatriciaTrie, type PatriciaTrieNodeJSON } from "./Patricia/index.ts";

const args = Deno.args;

const actions: {
  [key: string]: {
    "0": (...args: string[]) => void; // PatriciaTrie
    "1": (...args: string[]) => void; // HybridTrie
  };
} = {
  inserer: {
    "0": (fichier: string) => {
      const trie = new PatriciaTrie();
      const content = readAndProcessFile(fichier);
      content.forEach((mot) => trie.insert(mot));
      const out = JSON.stringify(trie.root, replacer, 2);
      Deno.writeTextFileSync("pat.json", out);
    },
    "1": (fichier: string) => {
      const trie = new HybridTrie();
      const content = readAndProcessFile(fichier);
      content.forEach((mot) => trie.insert(mot));
      const out = JSON.stringify(trie.root, replacer, 2);
      Deno.writeTextFileSync("trie.json", out);
    },
  },
  suppression: {
    "0": (fichier: string) => {
      const trie = PatriciaTrie.fromJson(
        readJsonFile("pat.json") as PatriciaTrieNodeJSON
      );
      const content = readAndProcessFile(fichier);
      content.forEach((mot) => trie.delete(mot));
      const out = JSON.stringify(trie.root, replacer, 2);
      Deno.writeTextFileSync("pat.json", out);
    },
    "1": (fichier: string) => {
      const trie = HybridTrie.fromJSON(
        readJsonFile("trie.json") as HybridTrieNodeJSON
      );
      const content = readAndProcessFile(fichier);
      content.forEach((mot) => trie.delete(mot));
      const out = JSON.stringify(trie.root, replacer, 2);
      Deno.writeTextFileSync("trie.json", out);
    },
  },
  fusion: {
    "0": (fichier1: string, fichier2: string) => {
      const trie1 = PatriciaTrie.fromJson(
        readJsonFile(fichier1) as PatriciaTrieNodeJSON
      );
      const trie2 = PatriciaTrie.fromJson(
        readJsonFile(fichier2) as PatriciaTrieNodeJSON
      );
      trie1.merge(trie2);
      const out = JSON.stringify(trie1.root, replacer, 2);
      Deno.writeTextFileSync("pat.json", out);
    },
    "1": (fichier1: string, fichier2: string) => {
      const trie1 = HybridTrie.fromJSON(
        readJsonFile(fichier1) as HybridTrieNodeJSON
      );
      const trie2 = HybridTrie.fromJSON(
        readJsonFile(fichier2) as HybridTrieNodeJSON
      );
      trie1.merge(trie2);
      const out = JSON.stringify(trie1.root, replacer, 2);
      Deno.writeTextFileSync("trie.json", out);
    },
  },
  listeMots: {
    "0": (fichier: string) => {
      const trie = PatriciaTrie.fromJson(
        readJsonFile(fichier) as PatriciaTrieNodeJSON
      );
      const out = trie.listWords().join("\n");
      Deno.writeTextFileSync("mot.txt", out);
    },
    "1": (fichier: string) => {
      const trie = HybridTrie.fromJSON(
        readJsonFile(fichier) as HybridTrieNodeJSON
      );
      const out = trie.listWords().join("\n");
      Deno.writeTextFileSync("mot.txt", out);
    },
  },
  profondeurMoyenne: {
    "0": (fichier: string) => {
      const trie = PatriciaTrie.fromJson(
        readJsonFile(fichier) as PatriciaTrieNodeJSON
      );
      const out = trie.averageDepth().toString();
      Deno.writeTextFileSync("profondeur.txt", out);
    },
    "1": (fichier: string) => {
      const trie = HybridTrie.fromJSON(
        readJsonFile(fichier) as HybridTrieNodeJSON
      );
      const out = trie.averageDepth().toString();
      Deno.writeTextFileSync("profondeur.txt", out);
    },
  },
  prefixe: {
    "0": (fichier: string, prefixe: string) => {
      const trie = PatriciaTrie.fromJson(
        readJsonFile(fichier) as PatriciaTrieNodeJSON
      );
      const out = trie.countPrefixes(prefixe).toString();
      Deno.writeTextFileSync("prefixe.txt", out);
    },
    "1": (fichier: string, prefixe: string) => {
      const trie = HybridTrie.fromJSON(
        readJsonFile(fichier) as HybridTrieNodeJSON
      );
      const out = trie.countPrefixes(prefixe).toString();
      Deno.writeTextFileSync("prefixe.txt", out);
    },
  },
};

// Equivalent de if __name__ == "__main__" et/ou la fonction main
if (import.meta.main) {
  if (!(args.length > 2 && args[0] in actions && args[1] in ["0", "1"])) {
    console.log("Arguments invalides");
    console.log("arguments: ", args);
    showHelp();
  }

  // @ts-ignore: args[1] est soit "0" soit "1", donc args[1] est une clé valide pour actions[args[0]]
  actions[args[0]][args[1]](...args.slice(2));
}

// ==================================================
// HELPERS
// ==================================================

function showHelp() {
  const helpTxt = `Usage: commande [options] [Type] [argument(s)]
Example : inserer 0 fichier.txt

Type:
  0 : Patricia-Trie
  1 : Hybrid-Trie

Options:
  - inserer <T> <fichier> : insère les mots du fichier <fichier> dans l'arbre. Fichier doit être un fichier texte. Crée un fichier JSON contenant l'arbre nommé pat.json ou trie.json selon le type.
  - suppression <T> <fichier> : lit le JSON nommé pat.json ou trie.json selon le type, supprime les mots du fichier <fichier> et écrit le résultat dans le même fichier.
  - fusion <T> arbre1.json arbre2.json : fusionne les arbres arbre1.json et arbre2.json et écrit le résultat dans un fichier JSON nommé pat.json ou trie.json selon le type.
  - listeMots <T> arbre.json : lit le JSON nommé arbre.json et écris la liste des mots dans le fichier mot.txt.
  - profondeurMoyenne <T> arbre.json : lit le JSON nommé arbre.json et écris la profondeur moyenne dans le fichier profondeur.txt.
  - prefixe <T> arbre.json <prefixe> : lit le JSON nommé arbre.json et écris l'entier correspondant au nombre de mots de l'arbre tels que le mot <prefixe> en est un préfixe. Le résultat sera écrit dans le fichier prefixe.txt`;
  console.log(helpTxt);
  Deno.exit();
}
