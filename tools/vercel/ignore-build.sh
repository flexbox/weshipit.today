#!/bin/sh
# Vercel "Ignored Build Step". Exit 0 skips the build, exit 1 builds.
# Usage (from the app root): sh ../../tools/vercel/ignore-build.sh <paths...>
#
# Vercel clones with --depth=10, so VERCEL_GIT_PREVIOUS_SHA (the last
# successful deploy) is missing once more than 10 commits land between
# deploys. A bare `git diff` then exits 128, which Vercel reports as a failed
# deployment. Fetch the base commit if it's missing, and build when in doubt.

BASE="${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}"

if ! git cat-file -e "$BASE^{commit}" 2>/dev/null; then
  git fetch --quiet --depth=1 origin "$BASE" 2>/dev/null
fi

if ! git cat-file -e "$BASE^{commit}" 2>/dev/null; then
  echo "Base commit $BASE not available, building."
  exit 1
fi

if git diff --quiet "$BASE" HEAD -- "$@"; then
  echo "No changes since $BASE, skipping build."
  exit 0
fi

echo "Changes since $BASE, building."
exit 1
