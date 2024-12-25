import { randomString, readAndProcessFile, shuffleArray } from "../helpers/index.ts";
import { HybridTrie } from "./index.ts";

// get all file in Shakespeare directory. They are text files between 100 and 160KB
const files = Array.from(Deno.readDirSync("./Shakespeare"));
// convert iterable to list

Deno.bench("HybridTrie simple insertion", (b) => {
  const trie = new HybridTrie();

  // b.start();
  trie.insert("car").insert("carts").insert("cat").insert("dog");
  // b.end()
});

Deno.bench("HybridTrie random insertions 100~150kb", (b) => {
  const trie = new HybridTrie();

  const file = files[Math.floor(Math.random() * files.length)];

  const content = readAndProcessFile(`./Shakespeare/${file.name}`);

  b.start();
  content.forEach((mot) => {
    trie.insert(mot);
  });
  b.end();
});

const inputBiggest = shuffleArray(readAndProcessFile("./Shakespeare/hamlet.txt")); // 32861 words, 160KB
const input100 = shuffleArray(inputBiggest).slice(0, 100); // 100 words
const input500 = shuffleArray(inputBiggest).slice(0, 500); // 500 words
const input1k = shuffleArray(inputBiggest).slice(0, 1000); // 1000 words
const input5k = shuffleArray(inputBiggest).slice(0, 5000) // 5000 words
const input10k = shuffleArray(inputBiggest).slice(0, 10000); // 10000 words
const input20k = shuffleArray(inputBiggest).slice(0, 20000); // 20000 words

Deno.bench("HybridTrie insertion of 100 words", () => {
  const trie = new HybridTrie();
  input100.forEach((mot) => trie.insert(mot));
});

Deno.bench("HybridTrie insertion of 500 words", () => {
  const trie = new HybridTrie();
  input500.forEach((mot) => trie.insert(mot));
});

Deno.bench("HybridTrie insertion of 1000 words", () => {
  const trie = new HybridTrie();
  input1k.forEach((mot) => trie.insert(mot));
});

Deno.bench("HybridTrie insertion of 5000 words", () => {
  const trie = new HybridTrie();
  input5k.forEach((mot) => trie.insert(mot));
});

Deno.bench("HybridTrie insertion of 10000 words", () => {
  const trie = new HybridTrie();
  input10k.forEach((mot) => trie.insert(mot));
});

Deno.bench("HybridTrie insertion of 20000 words", () => {
  const trie = new HybridTrie();
  input20k.forEach((mot) => trie.insert(mot));
});

Deno.bench("HybridTrie insertion of 32861 words", () => {
  const trie = new HybridTrie();
  inputBiggest.forEach((mot) => trie.insert(mot));
});


const simpleTrie = new HybridTrie();
simpleTrie.insert("car").insert("carts").insert("cat").insert("dog");

const trie100 = new HybridTrie();
input100.forEach((mot) => trie100.insert(mot));
const trie500 = new HybridTrie();
input500.forEach((mot) => trie500.insert(mot));
const trie1k = new HybridTrie();
input1k.forEach((mot) => trie1k.insert(mot));
const trie5k = new HybridTrie();
input5k.forEach((mot) => trie5k.insert(mot));
const trie10k = new HybridTrie();
input10k.forEach((mot) => trie10k.insert(mot));
const trie20k = new HybridTrie();
input20k.forEach((mot) => trie20k.insert(mot));
const trieBiggest = new HybridTrie();
inputBiggest.forEach((mot) => trieBiggest.insert(mot));

Deno.bench("HybridTrie simple positive search", () => {
  simpleTrie.search("car");
});

Deno.bench("HybridTrie simple negative search", () => {
  simpleTrie.search("doggy");
});

Deno.bench("HybridTrie positive search in trie of 100 words", () => {
  trie100.search(input100[Math.floor(Math.random() * 100)]);
});


Deno.bench("HybridTrie positive search in trie of 500 words", () => {
  trie500.search(input500[Math.floor(Math.random() * 500)]);
});


Deno.bench("HybridTrie positive search in trie of 1000 words", () => {
  trie1k.search(input1k[Math.floor(Math.random() * 1000)]);
});


Deno.bench("HybridTrie positive search in trie of 5000 words", () => {
  trie5k.search(input5k[Math.floor(Math.random() * 5000)]);
});


Deno.bench("HybridTrie positive search in trie of 10000 words", () => {
  trie10k.search(input10k[Math.floor(Math.random() * 10000)]);
});


Deno.bench("HybridTrie positive search in trie of 20000 words", () => {
  trie20k.search(input20k[Math.floor(Math.random() * 20000)]);
});


Deno.bench("HybridTrie positive search in trie of 32861 words", () => {
  trieBiggest.search(inputBiggest[Math.floor(Math.random() * 32861)]);
});


