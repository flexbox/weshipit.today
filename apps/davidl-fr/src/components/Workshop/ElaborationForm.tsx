import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { FormEvent, useState } from 'react';
import PrimaryButton from '~/components/Button/PrimaryButton';
import {
  fieldClassName,
  RatingField,
  ratingScale,
} from '~/components/Form/RatingField';
import { revalidateChallenges } from '~/components/Workshop/useSWRChallenge';
import { supabase } from '~/lib/supabase';

const LEARNED_MIN_LENGTH = 10;
const TEXT_MAX_LENGTH = 5000;
const RATINGS = ratingScale(0, 10);

// Postgres unique_violation: the challenge was already submitted (double click, other tab).
const UNIQUE_VIOLATION = '23505';

interface Props {
  email: string;
  module: string;
  exercise: number;
}

export const ElaborationForm = ({ email, exercise, module }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [learned, setLearned] = useState('');
  const [exerciseRating, setExerciseRating] = useState<number | null>(null);
  const [instructionsRating, setInstructionsRating] = useState<number | null>(
    null,
  );
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || exerciseRating === null || instructionsRating === null) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // `email` is filled by the database from the session, RLS rejects any other value.
    const { error } = await supabase.from('challenge').insert({
      comments: comments.trim() || null,
      exercise,
      exercise_rating: exerciseRating,
      instructions_rating: instructionsRating,
      learned: learned.trim(),
      module,
    });

    if (error && error.code !== UNIQUE_VIOLATION) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    // Elaboration switches to the completed state once the list is refetched.
    await revalidateChallenges(email);
    setIsSubmitting(false);
  }

  return (
    <section className="mt-8">
      <h2>🏅 Elaboration and Feedback</h2>
      <p>
        After the exercice, <strong>remember what you’ve just learned</strong>{' '}
        and <strong>update your progression</strong>.
      </p>
      <PrimaryButton type="button" onClick={() => setIsOpen(true)}>
        Answer the questions
      </PrimaryButton>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/60" />
        <div className="fixed inset-0 overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="w-full max-w-xl rounded-lg bg-white p-6 text-gray-900 shadow-xl dark:border dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100">
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="text-xl font-bold">
                  🏅 Elaboration and Feedback
                </DialogTitle>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="-m-2 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white dark:focus-visible:outline-orange-400"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="size-6" aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <label className="mt-6 block">
                  <span className="font-semibold">What did you learn?</span>
                  <textarea
                    name="learned"
                    value={learned}
                    onChange={(event) => setLearned(event.target.value)}
                    minLength={LEARNED_MIN_LENGTH}
                    maxLength={TEXT_MAX_LENGTH}
                    rows={5}
                    required
                    className={fieldClassName}
                  />
                </label>

                <RatingField
                  label="How was the exercise?"
                  name="exercise_rating"
                  ratings={RATINGS}
                  value={exerciseRating}
                  onChange={setExerciseRating}
                />

                <RatingField
                  label="How were the instructions?"
                  name="instructions_rating"
                  ratings={RATINGS}
                  value={instructionsRating}
                  onChange={setInstructionsRating}
                />

                <label className="mt-6 block">
                  <span className="font-semibold">Comments</span>{' '}
                  <span className="text-gray-500 dark:text-gray-400">
                    (optional)
                  </span>
                  <textarea
                    name="comments"
                    value={comments}
                    onChange={(event) => setComments(event.target.value)}
                    maxLength={TEXT_MAX_LENGTH}
                    rows={3}
                    className={fieldClassName}
                  />
                </label>

                {errorMessage && (
                  <p
                    role="alert"
                    className="mt-4 text-red-600 dark:text-red-400"
                  >
                    {errorMessage}
                  </p>
                )}

                <div className="mt-6 flex justify-end">
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : 'Complete the challenge'}
                  </PrimaryButton>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  );
};
