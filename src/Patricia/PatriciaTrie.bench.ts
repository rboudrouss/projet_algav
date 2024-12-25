import {
  randomString,
  readAndProcessFile,
  shuffleArray,
} from "../helpers/index.ts";
import { PatriciaTrie } from "./index.ts";

const files = Array.from(Deno.readDirSync("./Shakespeare"));

const inputBiggest = shuffleArray(
  readAndProcessFile("./Shakespeare/hamlet.txt")
); // 32861 words, 160KB
const input100 = shuffleArray(inputBiggest).slice(0, 100); // 100 words
const input500 = shuffleArray(inputBiggest).slice(0, 500); // 500 words
const input1k = shuffleArray(inputBiggest).slice(0, 1000); // 1000 words
const input5k = shuffleArray(inputBiggest).slice(0, 5000); // 5000 words
const input10k = shuffleArray(inputBiggest).slice(0, 10000); // 10000 words
const input20k = shuffleArray(inputBiggest).slice(0, 20000); // 20000 words

const simpleTrie = new PatriciaTrie();
simpleTrie.insert("car").insert("carts").insert("cat").insert("dog");
const trie100 = new PatriciaTrie();
input100.forEach((mot) => trie100.insert(mot));
const trie500 = new PatriciaTrie();
input500.forEach((mot) => trie500.insert(mot));
const trie1k = new PatriciaTrie();
input1k.forEach((mot) => trie1k.insert(mot));
const trie5k = new PatriciaTrie();
input5k.forEach((mot) => trie5k.insert(mot));
const trie10k = new PatriciaTrie();
input10k.forEach((mot) => trie10k.insert(mot));
const trie20k = new PatriciaTrie();
input20k.forEach((mot) => trie20k.insert(mot));
const trieBiggest = new PatriciaTrie();
inputBiggest.forEach((mot) => trieBiggest.insert(mot));

// Benchmarks

// ---------------------------------------------------------------------------------

Deno.bench("PatriciaTrie simple insertion", (b) => {
  const trie = new PatriciaTrie();

  // b.start();
  trie.insert("car").insert("carts").insert("cat").insert("dog");
  // b.end()
});

Deno.bench("PatriciaTrie random insertions 100~150kb", (b) => {
  const trie = new PatriciaTrie();

  const file = files[Math.floor(Math.random() * files.length)];

  const content = readAndProcessFile(`./Shakespeare/${file.name}`);

  b.start();
  content.forEach((mot) => {
    trie.insert(mot);
  });
  b.end();
});

Deno.bench("PatriciaTrie insertion of 100 words", () => {
  const trie = new PatriciaTrie();
  input100.forEach((mot) => trie.insert(mot));
});

Deno.bench("PatriciaTrie insertion of 500 words", () => {
  const trie = new PatriciaTrie();
  input500.forEach((mot) => trie.insert(mot));
});

Deno.bench("PatriciaTrie insertion of 1000 words", () => {
  const trie = new PatriciaTrie();
  input1k.forEach((mot) => trie.insert(mot));
});

Deno.bench("PatriciaTrie insertion of 5000 words", () => {
  const trie = new PatriciaTrie();
  input5k.forEach((mot) => trie.insert(mot));
});

Deno.bench("PatriciaTrie insertion of 10000 words", () => {
  const trie = new PatriciaTrie();
  input10k.forEach((mot) => trie.insert(mot));
});

Deno.bench("PatriciaTrie insertion of 20000 words", () => {
  const trie = new PatriciaTrie();
  input20k.forEach((mot) => trie.insert(mot));
});

