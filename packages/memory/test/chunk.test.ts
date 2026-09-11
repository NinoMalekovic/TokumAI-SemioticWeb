import test from "node:test";
import assert from "node:assert/strict";

import { chunkDocument } from "../src/chunk.ts";

test("chunks paragraphs without exceeding the configured size", () => {
  const chunks = chunkDocument(
    {
      id: "doc-1",
      content: "First paragraph.\n\nSecond paragraph.",
      source: "README.md",
    },
    { maxCharacters: 20 },
  );

  assert.deepEqual(
    chunks.map((chunk) => chunk.content),
    ["First paragraph.", "Second paragraph."],
  );

  assert.deepEqual(
    chunks.map((chunk) => chunk.chunkIndex),
    [0, 1],
  );
});

test("splits oversized paragraphs into fixed-size chunks", () => {
  const chunks = chunkDocument(
    {
      id: "doc-1",
      content: "abcdefghij",
      source: "test.md",
    },
    { maxCharacters: 4 },
  );

  assert.deepEqual(
    chunks.map((chunk) => chunk.content),
    ["abcd", "efgh", "ij"],
  );
});

test("preserves document metadata on every chunk", () => {
  const chunks = chunkDocument(
    {
      id: "doc-1",
      content: "alpha\n\nbeta",
      source: "docs/example.md",
      metadata: {
        section: "memory",
      },
    },
    { maxCharacters: 100 },
  );

  assert.equal(chunks.length, 1);
  assert.equal(chunks[0].id, "doc-1");
  assert.equal(chunks[0].source, "docs/example.md");
  assert.deepEqual(chunks[0].metadata, { section: "memory" });
});

test("rejects a non-positive chunk size", () => {
  assert.throws(
    () =>
      chunkDocument(
        {
          id: "doc-1",
          content: "content",
          source: "test.md",
        },
        { maxCharacters: 0 },
      ),
    /maxCharacters must be greater than zero/,
  );
});

test("ignores empty paragraphs", () => {
  const chunks = chunkDocument({
    id: "doc-1",
    content: "\n\nalpha\n\n\n\nbeta\n\n",
    source: "test.md",
  });

  assert.equal(chunks.length, 1);
  assert.equal(chunks[0].content, "alpha\n\nbeta");
});
