import { ChallengeRecord, Workshop } from '~/types/workshop';

// Not part of the progression: no elaboration form for these.
const UNCOUNTED_WORKSHOPS = ['setup', 'hackathon'];

/**
 * This function takes 2 params `allWorkshops` as `data` and `records` from Supabase and return an array of Workshop with challenges done
 * @param allWorkshops as an array of Workshop
 * @param records Associate workshop done with challenges
    [{
      "module": "release",
      "exercise": 3,
      "created_at": "2023-09-10T20:36:48.000Z"
    }]
 * @output
    [
      {
        id: 'release',
        challenges: [
          {
            exercice: 3,
            status: 'done',
          }
        ]
      }
    ]
 * @returns allWorkshops with challenges done
 */

export const formatWorshopToDone = (
  allWorkshops: Workshop[],
  records: ChallengeRecord[] | undefined,
) => {
  if (records === undefined) {
    return allWorkshops;
  }

  return allWorkshops.map((workshop) => {
    const challenges = workshop.challenges.map((challenge) => {
      const challengeData = records.find(
        (record) =>
          record.module === workshop.id &&
          record.exercise === challenge.exercice,
      );

      return {
        ...challenge,
        status: challengeData ? 'done' : 'todo',
      };
    });

    return {
      ...workshop,
      challenges,
    };
  });
};

/**
 * Count the challenges of the current curriculum the user completed.
 * Legacy modules (react-navigation, GitHub 101…) and duplicates are ignored,
 * so the result never exceeds `countChallenges(allWorkshops)`.
 */
export const countDoneChallenges = (
  allWorkshops: Workshop[],
  records: ChallengeRecord[] | undefined,
) =>
  formatWorshopToDone(allWorkshops, records)
    .filter((workshop) => !UNCOUNTED_WORKSHOPS.includes(workshop.id))
    .flatMap((workshop) => workshop.challenges)
    .filter((challenge) => challenge.status === 'done').length;

/** Whether `module` / `exercise` is a challenge of the current curriculum. */
export const isCurriculumChallenge = (
  allWorkshops: Workshop[],
  module: string,
  exercise: number,
) =>
  allWorkshops.some(
    (workshop) =>
      workshop.id === module &&
      !UNCOUNTED_WORKSHOPS.includes(workshop.id) &&
      workshop.challenges.some((challenge) => challenge.exercice === exercise),
  );
