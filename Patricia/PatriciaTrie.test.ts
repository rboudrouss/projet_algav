import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import  PatriciaTrie  from "./PatriciaTrie.ts";

Deno.test("PatriciaTrie insert and search", () => {
    const trie = new PatriciaTrie();
    trie.insert("hello");
    assertEquals(trie.search("hello"), true);
    assertEquals(trie.search("hell"), false);
});

Deno.test("PatriciaTrie delete", () => {
    const trie = new PatriciaTrie();
    trie.insert("hello");
    trie.delete("hello");
    assertEquals(trie.search("hello"), false);
});