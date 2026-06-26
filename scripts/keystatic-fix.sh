#!/usr/bin/env bash
# Workaround: @keystatic/core 0.5.50 expects expires_in/refresh_token from GitHub OAuth
# token exchange, but modern GitHub OAuth Apps no longer return these fields (deprecation
# Jan 2025). This injects defaults before schema parsing so login succeeds.
# Idempotent: safe to run multiple times. Reapplies after every `npm install`.
set -euo pipefail

DIR="node_modules/@keystatic/core/dist"
if [ ! -d "$DIR" ]; then
  echo "[keystatic-fix] @keystatic/core not installed yet, skipping."
  exit 0
fi

FILES=(
  "keystatic-core-api-generic.node.js"
  "keystatic-core-api-generic.js"
  "keystatic-core-api-generic.react-server.js"
  "keystatic-core-api-generic.worker.js"
)

MARKER="keystatic-oauth-fix-applied"

for f in "${FILES[@]}"; do
  FILE="$DIR/$f"
  if [ ! -f "$FILE" ]; then
    echo "[keystatic-fix] $f not found, skipping."
    continue
  fi
  if grep -q "$MARKER" "$FILE"; then
    echo "[keystatic-fix] $f already patched, skipping."
    continue
  fi
  perl -0pi -e "s/const _tokenData = await tokenRes\.json\(\);/const _tokenData = await tokenRes.json(); \/* $MARKER *\/ if (_tokenData \&\& _tokenData.expires_in === undefined) _tokenData.expires_in = 28800; if (_tokenData \&\& _tokenData.refresh_token === undefined) _tokenData.refresh_token = \"\"; if (_tokenData \&\& _tokenData.refresh_token_expires_in === undefined) _tokenData.refresh_token_expires_in = 28800;/g" "$FILE"
  echo "[keystatic-fix] patched $f"
done

echo "[keystatic-fix] done."