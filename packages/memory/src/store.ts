import type {
  MemoryRecord,
  MemorySearchResult,
  MemoryStore,
} from "./types.js";

function cosineSimilarity(a: number[], b: number[]): number | undefined {
  if (a.length !== b.length || a.length === 0) {
    return undefined;
  }

  let dot = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return undefined;
  }

  return dot / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

export class InMemoryStore implements MemoryStore {
  private readonly records = new Map<string, MemoryRecord>();

  upsert(records: MemoryRecord[]): void {
    for (const record of records) {
      this.records.set(record.id, record);
    }
  }

  delete(ids: string[]): void {
    for (const id of ids) {
      this.records.delete(id);
    }
  }

  get(id: string): MemoryRecord | undefined {
    return this.records.get(id);
  }

  search(queryEmbedding: number[], limit = 5): MemorySearchResult[] {
    if (queryEmbedding.length === 0) {
      return [];
    }

    const results: MemorySearchResult[] = [];

    for (const record of this.records.values()) {
      if (!record.embedding) {
        continue;
      }

      const score = cosineSimilarity(queryEmbedding, record.embedding);

      if (score !== undefined) {
        results.push({ record, score });
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.max(0, limit));
  }
}
