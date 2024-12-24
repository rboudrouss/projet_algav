import { assert, assertEquals } from "jsr:@std/assert";
import HybridTrie from "./HybridTrie.ts";

Deno.test("HybridTrie should insert correctly", () => {
  const trie = new HybridTrie();
  trie.insert("car");
  assertEquals(trie.root?.char, "c");
  assertEquals(trie.root?.left, null);
  assertEquals(trie.root?.right, null);
  assertEquals(trie.root?.is_end_of_word, false);
  assertEquals(trie.root?.middle?.char, "a");
  assertEquals(trie.root?.middle?.left, null);
  assertEquals(trie.root?.middle?.right, null);
  assertEquals(trie.root?.middle?.is_end_of_word, false);
  assertEquals(trie.root?.middle?.middle?.char, "r");
  assertEquals(trie.root?.middle?.middle?.left, null);
  assertEquals(trie.root?.middle?.middle?.right, null);
  assertEquals(trie.root?.middle?.middle?.middle, null);
  assertEquals(trie.root?.middle?.middle?.is_end_of_word, true);
});

Deno.test("HybridTrie should handle complex insertions", () => {
  const trie = new HybridTrie();

  trie.insert("car").insert("carts").insert("cat").insert("dog");

  assertEquals(trie.root?.middle?.middle?.right?.char, "t"); // CAT
  assertEquals(trie.root?.middle?.middle?.right?.is_end_of_word, true);

  assertEquals(trie.root?.middle?.middle?.is_end_of_word, true);
  assertEquals(trie.root?.middle?.middle?.middle?.char, "t"); // CART[S]
  assertEquals(trie.root?.middle?.middle?.middle?.is_end_of_word, false);

  assertEquals(trie.root?.middle?.middle?.middle?.middle?.char, "s"); // CARTS
  assertEquals(trie.root?.middle?.middle?.middle?.middle?.is_end_of_word, true);
});

Deno.test("HybridTrie should search correctly", () => {
  const trie = new HybridTrie();
  trie.insert("car").insert("carts").insert("cat").insert("dog");

  assertEquals(trie.search(""), false);
  assertEquals(trie.search("c"), false);
  assertEquals(trie.search("ca"), false);
  assertEquals(trie.search("car"), true);
  assertEquals(trie.search("carts"), true);
  assertEquals(trie.search("cart"), false);
  assertEquals(trie.search("cat"), true);
  assertEquals(trie.search("dog"), true);
  assertEquals(trie.search("doggy"), false);
});

Deno.test("HybridTrie should delete correctly", () => {
  const trie = new HybridTrie();
  trie.insert("car").insert("carts").insert("cat").insert("dog");

  trie.delete("carts");
  assertEquals(trie.search("carts"), false);
  assertEquals(trie.search("car"), true);
  assertEquals(trie.search("cat"), true);
  assertEquals(trie.search("dog"), true);

  trie.delete("cat");
  assertEquals(trie.search("carts"), false);
  assertEquals(trie.search("cat"), false);
  assertEquals(trie.search("car"), true);
  assertEquals(trie.search("dog"), true);

  trie.insert("carts");

  trie.delete("car");
  assertEquals(trie.search("carts"), true);
  assertEquals(trie.search("cat"), false);
  assertEquals(trie.search("car"), false);
  assertEquals(trie.search("dog"), true);

  trie.delete("dog");
  assertEquals(trie.search("carts"), true);
  assertEquals(trie.search("cat"), false);
  assertEquals(trie.search("car"), false);
  assertEquals(trie.search("dog"), false);
});

Deno.test("HybridTrie should list words correctly", () => {
  const trie = new HybridTrie();
  assertEquals(trie.listWords(), []);

  trie.insert("car").insert("carts").insert("cat").insert("dog");

  assertEquals(trie.listWords().sort(), ["car", "carts", "cat", "dog"].sort());

  trie.delete("carts");
  assertEquals(trie.listWords().sort(), ["car", "cat", "dog"].sort());

  trie.delete("dog");
  assertEquals(trie.listWords().sort(), ["cat", "car"].sort());

  trie.insert("carts");
  assertEquals(trie.listWords().sort(), ["car", "carts", "cat"].sort());
});

Deno.test("HybridTrie should count words correctly", () => {
  const trie = new HybridTrie();
  assertEquals(trie.count(), 0);

  trie.insert("car").insert("carts").insert("cat").insert("dog");

  assertEquals(trie.count(), 4);

  trie.delete("carts");
  assertEquals(trie.count(), 3);

  trie.delete("dog");
  assertEquals(trie.count(), 2);

  trie.insert("carts");
  assertEquals(trie.count(), 3);
});

Deno.test("HybridTrie should count null nodes correctly", () => {
  const trie = new HybridTrie();
  assertEquals(trie.countNullNodes(), 1);

  trie.insert("c");
  assertEquals(trie.countNullNodes(), 3);

  trie.insert("ca");
  assertEquals(trie.countNullNodes(), 5);

  trie.insert("cat");
  assertEquals(trie.countNullNodes(), 7);

  trie.delete("c").delete("ca");
  assertEquals(trie.countNullNodes(), 7);

  trie.insert("co");
  assertEquals(trie.countNullNodes(), 9);

  trie.delete("cat");
  assertEquals(trie.countNullNodes(), 7);
});

Deno.test("HybridTrie should calculate height correctly", () => {
  const trie = new HybridTrie();
  assertEquals(trie.height(), 0);

  trie.insert("c");
  assertEquals(trie.height(), 1);

  trie.insert("ca");
  assertEquals(trie.height(), 2);

  trie.insert("cat");
  assertEquals(trie.height(), 3);

  trie.delete("c").delete("ca");
  assertEquals(trie.height(), 3);

  trie.insert("co");
  assertEquals(trie.height(), 3);

  trie.delete("cat");
  assertEquals(trie.height(), 3); // Not optimized, has a useless "a" node wich right is "o"
});

Deno.test("HybridTrie should calculate average depth correctly", () => {
  const trie = new HybridTrie();
  assertEquals(trie.averageDepth(), 0);

  trie.insert("c");
  assertEquals(trie.averageDepth(), 1);

  trie.insert("ca");
  assertEquals(trie.averageDepth(), (1 + 0 + 0) / 3 + 1);
});

Deno.test("HybridTrie should count how many words start with a prefix", () => {
  const trie = new HybridTrie();
  trie.insert("car").insert("carts").insert("cat").insert("dog");

  assertEquals(trie.countPrefixes("c"), 3);
  assertEquals(trie.countPrefixes("ca"), 3);
  assertEquals(trie.countPrefixes("car"), 2);
  assertEquals(trie.countPrefixes("cart"), 1);
  assertEquals(trie.countPrefixes("dog"), 1);
  assertEquals(trie.countPrefixes("doggy"), 0);
});

Deno.test("HybtridTries should merge correctly", () => {
  const trie1 = new HybridTrie();
  trie1.insert("car").insert("carts").insert("cat").insert("dog");

  const trie2 = new HybridTrie();
  trie2.insert("dog").insert("doggy").insert("doggo");

  trie1.merge(trie2);

  assertEquals(
    trie1.listWords().sort(),
    ["car", "carts", "cat", "dog", "doggy", "doggo"].sort()
  );
});

Deno.test("HybridTrie balance don't disturb the trie", () => {
  const trie = new HybridTrie();
  const words = ["car", "carts", "cat", "dog", "doggy", "doggo"];
  words.forEach((word) => trie.insert(word));

  trie.root?.balance();

  assertEquals(trie.listWords().sort(), words.sort());
});
