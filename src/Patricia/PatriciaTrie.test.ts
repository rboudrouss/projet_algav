import PatriciaTrie from "./PatriciaTrie.ts";
import { replacer } from "../helpers/index.ts";
import { assert, assertEquals } from "jsr:@std/assert";

Deno.test("PatriciaTrie should insert correctly", () => {
  const trie = new PatriciaTrie();
  trie.insert("car");

  assertEquals(trie.root.label, "");
  assertEquals(trie.root.children.size, 1);
  assertEquals(trie.root.is_end_of_word, false);
  assert(trie.root.children.get("c"));

  const node = trie.root.children.get("c")!;
  assertEquals(node.label, "car");
  assertEquals(node.children.size, 0);
  assertEquals(node.is_end_of_word, true);
});

Deno.test("PatriciaTrie should handle complex insertions", () => {
  const trie = new PatriciaTrie();

  trie.insert("car").insert("carts").insert("cat").insert("dog");
  assert(trie.root.children.get("c"));

  const ca = trie.root.children.get("c")!;

  assertEquals(ca.label, "ca");
  assertEquals(ca.children.size, 2);
  assertEquals(ca.is_end_of_word, false);

  assert(ca.children.get("r"));
  assert(ca.children.get("t"));

  const r = ca.children.get("r")!;
  assertEquals(r.label, "r");
  assertEquals(r.children.size, 1);
  assertEquals(r.is_end_of_word, true);
  assert(r.children.get("t"));

  const ts = r.children.get("t")!;
  assertEquals(ts.label, "ts");
  assertEquals(ts.children.size, 0);
  assertEquals(ts.is_end_of_word, true);

  assert(trie.root.children.get("d"));
});

Deno.test("PatriciaTrie should search correctly", () => {
  const trie = new PatriciaTrie();
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

Deno.test("PatriciaTrie should delete correctly", () => {
  const trie = new PatriciaTrie();
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

Deno.test("PatriciaTrie should list words correctly", () => {
  const trie = new PatriciaTrie();
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

Deno.test("PatriciaTrie should count words correctly", () => {
  const trie = new PatriciaTrie();
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

Deno.test("PatriciaTrie should count null nodes correctly", () => {
  const trie = new PatriciaTrie();
  assertEquals(trie.countNullNodes(), 1);

  trie.insert("c");
  assertEquals(trie.countNullNodes(), 1);

  trie.insert("ca");
  assertEquals(trie.countNullNodes(), 1);

  trie.insert("cat");
  assertEquals(trie.countNullNodes(), 1);

  trie.delete("c").delete("ca");
  assertEquals(trie.countNullNodes(), 1);

  trie.insert("co");
  assertEquals(trie.countNullNodes(), 2);

  trie.delete("cat");
  assertEquals(trie.countNullNodes(), 1);
});

Deno.test("PatriciaTrie should calculate height correctly", () => {
  const trie = new PatriciaTrie();
  assertEquals(trie.height(), 1);

  trie.insert("c");
  assertEquals(trie.height(), 2);

  trie.insert("ca");
  assertEquals(trie.height(), 3);

  trie.insert("cat");
  assertEquals(trie.height(), 4);

  trie.delete("c").delete("ca");
  assertEquals(trie.height(), 4);

  trie.insert("co");
  assertEquals(trie.height(), 4);

  trie.delete("cat");
  assertEquals(trie.height(), 3);
});

Deno.test("PatriciaTrie should calculate average depth correctly", () => {
  const trie = new PatriciaTrie();
  assertEquals(trie.averageDepth(), 0);

  trie.insert("c");
  assertEquals(trie.averageDepth(), 1);

  trie.insert("ca");
  assertEquals(trie.averageDepth(), 2);
});

Deno.test(
  "PatriciaTrie should count how many words start with a prefix",
  () => {
    const trie = new PatriciaTrie();
    trie.insert("car").insert("carts").insert("cat").insert("dog");

    assertEquals(trie.countPrefixes("c"), 3);
    assertEquals(trie.countPrefixes("ca"), 3);
    assertEquals(trie.countPrefixes("car"), 2);
    assertEquals(trie.countPrefixes("cart"), 1);
    assertEquals(trie.countPrefixes("dog"), 1);
    assertEquals(trie.countPrefixes("doggy"), 0);
  }
);

Deno.test("PatriciaTries should merge correctly", () => {
  const trie1 = new PatriciaTrie();
  trie1.insert("car").insert("carts").insert("cat").insert("dog");

  const trie2 = new PatriciaTrie();
  trie2.insert("dog").insert("doggy").insert("doggo");

  trie1.merge(trie2);

  assertEquals(
    trie1.listWords().sort(),
    ["car", "carts", "cat", "dog", "doggy", "doggo"].sort()
  );
});

Deno.test(
  "PatriciaTrie should keep the same structure if imported from JSON",
  () => {
    const trie = new PatriciaTrie();
    const words = ["car", "carts", "cat", "dog", "doggy", "doggo"];
    words.forEach((word) => trie.insert(word));

    const json = JSON.stringify(trie.root, replacer);
    const newTrie = PatriciaTrie.fromJson(JSON.parse(json));

    assertEquals(newTrie.listWords().sort(), words.sort());
  }
);