Deno.bench("PatriciaTrie insertion of 32861 words", () => {
  const trie = new PatriciaTrie();
  inputBiggest.forEach((mot) => trie.insert(mot));
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

Deno.bench("PatriciaTrie simple positive search", () => {
  simpleTrie.search("car");
});

Deno.bench("PatriciaTrie simple negative search", () => {
  simpleTrie.search("doggy");
});

Deno.bench("PatriciaTrie positive search in trie of 100 words", () => {
  trie100.search(input100[Math.floor(Math.random() * 100)]);
});

Deno.bench("PatriciaTrie positive search in trie of 500 words", () => {
  trie500.search(input500[Math.floor(Math.random() * 500)]);
});

Deno.bench("PatriciaTrie positive search in trie of 1000 words", () => {
  trie1k.search(input1k[Math.floor(Math.random() * 1000)]);
});

Deno.bench("PatriciaTrie positive search in trie of 5000 words", () => {
  trie5k.search(input5k[Math.floor(Math.random() * 5000)]);
});

Deno.bench("PatriciaTrie positive search in trie of 10000 words", () => {
  trie10k.search(input10k[Math.floor(Math.random() * 10000)]);
});

Deno.bench("PatriciaTrie positive search in trie of 20000 words", () => {
  trie20k.search(input20k[Math.floor(Math.random() * 20000)]);
});

Deno.bench("PatriciaTrie positive search in trie of 32861 words", () => {
  trieBiggest.search(inputBiggest[Math.floor(Math.random() * 32861)]);
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

Deno.bench(
  "PatriciaTrie (generally negative) search in trie of 100 words",
  () => {
    trie100.search(randomString(Math.floor(Math.random() * 10)));
  }
);

Deno.bench(
  "PatriciaTrie (generally negative) search in trie of 500 words",
  () => {
    trie500.search(randomString(Math.floor(Math.random() * 10)));
  }
);

Deno.bench(
  "PatriciaTrie (generally negative) search in trie of 1000 words",
  () => {
    trie1k.search(randomString(Math.floor(Math.random() * 10)));
  }
);

Deno.bench(
  "PatriciaTrie (generally negative) search in trie of 5000 words",
  () => {
    trie5k.search(randomString(Math.floor(Math.random() * 10)));
  }
);

Deno.bench(
  "PatriciaTrie (generally negative) search in trie of 10000 words",
  () => {
    trie10k.search(randomString(Math.floor(Math.random() * 10)));
  }
);

Deno.bench(
  "PatriciaTrie (generally negative) search in trie of 20000 words",
  () => {
    trie20k.search(randomString(Math.floor(Math.random() * 10)));
  }
);

Deno.bench(
  "PatriciaTrie (generally negative) search in trie of 32861 words",
  () => {
    trieBiggest.search(randomString(Math.floor(Math.random() * 10)));
  }
);

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

Deno.bench("PatriciaTrie simple deletion", (b) => {
  const trie = new PatriciaTrie();
  trie.insert("car").insert("carts").insert("cat").insert("dog");

  // b.start();
  simpleTrie.delete("carts");
  // b.end();
});

Deno.bench("PatriciaTrie deletion it trie of 100 words", (b) => {
  const trie = new PatriciaTrie();
  input100.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input100[Math.floor(Math.random() * 100)]);
  b.end();
});

Deno.bench("PatriciaTrie deletion in tree of 500 words", (b) => {
  const trie = new PatriciaTrie();
  input500.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input500[Math.floor(Math.random() * 500)]);
  b.end();
});

Deno.bench("PatriciaTrie deletion in tree of 1000 words", (b) => {
  const trie = new PatriciaTrie();
  input1k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input1k[Math.floor(Math.random() * 1000)]);
  b.end();
});

Deno.bench("PatriciaTrie deletion in tree of 5000 words", (b) => {
  const trie = new PatriciaTrie();
  input5k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input5k[Math.floor(Math.random() * 5000)]);
  b.end();
});

Deno.bench("PatriciaTrie deletion in tree of 10000 words", (b) => {
  const trie = new PatriciaTrie();
  input10k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input10k[Math.floor(Math.random() * 10000)]);
  b.end();
});

Deno.bench("PatriciaTrie deletion in tree of 20000 words", (b) => {
  const trie = new PatriciaTrie();
  input20k.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(input20k[Math.floor(Math.random() * 20000)]);
  b.end();
});

