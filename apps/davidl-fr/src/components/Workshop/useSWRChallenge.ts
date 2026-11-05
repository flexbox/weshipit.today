import useSWR, { mutate } from 'swr';
import { supabase } from '~/lib/supabase';
import { ChallengeRecord } from '~/types/workshop';

// RLS only returns the signed-in student's rows, the email is part of the key
// so switching account never shows a cached list.
const challengesKey = (email: string) => ['challenges', email.toLowerCase()];

async function fetchChallenges(): Promise<ChallengeRecord[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('challenge')
    .select('module, exercise, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export function useSWRChallengesList(email: string | undefined) {
  const { data, error, isLoading } = useSWR(
    email ? challengesKey(email) : null,
    fetchChallenges,
  );

  return {
    challenges: data,
    error,
    isLoading,
  };
}

export function useSWRChallengeStatus(
  email: string,
  challengeName: string,
  challengeNumber: number,
) {
  const { challenges, error, isLoading } = useSWRChallengesList(email);

  const isDone = challenges?.some(
    (challenge) =>
      challenge.module === challengeName &&
      challenge.exercise === challengeNumber,
  );

  return {
    error,
    isDone,
    isLoading,
  };
}

export function revalidateChallenges(email: string) {
  return mutate(challengesKey(email));
}

async function fetchAlumniCount(): Promise<number> {
  if (!supabase) return 0;

  const { data, error } = await supabase.rpc('alumni_count');

  if (error) throw error;
  return data;
}

export function useSWRAlumniCount() {
  const { data, error, isLoading } = useSWR('alumni-count', fetchAlumniCount);

  return {
    alumniCount: data,
    error,
    isLoading,
  };
}
