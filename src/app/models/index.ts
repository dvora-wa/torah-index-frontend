export enum IndexType {
  SOURCES = 'sources',
  TOPICS = 'topics',
  PERSONS = 'persons',
}

export interface IndexEntry {
  term: string;
  pageNumbers: number[];
  description?: string;
}

export interface IndexResponse {
  data: { entries: IndexEntry[] };
  previewEntries: IndexEntry[];
}
