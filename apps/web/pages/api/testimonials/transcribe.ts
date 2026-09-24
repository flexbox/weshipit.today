import { get } from '@vercel/blob';
import { generateObject, transcribe } from 'ai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { verifyInviteToken } from '../../../utils/testimonials/token';
import { MEDIA_PREFIX } from '../../../utils/testimonials/store';
import type { TranscriptionDraft } from '../../../utils/testimonials/types';

const TRANSCRIPTION_MODEL = 'openai/gpt-4o-transcribe';
const REWRITE_MODEL = 'anthropic/claude-sonnet-5';

const REWRITE_SYSTEM_PROMPT = `You turn a spoken client testimonial into clean written English.

Rules:
- Keep the speaker's own voice, vocabulary and level of enthusiasm. Do not upgrade it.
- Invent nothing. Every fact, number and name must come from the transcript. If they did not say it, it does not appear.
- Add no superlatives the speaker did not use. No "amazing", "game-changing", "world-class".
- Stay in the first person, present the story as: the problem before, what was done, what changed.
- Remove filler ("um", "you know"), false starts and repetitions. Fix grammar. Keep contractions.
- review: 80 to 120 words, one or two short paragraphs, plain prose with no markdown.
- pullQuote: the single most concrete sentence, 15 words maximum, quotable on its own.

If the transcript is too short or too vague to support a testimonial, return the best faithful summary you can rather than padding it.`;

const rewriteSchema = z.object({
  pullQuote: z.string(),
  review: z.string(),
});

/**
 * Transcribes an already-uploaded clip and rewrites it. Deliberately stateless:
 * the client still has to review and edit before anything is persisted.
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<TranscriptionDraft | { error: string }>,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { audioPathname, inviteToken } = request.body ?? {};

  if (!inviteToken || !verifyInviteToken(inviteToken)) {
    return response.status(403).json({ error: 'Invalid invite' });
  }

  if (
    typeof audioPathname !== 'string' ||
    !audioPathname.startsWith(MEDIA_PREFIX)
  ) {
    return response.status(400).json({ error: 'Missing audio' });
  }

  try {
    const audio = await get(audioPathname, { access: 'private' });

    if (audio?.statusCode !== 200) {
      return response.status(404).json({ error: 'Audio not found' });
    }

    const { durationInSeconds, text } = await transcribe({
      audio: new Uint8Array(await new Response(audio.stream).arrayBuffer()),
      model: TRANSCRIPTION_MODEL,
    });

    if (!text.trim()) {
      return response
        .status(422)
        .json({ error: "We couldn't hear anything in that recording." });
    }

    const { object } = await generateObject({
      model: REWRITE_MODEL,
      prompt: text,
      schema: rewriteSchema,
      system: REWRITE_SYSTEM_PROMPT,
    });

    return response.status(200).json({
      durationInSeconds: durationInSeconds ?? null,
      pullQuote: object.pullQuote,
      rawTranscript: text,
      review: object.review,
    });
  } catch (error) {
    console.error('transcribe -> error', error);

    return response
      .status(500)
      .json({ error: 'Transcription failed. Please try again.' });
  }
}
