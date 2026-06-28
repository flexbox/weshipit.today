import { allWorkshops, countChallenges } from '~/pages/api/workshop';

describe('workshop', () => {
  it('should count the number of challengers to display "Challenges completed"', () => {
    const numberChallenges = countChallenges(allWorkshops);
    expect(numberChallenges).toBe(22);
  });
});
