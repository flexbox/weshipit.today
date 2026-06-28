import '@testing-library/jest-dom';
import {
  getChallengeName,
  getChallengeNumber,
  getGithubChallengeUrl,
  getGitHubSlug,
  getLastChallengeName,
} from './getGitHubSlug';

describe('getChallengeName', () => {
  it('gives the name of the exercice for `setup`', () => {
    const source = 'setup';
    const result = getChallengeName(source);
    expect(result).toBe('setup');
  });

  it('gives the name of the exercice for `release-01`', () => {
    const source = 'release-01';
    const result = getChallengeName(source);
    expect(result).toBe('release');
  });

  it('gives the name of the exercice for `react-navigation-01`', () => {
    const source = 'react-navigation-01';
    const result = getChallengeName(source);
    expect(result).toBe('react-navigation');
  });

  it('gives the name of the exercice for `foundation-01`', () => {
    const source = 'foundation-01';
    const result = getChallengeName(source);
    expect(result).toBe('foundation');
  });

  it('gives the name of the exercice for `ecosystem-01`', () => {
    const source = 'ecosystem-01';
    const result = getChallengeName(source);
    expect(result).toBe('ecosystem');
  });

  it('gives the name of the exercice for `data-01`', () => {
    const source = 'data-01';
    const result = getChallengeName(source);
    expect(result).toBe('data');
  });
});

describe('getChallengeNumber', () => {
  it('gives the number of the exercice for `release-01`', () => {
    const source = 'release-01';
    const result = getChallengeNumber(source);
    expect(result).toBe('01');
  });

  it('gives the number 01 when `setup`', () => {
    const source = 'setup';
    const result = getChallengeNumber(source);
    expect(result).toBe('01');
  });
});

describe('getGitHubChallengeUrl', () => {
  it('gives the githubUrl for foundation-01', () => {
    const source = 'foundation-01';
    const slug = getGithubChallengeUrl(source);
    const result = slug;
    expect(result).toBe(
      'https://github.com/flexbox/react-native-bootcamp/tree/main/challenges/foundation/01.md',
    );
  });
});

describe('getGithubChallengeUrlForSetup', () => {
  it('gives the githubUrl for setup', () => {
    const source = 'setup';
    const result = getGithubChallengeUrl(source);
    expect(result).toBe(
      'https://github.com/flexbox/react-native-bootcamp/tree/main/setup',
    );
  });
});

describe('getLastChallengeName', () => {
  it('gives the challenge url', () => {
    const source = '/workshop/challenges/release-03';
    const result = getLastChallengeName(source);
    expect(result).toBe('release-03');
  });
});
