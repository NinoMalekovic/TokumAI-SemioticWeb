import type { MemoryChunk } from "./types.js";

export interface ChunkOptions {
  maxCharacters?: number;
}

export function chunkDocument(
  document: {
    id: string;
    content: string;
    source: string;
    metadata?: Record<string, string>;
  },
  options: ChunkOptions = {},
): MemoryChunk[] {
  const maxCharacters = options.maxCharacters ?? 2000;

  if (maxCharacters <= 0) {
    throw new Error("maxCharacters must be greater than zero");
  }

  const paragraphs = document.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const chunks: MemoryChunk[] = [];
  let current = "";

  const flush = () => {
    if (!current) return;

    chunks.push({
      ...document,
      chunkIndex: chunks.length,
      content: current,
    });

    current = "";
  };

  for (const paragraph of paragraphs) {
    if (paragraph.length > maxCharacters) {
      flush();

      for (let offset = 0; offset < paragraph.length; offset += maxCharacters) {
        chunks.push({
          ...document,
          chunkIndex: chunks.length,
          content: paragraph.slice(offset, offset + maxCharacters),
        });
      }

      continue;
    }

    const candidate = current
      ? `${current}\n\n${paragraph}`
      : paragraph;

    if (candidate.length <= maxCharacters) {
      current = candidate;
    } else {
      flush();
      current = paragraph;
    }
  }

  flush();

  return chunks;
}
