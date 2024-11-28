export default class PatriciaTrieNode {
  label: string;
  // Dans l'exo il est demandé d'utiliser un caractère pour marquer la fin d'un mot, j'utilise un booléen pour pas avoir la contrainte de l'encodage
  isEndOfWord: boolean;
  // ici un Map est plus approprié qu'un objet pour stocker les enfants
  children: Map<string, PatriciaTrieNode>;

  constructor(label: string = "", isEndOfWord: boolean = false) {
    this.label = label;
    this.isEndOfWord = isEndOfWord;
    this.children = new Map();
  }

  search(word: string): boolean {
    if (!word) return this.isEndOfWord;

    for (const [key, child] of this.children)
      if (word.startsWith(key)) return child.search(word.slice(key.length));

    return false; // Aucun chemin correspondant trouvé
  }

  insert(word: string): PatriciaTrieNode {
    if (!word) {
      this.isEndOfWord = true;
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
      const newChild = new PatriciaTrieNode(oldSuffix, child.isEndOfWord);
      newChild.children = child.children;

      // Mettre à jour l'enfant existant
      child.label = commonPrefix;
      child.isEndOfWord = false;
      child.children = new Map();
      child.children.set(oldSuffix, newChild);

      // Ajouter le reste du mot s'il en reste
      if (remainingWord.length > 0) {
        child.children.set(
          remainingWord,
          new PatriciaTrieNode(remainingWord, true)
        );
      } else {
        child.isEndOfWord = true;
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
      this.isEndOfWord = false;
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
        if (!this.isEndOfWord && this.children.size === 0) return null;

        return this;
      }
    }

    return this;
  }

  display(indent = ""): void {
    console.log(
      `${indent}- ${this.label} ${this.isEndOfWord ? "(fin de mot)" : ""}`
    );

    // Parcourir les enfants avec un niveau d'indentation supplémentaire
    for (const child of this.children.values()) child.display(indent + "  ");
  }

  count() {
    let count = this.isEndOfWord ? 1 : 0;
    for (const child of this.children.values()) count += child.count();
    return count;
  }

  listWords(prefix = ""): string[] {
    const words: string[] = [];

    if (this.isEndOfWord) words.push(prefix);

    for (const [key, child] of this.children)
      words.push(...child.listWords(prefix + key));

    return words;
  }

  countNullNodes(): number {
    let count = 0;
    for (const child of this.children.values())
      count += child.countNullNodes();
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
    for (const child of this.children.values())
      sum += child.averageDepth();
    return sum / this.children.size + 1; // HACK .size c'est un peu tricher pour l'exo
  }

  // FIXME pas sûr de la méthode	
  countPrefixes(prefix: string): number {
    if (!prefix) return this.count();
    for (const [key, child] of this.children)
      if (prefix.startsWith(key)) return child.countPrefixes(prefix.slice(key.length));
    return 0;
  }

  // FIXME pas sûr de la méthode	
  merge(node: PatriciaTrieNode): PatriciaTrieNode {
    if (node.isEndOfWord) this.isEndOfWord = true;
    for (const [key, child] of node.children) {
      if (this.children.has(key)) {
        this.children.get(key)!.merge(child);
      } else {
        this.children.set(key, child);
      }
    }
    return this;
  }


}
