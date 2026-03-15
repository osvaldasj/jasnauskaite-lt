#!/bin/bash
# Deploy script for jasnauskaite.lt
# Maintains git history so Hostinger can just pull (no need to delete/recreate repo)

set -e

REPO_URL="https://github.com/osvaldasj/jasnauskaite-lt.git"
BRANCH="main"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$PROJECT_DIR/out"
GIT_BACKUP="$PROJECT_DIR/.deploy-git"

# Pre-flight checks
command -v npm >/dev/null 2>&1 || { echo "npm not found. Install Node.js first."; exit 1; }
command -v git >/dev/null 2>&1 || { echo "git not found. Install git first."; exit 1; }

cd "$PROJECT_DIR"

echo "=== 1. Building Next.js ==="
npm run build

echo "=== 2. Restoring git history ==="
if [ -d "$GIT_BACKUP" ]; then
    echo "   Restoring .git from backup..."
    cp -r "$GIT_BACKUP" "$OUT_DIR/.git"
elif [ ! -d "$OUT_DIR/.git" ]; then
    echo "   No git history found. Initializing fresh repo..."
    cd "$OUT_DIR"
    git init
    git remote add origin "$REPO_URL"
    git checkout -b "$BRANCH"
    cd "$PROJECT_DIR"
fi

# Ensure git config is set for this repo
cd "$OUT_DIR"
git config user.name "Deploy Bot" 2>/dev/null || true
git config user.email "deploy@jasnauskaite.lt" 2>/dev/null || true

echo "=== 3. Committing changes ==="
git add -A
if git diff --cached --quiet; then
    echo "   No changes to deploy."
    exit 0
fi
COMMIT_MSG="Deploy $(date '+%Y-%m-%d %H:%M')"
git commit -m "$COMMIT_MSG"

echo "=== 4. Pushing to GitHub ==="
git push origin "$BRANCH" --force-with-lease || git push origin "$BRANCH" --force

echo "=== 5. Backing up .git for next deploy ==="
cd "$PROJECT_DIR"
rm -rf "$GIT_BACKUP"
cp -r "$OUT_DIR/.git" "$GIT_BACKUP"

echo ""
echo "=== Deploy complete! ==="
echo "Commit: $COMMIT_MSG"
echo ""
echo "Next: go to Hostinger Git page and click 'Įdiegti'."
