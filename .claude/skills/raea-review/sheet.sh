#!/usr/bin/env bash
# A contact sheet of a video: N frames (20 by default) evenly spaced, tiled 5 across, for judging a piece at a glance
# (the slideshow test, the world test, the variety check).
#   bash .claude/skills/raea-review/sheet.sh FILM.mp4 OUT.jpg [N]
set -euo pipefail
in="$1"; out="$2"; n="${3:-20}"
d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
rate=$(awk -v n="$n" -v d="$d" 'BEGIN { printf "%.6f", n / d }')
rows=$(( (n + 4) / 5 ))
ffmpeg -y -loglevel error -i "$in" -vf "fps=$rate,scale=384:-1,tile=5x$rows" -frames:v 1 "$out"
echo "$out: $n frames over ${d}s"
