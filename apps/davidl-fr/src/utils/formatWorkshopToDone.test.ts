import {
  countDoneChallenges,
  formatWorshopToDone,
  isCurriculumChallenge,
} from './formatWorshopToDone';

const allWorkshops = [
  {
    id: 'foundation',
    title: 'Foundation',
    description:
      'The foundational skills you will need to create your first components with React Native and use a UI library called `react-native-paper`.',
    challenges: [
      {
        exercice: 1,
        title: '1',
        linkHref: '/workshop/challenges/foundation-01',
      },
      {
        exercice: 2,
        title: '2',
        linkHref: '/workshop/challenges/foundation-02',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data Layer',
    description:
      'The data layer is where you will store your data and connect it to your UI.',
    challenges: [
      {
        exercice: 1,
        title: '1',
        linkHref: '/workshop/challenges/data-01',
      },
      {
        exercice: 2,
        title: '2',
        linkHref: '/workshop/challenges/data-02',
      },
    ],
  },
];

describe('formatWorshopToDone', () => {
  it('should return an empty array if allWorkshops is empty', () => {
    expect(formatWorshopToDone([], [])).toEqual([]);
  });

  it('should return an array of workshops with challenges status `todo`', () => {
    const result = [
      {
        id: 'foundation',
        title: 'Foundation',
        description:
          'The foundational skills you will need to create your first components with React Native and use a UI library called `react-native-paper`.',
        challenges: [
          {
            exercice: 1,
            title: '1',
            linkHref: '/workshop/challenges/foundation-01',
            status: 'todo',
          },
          {
            exercice: 2,
            title: '2',
            linkHref: '/workshop/challenges/foundation-02',
            status: 'todo',
          },
        ],
      },
      {
        id: 'data',
        title: 'Data Layer',
        description:
          'The data layer is where you will store your data and connect it to your UI.',
        challenges: [
          {
            exercice: 1,
            title: '1',
            linkHref: '/workshop/challenges/data-01',
            status: 'todo',
          },
          {
            exercice: 2,
            title: '2',
            linkHref: '/workshop/challenges/data-02',
            status: 'todo',
          },
        ],
      },
    ];

    expect(formatWorshopToDone(allWorkshops, [])).toEqual(result);
  });

  it('should return an array of workshops with challenges status `done`', () => {
    const dataFromApi = [
      {
        module: 'foundation',
        exercise: 1,
        created_at: '2023-09-10T20:36:48.000Z',
      },
      {
        module: 'foundation',
        exercise: 2,
        created_at: '2023-09-10T20:36:48.000Z',
      },
      {
        module: 'data',
        exercise: 1,
        created_at: '2023-09-10T20:36:48.000Z',
      },
      {
        module: 'data',
        exercise: 2,
        created_at: '2023-09-10T20:36:48.000Z',
      },
    ];

    const result = [
      {
        id: 'foundation',
        title: 'Foundation',
        description:
          'The foundational skills you will need to create your first components with React Native and use a UI library called `react-native-paper`.',
        challenges: [
          {
            exercice: 1,
            title: '1',
            linkHref: '/workshop/challenges/foundation-01',
            status: 'done',
          },
          {
            exercice: 2,
            title: '2',
            linkHref: '/workshop/challenges/foundation-02',
            status: 'done',
          },
        ],
      },
      {
        id: 'data',
        title: 'Data Layer',
        description:
          'The data layer is where you will store your data and connect it to your UI.',
        challenges: [
          {
            exercice: 1,
            title: '1',
            linkHref: '/workshop/challenges/data-01',
            status: 'done',
          },
          {
            exercice: 2,
            title: '2',
            linkHref: '/workshop/challenges/data-02',
            status: 'done',
          },
        ],
      },
    ];

    expect(formatWorshopToDone(allWorkshops, dataFromApi)).toEqual(result);
  });

  it('should return an array of workshops with challenges status `done` and `todo`', () => {
    const dataFromApi = [
      {
        module: 'foundation',
        exercise: 1,
        created_at: '2023-09-10T20:36:48.000Z',
      },
      {
        module: 'foundation',
        exercise: 2,
        created_at: '2023-09-10T20:36:48.000Z',
      },
    ];

    const result = [
      {
        id: 'foundation',
        title: 'Foundation',
        description:
          'The foundational skills you will need to create your first components with React Native and use a UI library called `react-native-paper`.',
        challenges: [
          {
            exercice: 1,
            title: '1',
            linkHref: '/workshop/challenges/foundation-01',
            status: 'done',
          },
          {
            exercice: 2,
            title: '2',
            linkHref: '/workshop/challenges/foundation-02',
            status: 'done',
          },
        ],
      },
      {
        id: 'data',
        title: 'Data Layer',
        description:
          'The data layer is where you will store your data and connect it to your UI.',
        challenges: [
          {
            exercice: 1,
            title: '1',
            linkHref: '/workshop/challenges/data-01',
            status: 'todo',
          },
          {
            exercice: 2,
            title: '2',
            linkHref: '/workshop/challenges/data-02',
            status: 'todo',
          },
        ],
      },
    ];

    expect(formatWorshopToDone(allWorkshops, dataFromApi)).toEqual(result);
  });
});

const record = (module: string, exercise: number) => ({
  module,
  exercise,
  created_at: '2023-09-10T20:36:48.000Z',
});

describe('countDoneChallenges', () => {
  it('should return 0 without records', () => {
    expect(countDoneChallenges(allWorkshops, undefined)).toBe(0);
    expect(countDoneChallenges(allWorkshops, [])).toBe(0);
  });

  it('should count each challenge of the curriculum once', () => {
    const records = [
      record('foundation', 1),
      record('foundation', 1),
      record('data', 2),
    ];

    expect(countDoneChallenges(allWorkshops, records)).toBe(2);
  });

  it('should ignore legacy modules and exercises', () => {
    const records = [
      record('react-navigation', 1),
      record('GitHub 101', 1),
      record('foundation', 9),
      record('foundation', 2),
    ];

    expect(countDoneChallenges(allWorkshops, records)).toBe(1);
  });

  it('should never count more than the curriculum', () => {
    const records = [
      record('foundation', 1),
      record('foundation', 2),
      record('data', 1),
      record('data', 2),
      record('data', 2),
      record('react-navigation', 2),
    ];

    expect(countDoneChallenges(allWorkshops, records)).toBe(4);
  });

  it('should not count setup and hackathon', () => {
    const workshops = [
      ...allWorkshops,
      {
        id: 'setup',
        title: 'Setup',
        description: '',
        challenges: [
          { exercice: 1, title: '1', linkHref: '/workshop/challenges/setup' },
        ],
      },
    ];

    expect(countDoneChallenges(workshops, [record('setup', 1)])).toBe(0);
  });
});

describe('isCurriculumChallenge', () => {
  it('should accept a challenge of the curriculum', () => {
    expect(isCurriculumChallenge(allWorkshops, 'data', 2)).toBe(true);
  });

  it('should reject legacy modules and unknown exercises', () => {
    expect(isCurriculumChallenge(allWorkshops, 'react-navigation', 1)).toBe(
      false,
    );
    expect(isCurriculumChallenge(allWorkshops, 'foundation', 9)).toBe(false);
    expect(isCurriculumChallenge(allWorkshops, 'data', NaN)).toBe(false);
  });
});
