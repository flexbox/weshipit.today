import type { GridState } from '../lib/grid-state';

// David's own grid, shown on the home page. Order = the journey, oldest first.
// Add a `year` to any pick to print "since 20XX" on its tile.
export const MY_NINE: GridState = {
  slots: [
    { id: 'sass' },
    { id: 'rails' },
    { id: 'gatsby' },
    { id: 'react' },
    { id: 'typescript' },
    { id: 'react-native' },
    { id: 'expo' },
    { id: 'tailwind' },
    { id: 'legend-state' },
  ],
  title: 'David Leuliette',
};
