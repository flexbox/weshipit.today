import { allWorkshops, countChallenges } from '~/pages/api/workshop';

export const formatStats = (workshopsDone: number) => {
  const numberChallenges = countChallenges(allWorkshops);

  const workshopsDoneValue = (workshopsDone * 100) / numberChallenges;
  const workshopsDoneInPercent = workshopsDoneValue.toFixed(2);

  const result = [
    {
      name: 'Challenges completed',
      stat: `${workshopsDone}/${numberChallenges}`,
    },
    { name: 'Progression', stat: `${workshopsDoneInPercent}%` },
  ];
  return result;
};
