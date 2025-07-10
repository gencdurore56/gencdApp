#!/usr/bin/env bash
set -euo pipefail

: "${EXTENSION_BUNDLESIZE_STATS_TOKEN:?EXTENSION_BUNDLESIZE_STATS_TOKEN environment variable must be set}"
: "${GITHUB_SHA:?GITHUB_SHA environment variable must be set}"
: "${GITHUB_REPOSITORY_OWNER:?GITHUB_REPOSITORY_OWNER environment variable must be set}"

rm -rf temp
git config --global user.email "gencdappbot@users.noreply.github.com"
git config --global user.name "gencdApp Bot"
git clone --depth 1 https://github.com/gencdApp/extension_bundlesize_stats.git temp

BUNDLE_SIZE_FILE="test-artifacts/chrome/bundle_size_stats.json"
STATS_FILE="temp/stats/bundle_size_data.json"

[[ -f "$STATS_FILE" ]] || echo '{}' > "$STATS_FILE"

jq . "$STATS_FILE" > /dev/null || { echo "Error: Existing stats JSON is invalid"; exit 1; }
jq . "$BUNDLE_SIZE_FILE" > /dev/null || { echo "Error: New bundle size JSON is invalid"; exit 1; }

if jq -e --arg sha "$GITHUB_SHA" 'has($sha)' "$STATS_FILE" > /dev/null; then
    echo "SHA $GITHUB_SHA already exists in stats file. No new commit needed."
    exit 0
fi

jq --arg sha "$GITHUB_SHA" --slurpfile data <(cat "$BUNDLE_SIZE_FILE") \
   '. + {($sha): $data[0]}' "$STATS_FILE" > "${STATS_FILE}.tmp"

mv "${STATS_FILE}.tmp" "$STATS_FILE"

cd temp
git add stats/bundle_size_data.json
git commit -m "Adding bundle size at commit: $GITHUB_SHA"
repo_slug="${GITHUB_REPOSITORY_OWNER}/extension_bundlesize_stats"
git push https://gencdappbot:"$EXTENSION_BUNDLESIZE_STATS_TOKEN"@github.com/"$repo_slug".git main

cd ..
rm -rf temp
