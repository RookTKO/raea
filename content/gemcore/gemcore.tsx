// The pieces' shared kit: GemCore's colours, its sprites drawn crisp at whole-number scales, typed text, and the
// cockpit glass. Sprites, sounds and the font are read from media/ (the link to GemCore, tools/link-gemcore.sh).
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "raea";
import { SPRITES, SOUNDS } from "./gemcore.gen";

export { SPRITES, SOUNDS };

/** GemCore's UI colours (game_macros.gml), by the role each plays here; brand/brand.css says the same */
export const C = {
  paper: "#f3e7e7",
  ink: "#464647",
  glass: "#0b0b0c",
  accent: "#df7126",
  danger: "#ff3860",
  success: "#23d760",
  warning: "#ffdd57",
} as const;

export const FONT = '"Corp Console", monospace';

export type SpriteName = keyof typeof SPRITES;

/** A GemCore sprite at a whole-number scale, nearest-neighbour; it steps through its frames at `fps` unless `frame`
 *  pins one. `at` is the frame its animation starts from. */
export function Sprite({ name, scale = 4, fps = 8, frame, at = 0, loop = true, style }: {
  name: SpriteName;
  scale?: number;
  fps?: number;
  frame?: number;
  at?: number;
  loop?: boolean;
  style?: CSSProperties;
}) {
  const f = useCurrentFrame();
  const { fps: rate } = useVideoConfig();
  const s = SPRITES[name];
  const n = s.frames.length;
  const step = Math.max(0, Math.floor(((f - at) * fps) / rate));
  const i = frame ?? (loop ? step % n : Math.min(step, n - 1));
  return (
    <Img
      src={staticFile(s.frames[i])}
      style={{ width: s.w * scale, height: s.h * scale, imageRendering: "pixelated", display: "block", ...style }}
    />
  );
}

/** How much of `text` is typed at `frame`, starting at `start`, `cps` characters a second */
export function typed(text: string, frame: number, start: number, cps = 40, fps = 30): string {
  const n = Math.floor(((frame - start) * cps) / fps);
  return n <= 0 ? "" : text.slice(0, n);
}

/** Frames `text` takes to type at `cps` */
export const typeFrames = (text: string, cps = 40, fps = 30) => Math.ceil((text.length * fps) / cps);

/** A small deterministic noise in [0, 1) for frame-locked jitter (renders and replays match) */
export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** The cockpit glass over whatever is under it: scanlines, a vignette, and a faint phosphor flicker */
export function Glass({ children, flicker = true }: { children?: ReactNode; flicker?: boolean }) {
  const f = useCurrentFrame();
  const glow = flicker ? 0.94 + 0.06 * hash(Math.floor(f / 2)) : 1;
  return (
    <AbsoluteFill style={{ background: C.glass }}>
      <AbsoluteFill style={{ opacity: glow }}>{children}</AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 2px, transparent 2px, transparent 5px)",
        }}
      />
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)" }} />
    </AbsoluteFill>
  );
}

/** Splits the picture sideways in bands for `frames` frames from `at`: the leak breaking through the brochure */
export function Glitch({ at, frames, children, strength = 1 }: { at: number; frames: number; children: ReactNode; strength?: number }) {
  const f = useCurrentFrame();
  const on = f >= at && f < at + frames;
  if (!on) return <>{children}</>;
  const k = strength * (1 - (f - at) / frames);
  const bands = 6;
  return (
    <AbsoluteFill>
      {Array.from({ length: bands }, (_, i) => {
        const dx = (hash(f * 13 + i) - 0.5) * 160 * k;
        const top = (100 / bands) * i;
        return (
          <AbsoluteFill key={i} style={{ clipPath: `inset(${top}% 0 ${100 - top - 100 / bands}% 0)`, transform: `translateX(${dx}px)` }}>
            {children}
          </AbsoluteFill>
        );
      })}
      <AbsoluteFill style={{ background: C.danger, opacity: 0.12 * k, mixBlendMode: "screen" }} />
    </AbsoluteFill>
  );
}

/** Corp Console text with the defaults every piece uses */
export function Type({ children, size = 48, color = C.paper, style }: { children: ReactNode; size?: number; color?: string; style?: CSSProperties }) {
  return <div style={{ fontFamily: FONT, fontSize: size, color, lineHeight: 1.15, whiteSpace: "pre-wrap", ...style }}>{children}</div>;
}

/** Seconds to frames at 30 fps (every piece here runs at 30) */
export const s = (seconds: number) => Math.round(seconds * 30);
