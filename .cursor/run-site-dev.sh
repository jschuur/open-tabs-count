#!/usr/bin/env bash
# Run the Next.js site dev server in a Cloud Agent VM.
#
# The committed `pnpm dev` script uses `sst dev`, which requires AWS credentials.
# Cloud Agent VMs have no AWS, so this script runs `next dev` directly and
# synthesizes the SST `Resource.Config` value from environment variables. It
# boots with or without secrets:
#   - With TINYBIRD_TOKEN_DASHBOARD + USER_EMAIL secrets set, the homepage
#     renders live charts from Tinybird.
#   - Without them, the app renders its built-in "User email not set" state.
set -euo pipefail

cd "$(dirname "$0")/../apps/site"

export SST_RESOURCE_Config="$(cat <<JSON
{
  "cachePolicy": "",
  "dataStaleTime": "${NEXT_PUBLIC_DATA_STALE_TIME:-900}",
  "debugOutput": "${NEXT_PUBLIC_DEBUG:-false}",
  "siteHostName": "",
  "tinybirdBaseUrl": "${TINYBIRD_BASE_URL:-https://api.tinybird.co}",
  "tinybirdTokenDashboard": "${TINYBIRD_TOKEN_DASHBOARD:-}",
  "userEmail": "${USER_EMAIL:-}"
}
JSON
)"

export NEXT_PUBLIC_DATA_STALE_TIME="${NEXT_PUBLIC_DATA_STALE_TIME:-900}"
export NEXT_PUBLIC_DEBUG="${NEXT_PUBLIC_DEBUG:-false}"

exec pnpm exec next dev -p "${PORT:-3000}"
