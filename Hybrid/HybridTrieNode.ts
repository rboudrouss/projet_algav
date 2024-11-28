// FIXME quand c'est fin de mot j'ai des undefined

export default class HybridTrieNode {
  char: string; // Le caractère stocké dans le nœud
  isEndOfWord: boolean; // Indique si c'est la fin d'un mot
  left: HybridTrieNode | null; // Fils gauche
  middle: HybridTrieNode | null; // Fils milieu
  right: HybridTrieNode | null; // Fils droit

  constructor(char: string, isEndOfWord = false) {
    this.char = char;
    this.isEndOfWord = isEndOfWord;
    this.left = null;
    this.middle = null;
    this.right = null;
  }

  search(word: string): boolean {
    if (word.length === 1) return this.isEndOfWord;
    const char = word[0];

    if (char < this.char) {
      return this.left?.search(word) ?? false;
    }
    if (char > this.char) {
      return this.right?.search(word) ?? false;
    }
    return this.middle?.search(word.slice(1)) ?? false;
  }

  insert(word: string): HybridTrieNode {
    if (word.length === 1) {
      this.isEndOfWord = true;
      return this;
    }

    const char = word[0];

    if (char < this.char) {
      this.left ??= new HybridTrieNode(char);
      this.left = this.left.insert(word);
    } else if (char > this.char) {
      this.right ??= new HybridTrieNode(char);
      this.right = this.right.insert(word);
    } else {
      this.middle ??= new HybridTrieNode(word[1]);
      if (word.length > 1) this.middle = this.middle.insert(word.slice(1));
      else this.middle.isEndOfWord = true;
    }

    return this;
  }

  delete(word: string): HybridTrieNode | null {
    if (word.length === 1) {
      this.isEndOfWord = false;
      if (!this.left && !this.middle && !this.right) return null;
      return this;
    }

    const char = word[0];

    if (char < this.char) {
      this.left = this.left?.delete(word) ?? null;
    } else if (char > this.char) {
      this.right = this.right?.delete(word) ?? null;
    } else {
      this.middle = this.middle?.delete(word.slice(1)) ?? null;
    }

    // HACK pour supprimer les noeuds vides, y a probablement une meilleure façon de faire directement dans les conditions ci-dessus
    if (!this.left && !this.middle && !this.right && !this.isEndOfWord) return null;
    return this;
  }

  display(prefix = ""): void {
    this.left?.display(prefix);

    if (this.isEndOfWord) {
      console.log(prefix + this.char);
    }

    if (!this.middle && !this.left && !this.right && !this.isEndOfWord) {
      console.log(prefix + this.char + " (fin de branche (isEndOfWord=False))");
    }

    this.middle?.display(prefix + this.char);
    this.right?.display(prefix);
  }

  displayOld(prefix = "", isTail = true): void {
    // Afficher le nœud courant
    console.log(
      `${prefix}${isTail ? "└── " : "├── "}${this.char}${
        this.isEndOfWord ? " (fin de mot)" : ""
      }`
    );

    // Préparer le préfixe pour les enfants
    const childPrefix = prefix + (isTail ? "    " : "│   ");

    // Parcourir les trois enfants
    const children = [
      { child: this.left, label: "Left" },
      { child: this.middle, label: "Middle" },
      { child: this.right, label: "Right" },
    ];

    const nonNullChildren = children.filter((c) => c.child !== null);
    nonNullChildren.forEach((child, index) => {
      child.child?.displayOld(
        childPrefix,
        index === nonNullChildren.length - 1
      );
    });
  }

  count(): number {
    let count = this.isEndOfWord ? 1 : 0;
    count += this.left?.count() ?? 0;
    count += this.middle?.count() ?? 0;
    count += this.right?.count() ?? 0;
    return count;
  }

  listWords(prefix = ""): string[] {
    const words: string[] = [];

    if (this.isEndOfWord) words.push(prefix);

    if (this.left) words.push(...this.left.listWords(prefix));
    if (this.middle) words.push(...this.middle.listWords(prefix + this.char));
    if (this.right) words.push(...this.right.listWords(prefix));

    return words;
  }

  countNullNodes(): number {
    let count = 0;
    if (!this.left) count++;
    if (!this.middle) count++;
    if (!this.right) count++;
    count += this.left?.countNullNodes() ?? 0;
    count += this.middle?.countNullNodes() ?? 0;
    count += this.right?.countNullNodes() ?? 0;
    return count;
  }

  height(): number {
    let height = 0;
    height = Math.max(
      height,
      1 + (this.left?.height() ?? 0),
      1 + (this.middle?.height() ?? 0),
      1 + (this.right?.height() ?? 0)
    );
    return height;
  }

  averageDepth(): number {
    let sum = 0;
    sum += this.left?.averageDepth() ?? 0;
    sum += this.middle?.averageDepth() ?? 0;
    sum += this.right?.averageDepth() ?? 0;
    return sum / 3 + 1;
  }

  // FIXME pas sûr de la méthode	
  countPrefixes(prefix: string): number {
    if (!prefix) return this.count();
    const char = prefix[0];
    if (char < this.char) return this.left?.countPrefixes(prefix) ?? 0;
    if (char > this.char) return this.right?.countPrefixes(prefix) ?? 0;
    return this.middle?.countPrefixes(prefix.slice(1)) ?? 0;
  }

  // FIXME pas sûr de la méthode
  merge(node: HybridTrieNode): HybridTrieNode {
    if (node.isEndOfWord) this.isEndOfWord = true;
    if (node.left) {
      if (this.left) this.left.merge(node.left);
      else this.left = node.left;
    }
    if (node.middle) {
      if (this.middle) this.middle.merge(node.middle);
      else this.middle = node.middle;
    }
    if (node.right) {
      if (this.right) this.right.merge(node.right);
      else this.right = node.right;
    }
    return this;
  }

  // FIXME pas sûr de la méthode
  balance(): HybridTrieNode {
    const words = this.listWords();
    const newRoot = new HybridTrieNode(words[0][0]);
    words.forEach((word) => newRoot.insert(word));
    return newRoot;
  }
}
