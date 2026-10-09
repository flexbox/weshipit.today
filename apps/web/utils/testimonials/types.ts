export type TestimonialStatus = 'pending' | 'published' | 'rejected';

export interface TestimonialRecord {
  audioPathname: string;
  company: string;
  createdAt: string;
  durationInSeconds: number | null;
  fullName: string;
  id: string;
  jobTitle: string;
  photoPathname: string | null;
  publishedAt: string | null;
  pullQuote: string;
  rawTranscript: string;
  review: string;
  slug: string;
  status: TestimonialStatus;
}

/**
 * What `/api/testimonials/transcribe` hands back to the wizard. Nothing is
 * persisted at that point — the client still has to review and edit it.
 */
export interface TranscriptionDraft {
  durationInSeconds: number | null;
  pullQuote: string;
  rawTranscript: string;
  review: string;
}

/** Payload carried inside a signed invite link. */
export interface InvitePayload {
  company: string;
  exp: number;
  name: string;
}
