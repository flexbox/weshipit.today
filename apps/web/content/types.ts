export interface LocalImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

/** A paragraph made of text segments; `strong` renders bold, `em` italic. */
export type RichParagraph = { text: string; strong?: boolean; em?: boolean }[];
