import test from "node:test";
import assert from "node:assert/strict";

import { InMemoryStore } from "../src/store.ts";

test("upserts and retrieves a memory by id", () => {
  const store = new InMemoryStore();

  store.upsert([
    {
      id: "memory-1",
      text: "TokumAi uses a TypeScript monorepo.",
      embedding: [1, 0],
    },
  ]);

  assert.deepEqual(store.get("memory-1"), {
    id: "memory-1",
    text: "TokumAi uses a TypeScript monorepo.",
    embedding: [1, 0],
  });
});

test("upsert replaces an existing memory", () => {
  const store = new InMemoryStore();

  store.upsert([
    {
      id: "memory-1",
      text: "old text",
      embedding: [1, 0],
    },
  ]);

  store.upsert([
    {
      id: "memory-1",
      text: "new text",
      embedding: [0, 1],
    },
  ]);

  assert.equal(store.get("memory-1")?.text, "new text");
  assert.deepEqual(store.get("memory-1")?.embedding, [0, 1]);
});

test("deletes memories by id", () => {
  const store = new InMemoryStore();

  store.upsert([
    {
      id: "memory-1",
      text: "temporary memory",
      embedding: [1, 0],
    },
  ]);

  store.delete(["memory-1"]);

  assert.equal(store.get("memory-1"), undefined);
});

test("ranks search results by cosine similarity", () => {
  const store = new InMemoryStore();

  store.upsert([
    {
      id: "exact",
      text: "exact match",
      embedding: [1, 0],
    },
    {
      id: "similar",
      text: "similar match",
      embedding: [0.8, 0.6],
    },
    {
      id: "different",
      text: "different match",
      embedding: [0, 1],
    },
  ]);

  const results = store.search([1, 0], 3);

  assert.deepEqual(
    results.map((result) => result.record.id),
    ["exact", "similar", "different"],
  );

  assert.equal(results[0].score, 1);
  assert.ok(results[1].score > results[2].score);
});

test("respects the result limit", () => {
  const store = new InMemoryStore();

  store.upsert([
    { id: "one", text: "one", embedding: [1, 0] },
    { id: "two", text: "two", embedding: [0.9, 0.1] },
    { id: "three", text: "three", embedding: [0, 1] },
  ]);

  const results = store.search([1, 0], 2);

  assert.equal(results.length, 2);
});

test("ignores memories without embeddings", () => {
  const store = new InMemoryStore();

  store.upsert([
    {
      id: "without-embedding",
      text: "not vectorized",
    },
    {
      id: "with-embedding",
      text: "vectorized",
      embedding: [1, 0],
    },
  ]);

  const results = store.search([1, 0]);

  assert.deepEqual(
    results.map((result) => result.record.id),
    ["with-embedding"],
  );
});

test("returns no match for incompatible embedding dimensions", () => {
  const store = new InMemoryStore();

  store.upsert([
    {
      id: "two-dimensional",
      text: "two dimensions",
      embedding: [1, 0],
    },
  ]);

  const results = store.search([1, 0, 0]);

  assert.equal(results.length, 0);
});

test("returns no results for an empty query embedding", () => {
  const store = new InMemoryStore();

  store.upsert([
    {
      id: "memory-1",
      text: "memory",
      embedding: [1, 0],
    },
  ]);

  const results = store.search([]);

  assert.equal(results.length, 0);
});