Deno.bench("PatriciaTrie deletion in tree of 32861 words", (b) => {
  const trie = new PatriciaTrie();
  inputBiggest.forEach((mot) => trie.insert(mot));
  b.start();
  trie.delete(inputBiggest[Math.floor(Math.random() * 32861)]);
  b.end();
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

Deno.bench("PatriciaTrie simple list words", () => {
  simpleTrie.listWords();
});

Deno.bench("PatriciaTrie list words in tree of 100 words", () => {
  trie100.listWords();
});

Deno.bench("PatriciaTrie list words in tree of 500 words", () => {
  trie500.listWords();
});

Deno.bench("PatriciaTrie list words in tree of 1000 words", () => {
  trie1k.listWords();
});

Deno.bench("PatriciaTrie list words in tree of 5000 words", () => {
  trie5k.listWords();
});

Deno.bench("PatriciaTrie list words in tree of 10000 words", () => {
  trie10k.listWords();
});

Deno.bench("PatriciaTrie list words in tree of 20000 words", () => {
  trie20k.listWords();
});

Deno.bench("PatriciaTrie list words in tree of 32861 words", () => {
  trieBiggest.listWords();
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

Deno.bench("PatriciaTrie simple count words", () => {
  simpleTrie.count();
});

Deno.bench("PatriciaTrie count words in tree of 100 words", () => {
  trie100.count();
});

Deno.bench("PatriciaTrie count words in tree of 500 words", () => {
  trie500.count();
});

Deno.bench("PatriciaTrie count words in tree of 1000 words", () => {
  trie1k.count();
});

Deno.bench("PatriciaTrie count words in tree of 5000 words", () => {
  trie5k.count();
});

Deno.bench("PatriciaTrie count words in tree of 10000 words", () => {
  trie10k.count();
});

Deno.bench("PatriciaTrie count words in tree of 20000 words", () => {
  trie20k.count();
});

Deno.bench("PatriciaTrie count words in tree of 32861 words", () => {
  trieBiggest.count();
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

Deno.bench("PatriciaTrie simple height", () => {
  simpleTrie.height();
});

Deno.bench("PatriciaTrie height in tree of 100 words", () => {
  trie100.height();
});

Deno.bench("PatriciaTrie height in tree of 500 words", () => {
  trie500.height();
});

Deno.bench("PatriciaTrie height in tree of 1000 words", () => {
  trie1k.height();
});

Deno.bench("PatriciaTrie height in tree of 5000 words", () => {
  trie5k.height();
});

Deno.bench("PatriciaTrie height in tree of 10000 words", () => {
  trie10k.height();
});

Deno.bench("PatriciaTrie height in tree of 20000 words", () => {
  trie20k.height();
});

Deno.bench("PatriciaTrie height in tree of 32861 words", () => {
  trieBiggest.height();
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

Deno.bench("PatriciaTrie simple average depth", () => {
  simpleTrie.averageDepth();
});

Deno.bench("PatriciaTrie average depth in tree of 100 words", () => {
  trie100.averageDepth();
});

Deno.bench("PatriciaTrie average depth in tree of 500 words", () => {
  trie500.averageDepth();
});

Deno.bench("PatriciaTrie average depth in tree of 1000 words", () => {
  trie1k.averageDepth();
});

Deno.bench("PatriciaTrie average depth in tree of 5000 words", () => {
  trie5k.averageDepth();
});

Deno.bench("PatriciaTrie average depth in tree of 10000 words", () => {
  trie10k.averageDepth();
});

Deno.bench("PatriciaTrie average depth in tree of 20000 words", () => {
  trie20k.averageDepth();
});

Deno.bench("PatriciaTrie average depth in tree of 32861 words", () => {
  trieBiggest.averageDepth();
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

Deno.bench("PatriciaTrie simple prefixes count", () => {
  simpleTrie.countPrefixes("ca");
});

Deno.bench("PatriciaTrie prefixes count in tree of 100 words", (b) => {
  let randomWord = input100[Math.floor(Math.random() * 100)];
  randomWord = randomWord.slice(
    0,
    Math.floor(Math.random() * randomWord.length)
  );

  // b.start();
  trie100.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("PatriciaTrie prefixes count in tree of 500 words", (b) => {
  let randomWord = input500[Math.floor(Math.random() * 500)];
  randomWord = randomWord.slice(
    0,
    Math.floor(Math.random() * randomWord.length)
  );

  // b.start();
  trie500.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("PatriciaTrie prefixes count in tree of 1000 words", (b) => {
  let randomWord = input1k[Math.floor(Math.random() * 1000)];
  randomWord = randomWord.slice(
    0,
    Math.floor(Math.random() * randomWord.length)
  );

  // b.start();
  trie1k.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("PatriciaTrie prefixes count in tree of 5000 words", (b) => {
  let randomWord = input5k[Math.floor(Math.random() * 5000)];
  randomWord = randomWord.slice(
    0,
    Math.floor(Math.random() * randomWord.length)
  );

  // b.start();
  trie5k.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("PatriciaTrie prefixes count in tree of 10000 words", (b) => {
  let randomWord = input10k[Math.floor(Math.random() * 10000)];
  randomWord = randomWord.slice(
    0,
    Math.floor(Math.random() * randomWord.length)
  );

  // b.start();
  trie10k.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("PatriciaTrie prefixes count in tree of 20000 words", (b) => {
  let randomWord = input20k[Math.floor(Math.random() * 20000)];
  randomWord = randomWord.slice(
    0,
    Math.floor(Math.random() * randomWord.length)
  );

  // b.start();
  trie20k.countPrefixes(randomWord);
  // b.end();
});

Deno.bench("PatriciaTrie prefixes count in tree of 32861 words", (b) => {
  let randomWord = inputBiggest[Math.floor(Math.random() * 32861)];
  randomWord = randomWord.slice(
    0,
    Math.floor(Math.random() * randomWord.length)
  );

  // b.start();
  trieBiggest.countPrefixes(randomWord);
  // b.end();
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

Deno.bench("PatriciaTrie simple merge", (b) => {
  const trie = new PatriciaTrie();
  trie.insert("car").insert("carts").insert("cat").insert("dog");

  const trie2 = new PatriciaTrie();
  trie2.insert("car").insert("dog").insert("doggu").insert("doggy");

  // b.start();
  trie.merge(trie2);
  // b.end();
});

Deno.bench("PatriciaTrie merge in tree of 100 words", (b) => {
  const trie = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 100)
    .forEach((mot) => trie.insert(mot));

  const trie2 = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 100)
    .forEach((mot) => trie2.insert(mot));

  b.start();
  trie.merge(trie2);
  b.end();
});

Deno.bench("PatriciaTrie merge in tree of 500 words", (b) => {
  const trie = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 500)
    .forEach((mot) => trie.insert(mot));

  const trie2 = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 500)
    .forEach((mot) => trie2.insert(mot));

  b.start();
  trie.merge(trie2);
  b.end();
});

Deno.bench("PatriciaTrie merge in tree of 1000 words", (b) => {
  const trie = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 1000)
    .forEach((mot) => trie.insert(mot));

  const trie2 = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 1000)
    .forEach((mot) => trie2.insert(mot));

  b.start();
  trie.merge(trie2);
  b.end();
});

Deno.bench("PatriciaTrie merge in tree of 5000 words", (b) => {
  const trie = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 5000)
    .forEach((mot) => trie.insert(mot));

  const trie2 = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 5000)
    .forEach((mot) => trie2.insert(mot));

  b.start();
  trie.merge(trie2);
  b.end();
});

Deno.bench("PatriciaTrie merge in tree of 10000 words", (b) => {
  const trie = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 10000)
    .forEach((mot) => trie.insert(mot));

  const trie2 = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 10000)
    .forEach((mot) => trie2.insert(mot));

  b.start();
  trie.merge(trie2);
  b.end();
});

Deno.bench("PatriciaTrie merge in tree of 20000 words", (b) => {
  const trie = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 20000)
    .forEach((mot) => trie.insert(mot));

  const trie2 = new PatriciaTrie();
  shuffleArray(inputBiggest)
    .slice(0, 20000)
    .forEach((mot) => trie2.insert(mot));

  b.start();
  trie.merge(trie2);
  b.end();
});

Deno.bench("PatriciaTrie merge in tree of 32861 words", (b) => {
  const trie = new PatriciaTrie();
  shuffleArray(inputBiggest).forEach((mot) => trie.insert(mot));

  const trie2 = new PatriciaTrie();
  shuffleArray(inputBiggest).forEach((mot) => trie2.insert(mot));

  b.start();
  trie.merge(trie2);
  b.end();
});
