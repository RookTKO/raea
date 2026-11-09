#!/usr/bin/env sh
# Point this project's media/ at a GemCore checkout, so staticFile("sprites/...") reads GemCore's own files.
# Usage: tools/link-gemcore.sh [PATH_TO_GEMCORE]   (default: GemCore cloned beside the raea checkout)
set -eu
here=$(cd "$(dirname "$0")/.." && pwd)
gem=${1:-"$here/../../../GemCore"}
[ -f "$gem/RookTKOs GemCore.yyp" ] || { echo "no GemCore project at $gem (pass its path)" >&2; exit 1; }
gem=$(cd "$gem" && pwd)
rm -f "$here/media"
ln -s "$gem" "$here/media"
echo "media -> $gem"
