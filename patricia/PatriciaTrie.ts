import PatriciaTrieNode from "./PatriciaTrieNode";

// TODO hmmm cette classe est-elle vraiment nécessaire ?
export default class PatriciaTrie {
  root: PatriciaTrieNode;

  constructor() {
    this.root = new PatriciaTrieNode();
  }

  // Primitive : Recherche d'un mot
  search(word: string): boolean {
    return this.root.search(word);
  }

  // Primitive : Insérer un mot
  insert(word: string) {
    this.root.insert(word);
    return this;
  }

  // Primitive : Suppression d'un mot
  delete(word: string) {
    this.root.delete(word);
    return this;
  }

  // Primitive : Afficher le Patricia-Trie
  display(): void {
    this.root.display();
  }
}
