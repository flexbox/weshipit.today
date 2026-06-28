import { allWorkshops } from '~/pages/api/workshop';

export const findNextChallenge = (current: string) => {
  let result = '/workshop';

  allWorkshops.map((workshop) => {
    workshop.challenges.map((challenge) => {
      if (challenge.linkHref === current) {
        result = challenge.nextLinkHref as string;
      }
    });
  });

  return result;
};
