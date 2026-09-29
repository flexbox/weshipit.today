import {
  customId,
  decodeSlots,
  encodeSlots,
  fromSearchParams,
  GRID_SIZE,
  resolvePick,
  sanitizeCustomName,
  toSearchParams,
} from './grid-state';

describe('grid-state', () => {
  it('round-trips catalog picks, years, custom names and empty slots', () => {
    const slots = [
      { id: 'react', year: 2015 },
      null,
      { id: customId('Legend State') },
      { id: 'expo' },
      null,
      null,
      null,
      null,
      { id: 'sass', year: 2011 },
    ];

    expect(decodeSlots(encodeSlots(slots))).toEqual(slots);
  });

  it('always returns nine slots', () => {
    expect(decodeSlots('react,expo')).toHaveLength(GRID_SIZE);
    expect(decodeSlots('')).toHaveLength(GRID_SIZE);
    expect(decodeSlots(Array(20).fill('react').join(','))).toHaveLength(
      GRID_SIZE,
    );
  });

  it('drops unknown ids, duplicates and invalid years', () => {
    const slots = decodeSlots('react,not-a-framework,react,vue@99999');

    expect(slots.slice(0, 4)).toEqual([
      { id: 'react' },
      null,
      null,
      { id: 'vue' },
    ]);
  });

  it('strips characters reserved by the URL format from custom names', () => {
    expect(sanitizeCustomName('  My,  @weird~ lib  ')).toBe('My weird lib');
    expect(resolvePick({ id: '~' })).toBeNull();
  });

  it('builds share params that survive URL decoding', () => {
    const query = toSearchParams({
      slots: decodeSlots('rails@2012,~Legend State,react'),
      title: 'David & friends',
    });
    const params = Object.fromEntries(new URLSearchParams(query));
    const state = fromSearchParams(params);

    expect(state.title).toBe('David & friends');
    expect(state.slots.slice(0, 3)).toEqual([
      { id: 'rails', year: 2012 },
      { id: '~Legend State' },
      { id: 'react' },
    ]);
  });
});
