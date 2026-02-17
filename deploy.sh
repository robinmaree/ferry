#!/usr/bin/env bash
set -e

REMOTE="root@159.69.219.162"
REMOTE_DIR="/var/www/ferry"
IMAGE="ferry:latest"

echo "==> Building Docker image..."
docker build -t "$IMAGE" .

echo "==> Pushing image to server (via SSH)..."
docker save "$IMAGE" | gzip | ssh "$REMOTE" "gunzip | docker load"

echo "==> Uploading docker-compose.yml..."
ssh "$REMOTE" "mkdir -p $REMOTE_DIR"
scp docker-compose.yml "$REMOTE:$REMOTE_DIR/"

echo "==> Starting on server..."
ssh "$REMOTE" "cd $REMOTE_DIR && docker compose up -d"

echo "==> Done. App should be running at http://159.69.219.162"
