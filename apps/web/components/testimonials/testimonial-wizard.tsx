import { upload } from '@vercel/blob/client';
import { Button, Card, Text } from '@weshipit/ui';
import { useState } from 'react';

import { AudioRecorder, extensionForMimeType } from './audio-recorder';
import type { TranscriptionDraft } from '../../utils/testimonials/types';

const INPUT_CLASS_NAME =
  'w-full rounded-md border-0 bg-white px-3.5 py-2.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10';

const LABEL_CLASS_NAME =
  'mb-1.5 block text-sm font-medium text-slate-900 dark:text-slate-100';

const PROMPTS = [
  'What was the problem before we worked together?',
  'What did we actually do?',
  'What changed as a result?',
];

type Step = 'record' | 'review' | 'details' | 'done';

interface TestimonialWizardProps {
  company: string;
  id: string;
  inviteToken: string;
  name: string;
}

export function TestimonialWizard({
  company,
  id,
  inviteToken,
  name,
}: TestimonialWizardProps) {
  const [step, setStep] = useState<Step>('record');
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [recording, setRecording] = useState<{
    blob: Blob;
    mimeType: string;
  } | null>(null);
  const [draft, setDraft] = useState<TranscriptionDraft | null>(null);
  const [audioPathname, setAudioPathname] = useState<string | null>(null);

  const [review, setReview] = useState('');
  const [pullQuote, setPullQuote] = useState('');
  const [fullName, setFullName] = useState(name);
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState(company);
  const [photo, setPhoto] = useState<File | null>(null);

  const firstName = name.split(' ')[0] || 'there';

  const handleTranscribe = async () => {
    if (!recording) {
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const extension = extensionForMimeType(recording.mimeType);
      const pathname = `testimonials/media/${id}/audio.${extension}`;

      await upload(pathname, recording.blob, {
        access: 'private',
        clientPayload: inviteToken,
        contentType: recording.mimeType,
        handleUploadUrl: '/api/testimonials/upload',
      });

      const response = await fetch('/api/testimonials/transcribe', {
        body: JSON.stringify({ audioPathname: pathname, inviteToken }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? 'Something went wrong.');
      }

      setAudioPathname(pathname);
      setDraft(payload as TranscriptionDraft);
      setReview(payload.review);
      setPullQuote(payload.pullQuote);
      setStatus('idle');
      setStep('review');
    } catch (caught) {
      setErrorMessage((caught as Error).message);
      setStatus('error');
    }
  };

  const handleSubmit = async () => {
    if (!audioPathname) {
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      let photoPathname: string | null = null;

      if (photo) {
        const extension = photo.name.split('.').pop() ?? 'jpg';
        photoPathname = `testimonials/media/${id}/photo.${extension}`;

        await upload(photoPathname, photo, {
          access: 'private',
          clientPayload: inviteToken,
          contentType: photo.type,
          handleUploadUrl: '/api/testimonials/upload',
        });
      }

      const response = await fetch('/api/testimonials/submit', {
        body: JSON.stringify({
          audioPathname,
          company: companyName,
          durationInSeconds: draft?.durationInSeconds ?? null,
          fullName,
          id,
          inviteToken,
          jobTitle,
          photoPathname,
          pullQuote,
          rawTranscript: draft?.rawTranscript ?? '',
          review,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error ?? 'Something went wrong.');
      }

      setStatus('success');
      setStep('done');
    } catch (caught) {
      setErrorMessage((caught as Error).message);
      setStatus('error');
    }
  };

  if (step === 'done') {
    return (
      <Card size="lg" className="mx-auto max-w-2xl text-center">
        <Text as="h2" variant="h2" className="text-slate-900 dark:text-white">
          Thanks — got it.
        </Text>
        <Text
          as="p"
          variant="p1"
          className="mt-4 text-slate-600 dark:text-slate-400"
        >
          David will review it before anything goes live.
        </Text>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Text as="h1" variant="h1" className="text-slate-900 dark:text-white">
        Tell us how it went, {firstName}
      </Text>
      <Text
        as="p"
        variant="p1"
        className="mt-4 text-slate-600 dark:text-slate-400"
      >
        Two minutes of talking. We&apos;ll write it up for you.
      </Text>

      {step === 'record' ? (
        <Card size="lg" className="mt-10">
          <ol className="mb-8 space-y-3">
            {PROMPTS.map((prompt, index) => (
              <li
                key={prompt}
                className="flex gap-3 text-slate-700 dark:text-slate-300"
              >
                <span className="font-mono text-sm text-slate-400">
                  {index + 1}
                </span>
                <span>{prompt}</span>
              </li>
            ))}
          </ol>

          <AudioRecorder
            disabled={status === 'submitting'}
            onRecorded={setRecording}
          />

          {recording ? (
            <div className="mt-8 flex justify-center">
              <Button
                as="button"
                disabled={status === 'submitting'}
                onClick={handleTranscribe}
                size="lg"
                variant="primary"
              >
                {status === 'submitting' ? 'Writing it up…' : 'Use this take'}
              </Button>
            </div>
          ) : null}
        </Card>
      ) : null}

      {step === 'review' ? (
        <Card size="lg" className="mt-10">
          <Text
            as="p"
            variant="p1"
            className="mb-6 text-slate-700 dark:text-slate-300"
          >
            Here&apos;s your testimonial — edit anything that doesn&apos;t sound
            like you.
          </Text>

          <label className={LABEL_CLASS_NAME} htmlFor="review">
            Your testimonial
          </label>
          <textarea
            className={INPUT_CLASS_NAME}
            id="review"
            onChange={(event) => setReview(event.target.value)}
            rows={8}
            value={review}
          />

          <label className={`${LABEL_CLASS_NAME} mt-6`} htmlFor="pullQuote">
            The one-line version
          </label>
          <input
            className={INPUT_CLASS_NAME}
            id="pullQuote"
            onChange={(event) => setPullQuote(event.target.value)}
            type="text"
            value={pullQuote}
          />

          <div className="mt-8 flex justify-end">
            <Button
              as="button"
              disabled={!review.trim()}
              onClick={() => setStep('details')}
              size="lg"
              variant="primary"
            >
              Looks right
            </Button>
          </div>
        </Card>
      ) : null}

      {step === 'details' ? (
        <Card size="lg" className="mt-10">
          <div className="space-y-6">
            <div>
              <label className={LABEL_CLASS_NAME} htmlFor="fullName">
                Full name
              </label>
              <input
                className={INPUT_CLASS_NAME}
                id="fullName"
                onChange={(event) => setFullName(event.target.value)}
                required
                type="text"
                value={fullName}
              />
            </div>

            <div>
              <label className={LABEL_CLASS_NAME} htmlFor="jobTitle">
                Job title
              </label>
              <input
                className={INPUT_CLASS_NAME}
                id="jobTitle"
                onChange={(event) => setJobTitle(event.target.value)}
                type="text"
                value={jobTitle}
              />
            </div>

            <div>
              <label className={LABEL_CLASS_NAME} htmlFor="company">
                Company
              </label>
              <input
                className={INPUT_CLASS_NAME}
                id="company"
                onChange={(event) => setCompanyName(event.target.value)}
                type="text"
                value={companyName}
              />
            </div>

            <div>
              <label className={LABEL_CLASS_NAME} htmlFor="photo">
                Photo (optional)
              </label>
              <input
                accept="image/jpeg, image/png, image/webp"
                className={INPUT_CLASS_NAME}
                id="photo"
                onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
                type="file"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              as="button"
              disabled={!fullName.trim() || status === 'submitting'}
              onClick={handleSubmit}
              size="lg"
              variant="primary"
            >
              {status === 'submitting' ? 'Sending…' : 'Send it'}
            </Button>
          </div>
        </Card>
      ) : null}

      {errorMessage ? (
        <Text
          as="p"
          variant="p2"
          className="mt-6 text-center text-red-600 dark:text-red-400"
        >
          {errorMessage}
        </Text>
      ) : null}
    </div>
  );
}
