#!/usr/bin/env bash
# Sync local public/ to the server directory (exact copy). Use when the server
# bind-mounts that directory as the site root in the container.

set -e

REMOTE="root@159.69.219.162"
REMOTE_DIR="/var/www/ferry/public"
PUBLIC_DIR="./public"

if [[ ! -d "$PUBLIC_DIR" ]]; then
  echo "Error: public directory not found at $PUBLIC_DIR"
  exit 1
fi

echo "==> Building site locally (npm run build)..."
npm run build

echo "Syncing $PUBLIC_DIR to $REMOTE:$REMOTE_DIR (exact copy)..."
rsync -a --delete "$PUBLIC_DIR/" "$REMOTE:$REMOTE_DIR/"
echo "Done."