Deno.bench("HybridTrie (generally negative) search in trie of 100 words", () => {
  trie100.search(randomString(Math.floor(Math.random() * 10)));
});

Deno.bench("HybridTrie (generally negative) search in trie of 500 words", () => {
  trie500.search(randomString(Math.floor(Math.random() * 10)));
});

Deno.bench("HybridTrie (generally negative) search in trie of 1000 words", () => {
  trie1k.search(randomString(Math.floor(Math.random() * 10)));
});

Deno.bench("HybridTrie (generally negative) search in trie of 5000 words", () => {
  trie5k.search(randomString(Math.floor(Math.random() * 10)));
});

Deno.bench("HybridTrie (generally negative) search in trie of 10000 words", () => {
  trie10k.search(randomString(Math.floor(Math.random() * 10)));
});

Deno.bench("HybridTrie (generally negative) search in trie of 20000 words", () => {
  trie20k.search(randomString(Math.floor(Math.random() * 10)));
});

Deno.bench("HybridTrie (generally negative) search in trie of 32861 words", () => {
  trieBiggest.search(randomString(Math.floor(Math.random() * 10)));
});

Deno.bench("HybridTrie simple deletion", (b) => {
  const trie = new HybridTrie();
  trie.insert("car").insert("carts").insert("cat").insert("dog");

  // b.start();
  simpleTrie.delete("carts");
  // b.end();
});


Deno.bench("HybridTrie deletion it trie of 100 words", (b) => {
  const trie = new HybridTrie();
  input100.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input100[Math.floor(Math.random() * 100)]);
  b.end();
});

Deno.bench("HybridTrie deletion in tree of 500 words", (b) => {
  const trie = new HybridTrie();
  input500.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input500[Math.floor(Math.random() * 500)]);
  b.end();
})

Deno.bench("HybridTrie deletion in tree of 1000 words", (b) => {
  const trie = new HybridTrie();
  input1k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input1k[Math.floor(Math.random() * 1000)]);
  b.end();
});

Deno.bench("HybridTrie deletion in tree of 5000 words", (b) => {
  const trie = new HybridTrie();
  input5k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input5k[Math.floor(Math.random() * 5000)]);
  b.end();
});

Deno.bench("HybridTrie deletion in tree of 10000 words", (b) => {
  const trie = new HybridTrie();
  input10k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input10k[Math.floor(Math.random() * 10000)]);
  b.end();
});

Deno.bench("HybridTrie deletion in tree of 20000 words", (b) => {
  const trie = new HybridTrie();
  input20k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input20k[Math.floor(Math.random() * 20000)]);
  b.end();
});

Deno.bench("HybridTrie deletion in tree of 32861 words", (b) => {
  const trie = new HybridTrie();
  inputBiggest.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(inputBiggest[Math.floor(Math.random() * 32861)]);
  b.end();
});

Deno.bench("HybridTrie simple list words", () => {
  simpleTrie.listWords();
});

Deno.bench("HybridTrie list words in tree of 100 words", () => {
  trie100.listWords();
});

Deno.bench("HybridTrie list words in tree of 500 words", () => {
  trie500.listWords();
});

Deno.bench("HybridTrie list words in tree of 1000 words", () => {
  trie1k.listWords();
});

Deno.bench("HybridTrie list words in tree of 5000 words", () => {
  trie5k.listWords();
});

Deno.bench("HybridTrie list words in tree of 10000 words", () => {
  trie10k.listWords();
});

Deno.bench("HybridTrie list words in tree of 20000 words", () => {
  trie20k.listWords();
});

Deno.bench("HybridTrie list words in tree of 32861 words", () => {
  trieBiggest.listWords();
});

Deno.bench("HybridTrie simple count words", () => {
  simpleTrie.count();
});

Deno.bench("HybridTrie count words in tree of 100 words", () => {
  trie100.count();
});

Deno.bench("HybridTrie count words in tree of 500 words", () => {
  trie500.count();
});

Deno.bench("HybridTrie count words in tree of 1000 words", () => {
  trie1k.count();
});

Deno.bench("HybridTrie count words in tree of 5000 words", () => {
  trie5k.count();
});

Deno.bench("HybridTrie count words in tree of 10000 words", () => {
  trie10k.count();
});


Deno.bench("HybridTrie count words in tree of 20000 words", () => {
  trie20k.count();
});

Deno.bench("HybridTrie count words in tree of 32861 words", () => {
  trieBiggest.count();
});

Deno.bench("HybridTrie simple height", () => {
  simpleTrie.height();
});

Deno.bench("HybridTrie height in tree of 100 words", () => {
  trie100.height();
});

Deno.bench("HybridTrie height in tree of 500 words", () => {
  trie500.height();
});

Deno.bench("HybridTrie height in tree of 1000 words", () => {
  trie1k.height();
});

