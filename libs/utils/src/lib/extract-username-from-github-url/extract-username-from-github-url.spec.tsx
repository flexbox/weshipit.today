import extractUsernameFromGithubUrl from './extract-username-from-github-url';

describe('extractUsernameFromGithubUrl', () => {
  it('should extract username from a valid GitHub URL', () => {
    const url = 'https://github.com/username';
    const result = extractUsernameFromGithubUrl(url);
    expect(result).toEqual('username');
  });

  it('should return null for an invalid GitHub URL', () => {
    const url = 'https://notgithub.com/username';
    const result = extractUsernameFromGithubUrl(url);
    expect(result).toBeNull();
  });

  it('should return null for a GitHub URL without a username', () => {
    const url = 'https://github.com/';
    const result = extractUsernameFromGithubUrl(url);
    expect(result).toBeNull();
  });

  it('should handle URLs with trailing slashes', () => {
    const url = 'https://github.com/username/';
    const result = extractUsernameFromGithubUrl(url);
    expect(result).toEqual('username');
  });
});
