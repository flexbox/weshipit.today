function extractUsernameFromGithubUrl(githubUrl: string): string | null {
  if (!githubUrl) {
    return null;
  }

  if (githubUrl.split('/')[2] !== 'github.com') {
    return null;
  }

  if (githubUrl.split('/')[3] === '') {
    return null;
  }

  return githubUrl.split('/')[3];
}

export default extractUsernameFromGithubUrl;