Deno.bench("HybridTrie height in tree of 5000 words", () => {
  trie5k.height();
});

Deno.bench("HybridTrie height in tree of 10000 words", () => {
  trie10k.height();
});

Deno.bench("HybridTrie height in tree of 20000 words", () => {
  trie20k.height();
});

Deno.bench("HybridTrie height in tree of 32861 words", () => {
  trieBiggest.height();
});

Deno.bench("HybridTrie simple average depth", () => {
  simpleTrie.averageDepth();
});

Deno.bench("HybridTrie average depth in tree of 100 words", () => {
  trie100.averageDepth();
});

Deno.bench("HybridTrie average depth in tree of 500 words", () => {
  trie500.averageDepth();
});

Deno.bench("HybridTrie average depth in tree of 1000 words", () => {
  trie1k.averageDepth();
});

Deno.bench("HybridTrie average depth in tree of 5000 words", () => {
  trie5k.averageDepth();
});

Deno.bench("HybridTrie average depth in tree of 10000 words", () => {
  trie10k.averageDepth();
});

Deno.bench("HybridTrie average depth in tree of 20000 words", () => {
  trie20k.averageDepth();
});

Deno.bench("HybridTrie average depth in tree of 32861 words", () => {
  trieBiggest.averageDepth();
});

Deno.bench("HybridTrie simple prefixes count", () => {
  simpleTrie.countPrefixes("ca");
});

Deno.bench("HybridTrie prefixes count in tree of 100 words", (b) => {
  let randomWord = input100[Math.floor(Math.random() * 100)];
  randomWord = randomWord.slice(0, Math.floor(Math.random() * randomWord.length));

  // b.start();
  trie100.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("HybridTrie prefixes count in tree of 500 words", (b) => {
  let randomWord = input500[Math.floor(Math.random() * 500)];
  randomWord = randomWord.slice(0, Math.floor(Math.random() * randomWord.length));

  // b.start();
  trie500.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("HybridTrie prefixes count in tree of 1000 words", (b) => {
  let randomWord = input1k[Math.floor(Math.random() * 1000)];
  randomWord = randomWord.slice(0, Math.floor(Math.random() * randomWord.length));

  // b.start();
  trie1k.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("HybridTrie prefixes count in tree of 5000 words", (b) => {
  let randomWord = input5k[Math.floor(Math.random() * 5000)];
  randomWord = randomWord.slice(0, Math.floor(Math.random() * randomWord.length));

  // b.start();
  trie5k.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("HybridTrie prefixes count in tree of 10000 words", (b) => {
  let randomWord = input10k[Math.floor(Math.random() * 10000)];
  randomWord = randomWord.slice(0, Math.floor(Math.random() * randomWord.length));

  // b.start();
  trie10k.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("HybridTrie prefixes count in tree of 20000 words", (b) => {
  let randomWord = input20k[Math.floor(Math.random() * 20000)];
  randomWord = randomWord.slice(0, Math.floor(Math.random() * randomWord.length));

  // b.start();
  trie20k.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("HybridTrie prefixes count in tree of 32861 words", (b) => {
  let randomWord = inputBiggest[Math.floor(Math.random() * 32861)];
  randomWord = randomWord.slice(0, Math.floor(Math.random() * randomWord.length));

  // b.start();
  trieBiggest.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("HybridTrie simple balance", (b) => {
  const trie = new HybridTrie();
  trie.insert("car").insert("carts").insert("cat").insert("dog");

  // b.start();
  simpleTrie.root?.balance();
  // b.end();
});

Deno.bench("HybridTrie balance in tree of 100 words", (b) => {
  const trie = new HybridTrie();
  input100.forEach((mot) => trie.insert(mot));
  b.start();
  trie.root?.balance();
  b.end();
});

Deno.bench("HybridTrie balance in tree of 500 words", (b) => {
  const trie = new HybridTrie();
  input500.forEach((mot) => trie.insert(mot));
  b.start();
  trie.root?.balance();
  b.end();
});

Deno.bench("HybridTrie balance in tree of 1000 words", (b) => {
  const trie = new HybridTrie();
  input1k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.root?.balance();
  b.end();
});

Deno.bench("HybridTrie balance in tree of 5000 words", (b) => {
  const trie = new HybridTrie();
  input5k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.root?.balance();
  b.end();
});

Deno.bench("HybridTrie balance in tree of 10000 words", (b) => {
  const trie = new HybridTrie();
  input10k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.root?.balance();
  b.end();
});

Deno.bench("HybridTrie balance in tree of 20000 words", (b) => {
  const trie = new HybridTrie();
  input20k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.root?.balance();
  b.end();
});

Deno.bench("HybridTrie balance in tree of 32861 words", (b) => {
  const trie = new HybridTrie();
  inputBiggest.forEach((mot) => trie.insert(mot));
  b.start();
  trie.root?.balance();
  b.end();
});

