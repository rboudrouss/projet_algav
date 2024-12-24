import HybridTrieNode, { HybridTrieNodeI } from "./HybridTrieNode.ts";

export default class HybridTrie {
  root: HybridTrieNode | null; // racine
  max_depth: number; // profondeur max
  depth_sum: number; // profondeur moyenne

  constructor() {
    this.root = null;
    this.max_depth = 0;
    this.depth_sum = 0;
  }

  // Insertion
  insert(word: string) {
    if (!this.root) {
      this.root = new HybridTrieNode(word[0]);
    }
    let new_node = this.root.insert(word);
    let new_node_height = new_node.depth;
    if (new_node_height > this.max_depth) {
      this.max_depth = new_node_height;
    }
    this.depth_sum += new_node_height;
    let average_depth = (this.depth_sum + new_node_height) / this.root.count();
    if (average_depth / this.max_depth > 3) {
      this.root = this.root.balance();
    }

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

  // Compter le nombre de mots
  count(): number {
    return this.root?.count() ?? 0;
  }

  // Lister les mots
  listWords(): string[] {
    return this.root?.listWords() ?? [];
  }

  // Compter les noeuds nuls
  countNullNodes(): number {
    return this.root?.countNullNodes() ?? 1;
  }

  // Taille de l'arbre
  height(): number {
    return this.root?.height() ?? 0;
  }

  // Profondeur moyenne
  averageDepth(): number {
    return this.root?.averageDepth() ?? 0;
  }

  // le nombre de noeuds préfixe d'un mot
  countPrefixes(prefix: string): number {
    return this.root?.countPrefixes(prefix) ?? 0;
  }

  // Fusionner deux Hybrid-Tries
  merge(trie: HybridTrie): HybridTrie {
    if (!this.root) {
      this.root = trie.root;
    } else if (!trie.root) {
      return this;
    } else {
      this.root.merge(trie.root);
    }
    return this;
  }

  static fromJSON(json: HybridTrieNodeI): HybridTrie {
    const trie = new HybridTrie();
    try {
      trie.root = HybridTrieNode.fromJSON(json);
    } catch (err) {
      console.error("Erreur lors de la conversion du JSON en HybridTrie");
      console.error(err);
      Deno.exit();
    }
    return trie;
  }
}
