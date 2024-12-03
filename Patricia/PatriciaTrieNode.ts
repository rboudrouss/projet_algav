/*
 * Ici, on utilise un booléen pour ne pas avoir la contrainte de l'encodage.
 * Aussi, on utilise un Map pour stocker les enfants et on a recours à des méthodes haut niveau pour parcourir les enfants et déterminer si elle est vide.
 * C'est un peu tricher pour l'exo. Mais c'est voulu pour ne pas contraindre l'implémentation à un encodage particulier.
 * 
 * Si nous devions implémenter cela dans un langage de programmation bas niveau, (ou avoir une compréhension plus profonde de la structure de données) :
 *   - On pourrait utiliser un caractère pour marquer la fin d'un mot. (Remplacer le booléen)
 *   - On pourrait utiliser un tableau pour stocker les enfants. (Remplacer le Map) Pour cela plusieurs solutions sont possibles :
 *    - On pourrait utiliser un tableau de taille fixe (26 pour les lettres de l'alphabet ou 256 caractère unicode (-1 celui qu'on utilise pour marquer la fin)) et utiliser l'indice de la lettre pour accéder à l'enfant.
 *    - On pourrait utiliser une Hashtable pour stocker les enfants. (Tableau + Hashage)
 *    - On pourrait utiliser un tableau dynamique et parcourir le tableau pour trouver l'enfant. (Pas la meilleure solution)
 */
// FIXME
export default class PatriciaTrieNode {
  label: string;
  // Dans l'exo il est demandé d'utiliser un caractère pour marquer la fin d'un mot, j'utilise un booléen pour pas avoir la contrainte de l'encodage
  is_end_of_word: boolean;
  // ici un Map est plus approprié qu'un objet pour stocker les enfants
  children: Map<string, PatriciaTrieNode>;

  constructor(label: string = "", is_end_of_word: boolean = false) {
    this.label = label;
    this.is_end_of_word = is_end_of_word;
    this.children = new Map();
  }

  search(word: string): boolean {
    if (!word) return this.is_end_of_word;

    for (const [key, child] of this.children)
      if (word.startsWith(key)) return child.search(word.slice(key.length));

    return false; // Aucun chemin correspondant trouvé
  }

  insert(word: string): PatriciaTrieNode {
    if (!word) {
      this.is_end_of_word = true;
      return this;
    }

    // Trouver un enfant qui partage un préfixe
    for (const [key, child] of this.children) {
      let commonPrefixLength = 0;

      // Identifier le préfixe commun
      while (
        commonPrefixLength < key.length &&
        commonPrefixLength < word.length &&
        key[commonPrefixLength] === word[commonPrefixLength]
      )
        commonPrefixLength++;

      // Aucun préfixe commun, passer à l'enfant suivant
      if (commonPrefixLength === 0) continue;

      // Cas où tout le label de l'enfant correspond
      if (commonPrefixLength === key.length) {
        this.children.set(key, child.insert(word.slice(commonPrefixLength)));
        return this;
      }

      // supprimer l'enfant existant
      this.children.delete(key);

      // Fractionner l'enfant
      const commonPrefix = key.slice(0, commonPrefixLength);
      const oldSuffix = key.slice(commonPrefixLength);
      const remainingWord = word.slice(commonPrefixLength);

      // Nouveau noeud pour l'ancien suffixe
      const newChild = new PatriciaTrieNode(oldSuffix, child.is_end_of_word);
      newChild.children = child.children;

      // Mettre à jour l'enfant existant
      child.label = commonPrefix;
      child.is_end_of_word = false;
      child.children = new Map();
      child.children.set(oldSuffix, newChild);

      // Ajouter le reste du mot s'il en reste
      if (remainingWord.length > 0) {
        child.children.set(
          remainingWord,
          new PatriciaTrieNode(remainingWord, true)
        );
      } else {
        child.is_end_of_word = true;
      }

      this.children.set(commonPrefix, child);
      return this;
    }

    // Aucun préfixe commun, ajouter un nouveau noeud
    this.children.set(word, new PatriciaTrieNode(word, true));
    return this;
  }

  delete(word: string): PatriciaTrieNode | null {
    if (!word) {
      this.is_end_of_word = false;
      // Si le noeud n'a pas d'enfants, on peut le supprimer
      if (this.children.size === 0) return null;
      return this;
    }

    for (const [key, child] of this.children) {
      if (word.startsWith(key)) {
        const remainingWord = word.slice(key.length);
        const result = child.delete(remainingWord);

        if (result === null) this.children.delete(key);

        // Si ce noeud n'est plus une fin de mot et n'a pas d'enfants, on peut le supprimer
        if (!this.is_end_of_word && this.children.size === 0) return null;

        return this;
      }
    }

    return this;
  }

  display(indent = ""): void {
    console.log(
      `${indent}- ${this.label} ${this.is_end_of_word ? "(fin de mot)" : ""}`
    );

    // Parcourir les enfants avec un niveau d'indentation supplémentaire
    for (const child of this.children.values()) child.display(indent + "  ");
  }

  count() {
    let count = this.is_end_of_word ? 1 : 0;
    for (const child of this.children.values()) count += child.count();
    return count;
  }

  listWords(prefix = ""): string[] {
    const words: string[] = [];

    if (this.is_end_of_word) words.push(prefix);

    for (const [key, child] of this.children)
      words.push(...child.listWords(prefix + key));

    return words;
  }

  countNullNodes(): number {
    let count = 0;
    for (const child of this.children.values()) count += child.countNullNodes();
    if (this.children.size === 0) count++; // HACK .size c'est un peu tricher pour l'exo
    return count;
  }

  height(): number {
    let height = 0;
    for (const child of this.children.values())
      height = Math.max(height, child.height());
    return height + 1;
  }

  averageDepth(): number {
    let sum = 0;
    for (const child of this.children.values()) sum += child.averageDepth();
    return sum / this.children.size + 1; // HACK .size c'est un peu tricher pour l'exo
  }

  // FIXME pas sûr de la méthode
  countPrefixes(prefix: string): number {
    if (!prefix) return this.count();
    for (const [key, child] of this.children)
      if (prefix.startsWith(key))
        return child.countPrefixes(prefix.slice(key.length));
    return 0;
  }

  // FIXME pas sûr de la méthode
  merge(node: PatriciaTrieNode): PatriciaTrieNode {
    if (node.is_end_of_word) this.is_end_of_word = true;
    for (const [key, child] of node.children) {
      if (this.children.has(key)) {
        this.children.get(key)!.merge(child);
      } else {
        this.children.set(key, child);
      }
    }
    return this;
  }

  static fromJson(json: PatriciaTrieNodeI): PatriciaTrieNode {
    const node = new PatriciaTrieNode(json.label, json.is_end_of_word);
    node.children = new Map(
      Object.entries(json.children).map(([key, value]) => [
        key,
        PatriciaTrieNode.fromJson(value),
      ])
    );
    return node;
  }
}

export interface PatriciaTrieNodeI {
  label: string;
  is_end_of_word: boolean;
  children: Record<string, PatriciaTrieNodeI>;
}
