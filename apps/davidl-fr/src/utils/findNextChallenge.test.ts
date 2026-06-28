import '@testing-library/jest-dom';
import { findNextChallenge } from './findNextChallenge';

describe('findNextChallenge', () => {
  it('gives the name of the exercice for `setup`', () => {
    const source = '/workshop/challenges/setup';
    const result = findNextChallenge(source);
    expect(result).toBe('/workshop/challenges/foundation-01');
  });

  it('gives the name of the exercice for `foundation-05`', () => {
    const source = '/workshop/challenges/foundation-05';
    const result = findNextChallenge(source);
    expect(result).toBe('/workshop/challenges/data-01');
  });

  it('gives the name of the exercice for `data-03`', () => {
    const source = '/workshop/challenges/data-03';
    const result = findNextChallenge(source);
    expect(result).toBe('/workshop/challenges/ecosystem-01');
  });

  it('gives the name of the exercice for `ecosystem-05`', () => {
    const source = '/workshop/challenges/ecosystem-05';
    const result = findNextChallenge(source);
    expect(result).toBe('/workshop/challenges/react-navigation-01');
  });

  it('gives the name of the exercice for `react-navigation-04`', () => {
    const source = '/workshop/challenges/react-navigation-04';
    const result = findNextChallenge(source);
    expect(result).toBe('/workshop/challenges/release-01');
  });

  it('gives the name of the exercice for `release-03`', () => {
    const source = '/workshop/challenges/release-03';
    const result = findNextChallenge(source);
    expect(result).toBe('/workshop/challenges/hackathon');
  });
});
