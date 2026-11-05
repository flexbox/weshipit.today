import { allWorkshops, countChallenges } from '~/pages/api/workshop';

export const statsLabels = {
  completed: 'Completed',
  progress: 'Progress',
};

export const formatStats = (workshopsDone: number) => {
  const numberChallenges = countChallenges(allWorkshops);

  const workshopsDoneValue = (workshopsDone * 100) / numberChallenges;
  const workshopsDoneInPercent = workshopsDoneValue.toFixed(2);

  const result = [
    {
      name: statsLabels.completed,
      stat: `${workshopsDone}/${numberChallenges}`,
    },
    { name: statsLabels.progress, stat: `${workshopsDoneInPercent}%` },
  ];
  return result;
};
