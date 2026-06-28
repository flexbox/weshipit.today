import { AirtableRecord, Workshop } from '~/types/workshop';
import { useSWRChallengesList } from './useSWRChallenge';
import { formatWorshopToDone } from '~/utils/formatWorshopToDone';

export function useFormatWorkshopDone(
  data: Workshop[],
  currentUserEmail: string | undefined,
) {
  const { data: challengesList } = useSWRChallengesList(currentUserEmail);
  const result = formatWorshopToDone(
    data,
    challengesList?.challenge as AirtableRecord[],
  );
  return { data: result, error: null };
}
