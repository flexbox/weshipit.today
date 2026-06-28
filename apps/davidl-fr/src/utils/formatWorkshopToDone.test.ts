import { formatWorshopToDone } from './formatWorshopToDone';

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
        name: 'foundation',
        exercice: 1,
        date: '2023-09-10T20:36:48.000Z',
      },
      {
        name: 'foundation',
        exercice: 2,
        date: '2023-09-10T20:36:48.000Z',
      },
      {
        name: 'data',
        exercice: 1,
        date: '2023-09-10T20:36:48.000Z',
      },
      {
        name: 'data',
        exercice: 2,
        date: '2023-09-10T20:36:48.000Z',
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
        name: 'foundation',
        exercice: 1,
        date: '2023-09-10T20:36:48.000Z',
      },
      {
        name: 'foundation',
        exercice: 2,
        date: '2023-09-10T20:36:48.000Z',
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
