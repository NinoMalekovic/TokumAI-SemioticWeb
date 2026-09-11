export type MemoryMetadata = Record<string, string | number | boolean>;

export interface MemoryRecord {
  id: string;
  text: string;
  source?: string;
  metadata?: MemoryMetadata;
  embedding?: number[];
}

export interface MemorySearchResult {
  record: MemoryRecord;
  score: number;
}

export interface MemoryStore {
  upsert(records: MemoryRecord[]): void;
  delete(ids: string[]): void;
  get(id: string): MemoryRecord | undefined;
  search(queryEmbedding: number[], limit?: number): MemorySearchResult[];
}

export interface MemoryChunk {
  id: string;
  content: string;
  source: string;
  chunkIndex: number;
  metadata?: Record<string, string>;
}
