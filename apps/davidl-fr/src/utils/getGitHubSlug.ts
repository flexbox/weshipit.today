/**
 * Take an url from the website and build the slug for github repository
 * @param url /workshop/challenges/release-01
 * @returns /release/01
 */

export function getGitHubSlug(url: string) {
  if (url === undefined) {
    return 'setup';
  } else {
    const urlSplitter = url.split('-');
    const challengeNumber = urlSplitter.pop();
    const challengeName = urlSplitter.join('-');
    const finalUrl = `${challengeName}/${challengeNumber}`;
    return finalUrl;
  }
}
export function getGithubChallengeUrl(url: string) {
  const githubSlug = getGitHubSlug(url);
  if (githubSlug === '/setup') {
    return 'https://github.com/flexbox/react-native-bootcamp/tree/main/setup';
  } else {
    const GITHUB_URL =
      'https://github.com/flexbox/react-native-bootcamp/tree/main/challenges';
    const finalUrl = `${GITHUB_URL}/${githubSlug}.md`;
    return finalUrl;
  }
}

/**
 * Module id of a challenge: everything before the trailing exercise number.
 * @example getChallengeName('expo-router-01') // 'expo-router'
 */
export function getChallengeName(url: string) {
  const parts = url.split('-');
  if (parts.length > 1 && /^\d+$/.test(parts[parts.length - 1])) {
    parts.pop();
  }

  return parts.join('-');
}

export function getLastChallengeName(linkHref: string) {
  const parts = linkHref.split('/').filter(Boolean);
  const lastChallengeName = parts.pop();
  return lastChallengeName;
}

export function getChallengeNumber(url: string) {
  const urlSplitter = url.split('-');

  if (urlSplitter.length === 1) {
    return '01';
  }

  const challengeNumber = urlSplitter.pop();
  return challengeNumber;
}
