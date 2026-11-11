#!/usr/bin/env bash
# Fetch Pocket TTS (raea's <Speech> voice model) into the cache raea reads, with curl.
# Use it when <Speech> renders silence with "Pocket TTS unavailable ... invalid peer certificate": raea's own
# downloader (rustls, built-in roots) doesn't trust a TLS-intercepting proxy, and curl uses the system's CA bundle.
# The file list mirrors systems/speech/src/pocket/run.rs (Pocket::SPEC); check it there if raea updates the model.
set -euo pipefail
dir="${RAEA_FEED_MODELS:-$HOME/.cache/raea-feed/models}/pocket-tts"
mkdir -p "$dir"
bundle=https://huggingface.co/KevinAHM/pocket-tts-onnx/resolve/main/onnx/english_2026-04
voices=https://huggingface.co/kyutai/pocket-tts-without-voice-cloning/resolve/main/languages/english_2026-04/embeddings
get() { [ -s "$dir/$2" ] || curl -fsSL -o "$dir/$2" "$1"; echo "ok  $2"; }
for f in bundle.json text_conditioner.onnx flow_lm_main_int8.onnx flow_lm_flow_int8.onnx mimi_decoder_int8.onnx mimi_encoder.onnx bos_before_voice.npy; do
  get "$bundle/$f" "$f"
done
get https://huggingface.co/mlx-community/pocket-tts/resolve/main/tokenizer.json tokenizer.json
for v in alba marius javert jean fantine cosette eponine azelma; do
  get "$voices/$v.safetensors" "voice-$v.safetensors"
done
echo "Pocket TTS is in $dir"
