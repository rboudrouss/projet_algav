// FIXME quand c'est fin de mot j'ai des undefined

export default class HybridTrieNode {
  char: string; // Le caractère stocké dans le nœud
  isEndOfWord: boolean; // Indique si c'est la fin d'un mot
  left: HybridTrieNode | null; // Fils gauche
  middle: HybridTrieNode | null; // Fils milieu
  right: HybridTrieNode | null; // Fils droit

  constructor(char: string) {
    this.char = char;
    this.isEndOfWord = false;
    this.left = null;
    this.middle = null;
    this.right = null;
  }

  search(word: string): boolean {
    if (!word) return this.isEndOfWord;
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
    if (!word) {
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
      this.middle = this.middle.insert(word.slice(1));
    }

    return this;
  }

  display(prefix = ""): void {
    this.left?.display(prefix);

    if (this.isEndOfWord) {
      console.log(prefix);
    }

    this.middle?.display(prefix + this.char);
    this.right?.display(prefix);
  }

  displayOld(prefix="", isTail = true): void {
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
      child.child?.displayOld(childPrefix, index === nonNullChildren.length - 1);
    });
  }
}
