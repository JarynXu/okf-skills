#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: okf-health.sh <bundle-path>" >&2
  exit 2
fi

if ! command -v okf >/dev/null 2>&1; then
  printf '{"ok":false,"error":"okf CLI is not available on PATH"}\n'
  exit 3
fi

bundle="$1"
if [[ ! -d "$bundle" ]]; then
  printf '{"ok":false,"error":"bundle path is not a directory"}\n'
  exit 3
fi

okf --bundle "$bundle" --output json validate
