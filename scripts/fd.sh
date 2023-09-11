#!/usr/bin/env bash
set -e

readonly SCRIPT_DIR=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
cd $SCRIPT_DIR && cd ..

if command -v fd &> /dev/null; then
  FD_CMD=$(command -v fd)
else
  FD_CMD="./node_modules/.bin/fd"
fi

"$FD_CMD" -g '**/*.{ts,tsx}' -E '__tests__' src
