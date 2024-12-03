import PatriciaTrieNode, { PatriciaTrieNodeI } from "./PatriciaTrieNode";

// TODO hmmm cette classe est-elle vraiment nécessaire ?
export default class PatriciaTrie {
  root: PatriciaTrieNode;

  constructor() {
    this.root = new PatriciaTrieNode();
  }

  // Recherche d'un mot
  search(word: string): boolean {
    return this.root.search(word);
  }

  // Insérer un mot
  insert(word: string) {
    this.root.insert(word);
    return this;
  }

  // Suppression d'un mot
  delete(word: string) {
    this.root.delete(word);
    return this;
  }

  // Afficher le Patricia-Trie
  display(): void {
    this.root.display();
  }

  // Compter le nombre de mots
  count(): number {
    return this.root.count();
  }

  // Lister les mots
  listWords(): string[] {
    return this.root.listWords();
  }

  // Compter les noeuds nuls
  countNullNodes(): number {
    return this.root.countNullNodes();
  }

  // Taille de l'arbre
  height(): number {
    return this.root.height();
  }

  // Profondeur moyenne
  averageDepth(): number {
    return this.root.averageDepth();
  }

  // le nombre de noeuds préfixe d'un mot
  countPrefixes(prefix: string): number {
    return this.root.countPrefixes(prefix);
  }

  // Fusionner deux Patricia-Tries
  merge(trie: PatriciaTrie): PatriciaTrie {
    this.root.merge(trie.root);
    return this;
  }
  
  static fromJson(json: PatriciaTrieNodeI): PatriciaTrie {
    const trie = new PatriciaTrie();
    trie.root = PatriciaTrieNode.fromJson(json);
    return trie;
  }
}
