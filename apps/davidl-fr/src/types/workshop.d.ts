export interface Challenge {
  title: string;
  exercice: number;
  linkHref: string;
  nextLinkHref?: string;
  status?: 'todo' | 'done' | string;
}

export interface Workshop {
  title: string;
  id: string;
  description: string;
  urlPdf?: string;
  urlPreview?: string;
  urlPdf?: string;
  urlVideo?: string;
  challenges: Challenge[];
}

export interface AirtableRecord {
  name: string;
  exercice: number;
  date: string;
}
