import { AirtableRecord, Workshop } from '~/types/workshop';

/**
 * This function takes 2 params `allWorkshops` as `data` and `recordsFromApi` from `swr` and return an array of Workshop with challenges done
 * @param allWorkshops as an array of Workshop
 * @param recordsFromApi Associate workshop done with challenges
    [{
      "name": "release",
      "exercice": 3,
      "date": "2023-09-10T20:36:48.000Z"
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
  recordsFromApi: AirtableRecord[],
) => {
  if (recordsFromApi === undefined) {
    return allWorkshops;
  }

  return allWorkshops.map((workshop) => {
    const challenges = workshop.challenges.map((challenge) => {
      const challengeData = recordsFromApi.find(
        (data) =>
          data.name === workshop.id && data.exercice === challenge.exercice,
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
