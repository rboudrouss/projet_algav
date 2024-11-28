import HybridTrieNode from "./HybridTrieNode";

export default class HybridTrie {
  root: HybridTrieNode | null;

  constructor() {
    this.root = null;
  }

  // Insertion
  insert(word: string) {
    if (!this.root) {
      this.root = new HybridTrieNode(word[0]);
    }
    this.root.insert(word);
    return this;
  }

  // Recherche
  search(word: string): boolean {
    return this.root?.search(word) ?? false;
  }

  // Affichage des mots
  display(): void {
    this.root?.display();
  }

  // Suppression
  delete(word: string): HybridTrie {
    if (!this.root) return this;
    this.root = this.root.delete(word);
    return this;
  }
}
