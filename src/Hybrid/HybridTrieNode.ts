// si true vérifie que l'arbre est équilibré sinon l'équilibre localement
// si false insere juste les mots sans équilibrer
const BALANCE = true;

export default class HybridTrieNode {
  char: string; // Le caractère stocké dans le nœud
  is_end_of_word: boolean; // Indique si c'est la fin d'un mot
  left: HybridTrieNode | null; // Fils gauche
  middle: HybridTrieNode | null; // Fils milieu
  right: HybridTrieNode | null; // Fils droit

  constructor(char: string, is_end_of_word = false) {
    this.char = char;
    this.is_end_of_word = is_end_of_word;
    this.left = null;
    this.middle = null;
    this.right = null;
  }

  search(word: string): boolean {
    if (word.length === 1 && this.char === word) return this.is_end_of_word;
    if (word.length === 1 && !this.right && !this.left) return false;
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
    if (word.length === 1 && word[0] === this.char) {
      this.is_end_of_word = true;
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
      else this.middle.is_end_of_word = true;
    }

    return BALANCE ? this.balance() : this;
  }

  delete(word: string): HybridTrieNode | null {
    if (word.length === 1 && word === this.char) {
      this.is_end_of_word = false;
      if (!this.left && !this.middle && !this.right) return null;
      return this;
    }

    const char = word[0];

    if (char < this.char) {
      this.left = this.left?.delete(word) ?? null;
    } else if (char > this.char) {
      this.right = this.right?.delete(word) ?? null;
    } else if (word.length > 1) {
      this.middle = this.middle?.delete(word.slice(1)) ?? null;
    }

    if (!this.left && !this.middle && !this.right && !this.is_end_of_word)
      return null;
    return this;
  }

  display(prefix = ""): void {
    this.left?.display(prefix);

    if (this.is_end_of_word) {
      console.log(prefix + this.char);
    }

    if (!this.middle && !this.left && !this.right && !this.is_end_of_word) {
      console.log(
        prefix + this.char + " (fin de branche (is_end_of_word=False))"
      );
    }

    this.middle?.display(prefix + this.char);
    this.right?.display(prefix);
  }

  displayOld(prefix = "", isTail = true): void {
    // Afficher le nœud courant
    console.log(
      `${prefix}${isTail ? "└── " : "├── "}${this.char}${
        this.is_end_of_word ? " (fin de mot)" : ""
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
    let count = this.is_end_of_word ? 1 : 0;
    count += this.left?.count() ?? 0;
    count += this.middle?.count() ?? 0;
    count += this.right?.count() ?? 0;
    return count;
  }

  listWords(prefix = ""): string[] {
    const words: string[] = [];

    if (this.is_end_of_word) words.push(prefix + this.char);

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

  getBalanceFactor(): number {
    return (this.left?.height() ?? 0) - (this.right?.height() ?? 0);
  }

  averageDepth(): number {
    let sum = 0;
    sum += this.left?.averageDepth() ?? 0;
    sum += this.middle?.averageDepth() ?? 0;
    sum += this.right?.averageDepth() ?? 0;
    return sum / 3 + 1;
  }

  countPrefixes(prefix: string): number {
    const char = prefix[0];
    if (char < this.char) return this.left?.countPrefixes(prefix) ?? 0;
    if (char > this.char) return this.right?.countPrefixes(prefix) ?? 0;
    if (prefix.length > 1)
      return this.middle?.countPrefixes(prefix.slice(1)) ?? 0;

    return (this.middle?.count() ?? 0) + (this.is_end_of_word ? 1 : 0);
  }

  // Implemented on the HybridTrie class
  merge() {
    throw new Error("Call the merge method from the HybridTrie class");
  }

  rotateRight(): HybridTrieNode {
    const x = this.left!;
    const T2 = x.right;

    x.right = this;
    this.left = T2;

    return x;
  }

  rotateLeft(): HybridTrieNode {
    const y = this.right!;
    const T2 = y.left;

    y.left = this;
    this.right = T2;

    return y;
  }

  balance(): HybridTrieNode {
    const balanceFactor = this.getBalanceFactor();

    if (balanceFactor > 1) {
      if ((this.left?.getBalanceFactor() ?? 0) < 0) {
        this.left = this.left!.rotateLeft();
      }
      return this.rotateRight();
    }

    if (balanceFactor < -1) {
      if ((this.right?.getBalanceFactor() ?? 0) > 0) {
        this.right = this.right!.rotateRight();
      }
      return this.rotateLeft();
    }

    return this;
  }

  // Full Balance
  // on reconstuit l'arbre en prenant le mot médian comme racine
  // puis on insère succéssivement les mots à gauche et à droite de ce mot médian
  // Juste un test pour voir si ça marche, pas une méthode optimisée de l'exo
  fullBalance(): HybridTrieNode {
    const words = this.listWords().sort();

    if (words.length <= 1) return this;

    const medianWord = words.at(Math.floor(words.length / 2))!;

    const newRoot = new HybridTrieNode(medianWord[0]);

    const insertInOrder = (start: number, end: number) => {
      if (start > end) return;

      const mid = Math.floor((start + end) / 2);
      newRoot.insert(words[mid]);

      insertInOrder(start, mid - 1);
      insertInOrder(mid + 1, end);
    };

    insertInOrder(0, words.length - 1);

    return newRoot;
  }

  static fromJSON(json: HybridTrieNodeJSON): HybridTrieNode {
    const node = new HybridTrieNode(json.char, json.is_end_of_word);
    node.left = json.left ? HybridTrieNode.fromJSON(json.left) : null;
    node.middle = json.middle ? HybridTrieNode.fromJSON(json.middle) : null;
    node.right = json.right ? HybridTrieNode.fromJSON(json.right) : null;
    return node;
  }

  isFullEquilibre(): boolean {
    return (
      Math.abs((this.left?.height() ?? 0) - (this.right?.height() ?? 0)) <= 1 &&
      (this.left?.isFullEquilibre() ?? true) &&
      (this.middle?.isFullEquilibre() ?? true) &&
      (this.right?.isFullEquilibre() ?? true)
    );
  }

  isLocalEquilibre(): boolean {
    return (
      Math.abs((this.left?.height() ?? 0) - (this.right?.height() ?? 0)) <= 1
    );
  }
}

export interface HybridTrieNodeJSON {
  char: string;
  is_end_of_word: boolean;
  left: HybridTrieNodeJSON | null;
  middle: HybridTrieNodeJSON | null;
  right: HybridTrieNodeJSON | null;
}
