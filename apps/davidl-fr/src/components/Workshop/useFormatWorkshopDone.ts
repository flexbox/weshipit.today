import { Workshop } from '~/types/workshop';
import { useSWRChallengesList } from './useSWRChallenge';
import { formatWorshopToDone } from '~/utils/formatWorshopToDone';

export function useFormatWorkshopDone(
  data: Workshop[],
  currentUserEmail: string | undefined,
) {
  const { challenges } = useSWRChallengesList(currentUserEmail);
  const result = formatWorshopToDone(data, challenges);
  return { data: result, error: null };
}
