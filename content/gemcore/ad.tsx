// The Pioneer Program's shots: GemCore's recruitment ad, the public myth at full warmth (storyboard:
// pioneer-ad.script.ts). Five promises, one subject each, on a camera that never stops drifting; the end card's fine
// print tells the truth in plain sight. No registerRoot here: pioneer-ad.tsx is the ad, leak-trailer.tsx reuses shots.
import { AbsoluteFill, Audio, Easing, Mix, Sequence, interpolate, staticFile, useCurrentFrame } from "raea";
import { AD } from "./lore";
import { C, FONT, LH, SOUNDS, Sprite, hash, s, typed, type SpriteName } from "./gemcore";

const BEAT = s(4.8);
const END = s(6);
export const AD_BEAT = BEAT;
export const AD_FRAMES = BEAT * AD.beats.length + END; // 900: 30 s

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** The kicker types on in the accent, then the line rises in under it */
export function Words({ i }: { i: number }) {
  const f = useCurrentFrame();
  const { kicker, line } = AD.beats[i];
  const rise = interpolate(f, [8, 26], [40, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const show = interpolate(f, [8, 22], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 140, bottom: 110, width: 1150, fontFamily: FONT, lineHeight: LH }}>
      <div style={{ fontSize: 34, color: C.accent, letterSpacing: 4, minHeight: 34 * LH }}>{typed(kicker, f, 0, 45)}</div>
      <div style={{ fontSize: 84, color: C.ink, opacity: show, transform: `translateY(${rise}px)` }}>{line}</div>
    </div>
  );
}

/** Ink dots drifting by: the brochure's star field, moving at `speed` px a frame */
function Stars({ speed = 2, n = 70 }: { speed?: number; n?: number }) {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({ length: n }, (_, i) => {
        const depth = 0.4 + hash(i) * 0.6;
        const x = (((hash(i + 99) * 2200 - f * speed * depth) % 2200) + 2200) % 2200 - 140;
        const size = Math.round(3 + depth * 5);
        return <div key={i} style={{ position: "absolute", left: x, top: hash(i + 7) * 1080, width: size, height: size, background: C.ink, opacity: 0.25 + depth * 0.35 }} />;
      })}
    </AbsoluteFill>
  );
}

// 1. Earth is running low: the Probe bores down through the strata, the camera sinking with it
export function Dig() {
  const f = useCurrentFrame();
  const sink = f * 6;
  const bands = ["#eadada", "#e0cdcd", "#d5bfbf", "#c9b1b1", "#bda3a3"];
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      {Array.from({ length: 14 }, (_, i) => {
        const y = ((i * 140 - sink) % 1960 + 1960) % 1960 - 280;
        return <div key={i} style={{ position: "absolute", left: 0, right: 0, top: y, height: 140, background: bands[i % bands.length] }} />;
      })}
      {Array.from({ length: 18 }, (_, i) => {
        const t = (f + i * 5) % 24;
        const spread = (hash(i) - 0.5) * 260;
        return <div key={`d${i}`} style={{ position: "absolute", left: 1330 + spread * (t / 24), top: 760 - t * 14, width: 12, height: 12, background: C.ink, opacity: 1 - t / 24 }} />;
      })}
      <div style={{ position: "absolute", left: 1180, top: 330 + Math.sin(f / 3) * 4, transform: "rotate(90deg)" }}>
        <Sprite name="spr_player_probe" scale={7} fps={12} />
      </div>
      <Words i={0} />
    </AbsoluteFill>
  );
}

// 2. Safe cryo travel: Odin-I asleep in a frosted capsule, drifting through the dark
export function Sleep() {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, BEAT], [980, 1140]);
  const breathe = 0.5 + 0.5 * Math.sin(f / 12);
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <Stars speed={1.2} />
      <div style={{ position: "absolute", left: x - 70, top: 250, width: 640, height: 380, borderRadius: 190, border: `6px solid ${C.ink}`, background: "rgba(255,255,255,0.55)", boxShadow: `0 0 ${40 + breathe * 40}px rgba(223,113,38,0.35)` }} />
      <div style={{ position: "absolute", left: x + 60, top: 330 + Math.sin(f / 20) * 8 }}>
        <Sprite name="spr_player_ship0" scale={7} frame={0} />
      </div>
      <Words i={1} />
    </AbsoluteFill>
  );
}

// 3. The Aztec Reach: the fleet wakes and flies in formation across a rising orange sun
export function Fleet() {
  const f = useCurrentFrame();
  const ships: [SpriteName, number, number][] = [["spr_player_probe", 0, 0], ["spr_player_ship0", -260, 170], ["spr_player_ship3", -300, -170], ["spr_8drill_ship", -540, 10]];
  const lead = interpolate(f, [0, BEAT], [700, 1500], { easing: Easing.out(Easing.quad) });
  const sun = interpolate(f, [0, BEAT], [900, 760]);
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 1000, top: sun, width: 760, height: 760, borderRadius: 380, background: C.accent, opacity: 0.9 }} />
      <Stars speed={9} n={40} />
      {ships.map(([name, dx, dy], i) => (
        <div key={name} style={{ position: "absolute", left: lead + dx - 200, top: 360 + dy + Math.sin(f / 9 + i) * 10 }}>
          <Sprite name={name} scale={5} fps={10} />
        </div>
      ))}
      <Words i={2} />
    </AbsoluteFill>
  );
}

// 4. Family payout: the account climbs while gems pile up behind it
export function Payout() {
  const f = useCurrentFrame();
  const amount = Math.round(interpolate(f, [6, BEAT - 20], [AD.payout.from, AD.payout.to], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const gems: SpriteName[] = ["spr_gem_diamond_large", "spr_gem_ruby_large", "spr_gem_opal_large", "spr_gem_emerald_large"];
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      {Array.from({ length: 26 }, (_, i) => {
        const start = i * 5;
        const y = Math.min(960 - Math.floor(i / 4) * 92, -120 + Math.max(0, f - start) * 34);
        return (
          <div key={i} style={{ position: "absolute", left: 1330 + (i % 4) * 120 + (hash(i) - 0.5) * 24, top: y }}>
            <Sprite name={gems[i % gems.length]} scale={4} fps={6} at={start} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 140, top: 120, fontFamily: FONT, fontSize: 120, lineHeight: LH, color: C.ink }}>
        {String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} <span style={{ color: C.accent }}>{AD.payout.unit}</span>
      </div>
      <Words i={3} />
    </AbsoluteFill>
  );
}

// 5. Civilization needs you: the big drill, close, shaking, throwing gems
export function Deep() {
  const f = useCurrentFrame();
  const shake = (hash(f) - 0.5) * 10;
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      {Array.from({ length: 16 }, (_, i) => {
        const t = (f + i * 7) % 30;
        const a = hash(i + 3) * Math.PI - Math.PI / 2;
        return (
          <div key={i} style={{ position: "absolute", left: 1500 + Math.cos(a) * t * 22, top: 470 + Math.sin(a) * t * 22, opacity: 1 - t / 30 }}>
            <Sprite name={i % 2 ? "spr_gem_ruby_large" : "spr_gem_diamond_large"} scale={3} frame={0} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 820 + shake, top: 300 + shake * 0.6, transform: `scale(${interpolate(f, [0, BEAT], [1, 1.12])})`, transformOrigin: "left center" }}>
        <Sprite name="bigdrill" scale={8} fps={16} />
      </div>
      <Words i={4} />
    </AbsoluteFill>
  );
}

// 6. The end card: the logo, the call, and the fine print that says everything
export function EndCard() {
  const f = useCurrentFrame();
  const scale = interpolate(f, [0, END], [1.04, 1]);
  const show = interpolate(f, [0, 12], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: C.paper, alignItems: "center", justifyContent: "center", fontFamily: FONT, lineHeight: LH }}>
      <div style={{ transform: `scale(${scale})`, opacity: show, display: "flex", flexDirection: "column", alignItems: "center", marginTop: -120 }}>
        <Sprite name="spr_logo_gemcore" scale={3} frame={0} />
        <div style={{ fontSize: 54, color: C.accent, letterSpacing: 6, marginTop: 40 }}>{AD.program}</div>
        <div style={{ fontSize: 42, color: C.ink, marginTop: 8, minHeight: 42 * LH }}>{typed(AD.cta, f, 14, 40)}</div>
      </div>
      <div style={{ position: "absolute", left: 140, right: 140, bottom: 50, fontSize: 21, color: C.ink, opacity: 0.85, lineHeight: LH }}>
        {AD.fine.map((l) => <div key={l}>{l}</div>)}
      </div>
    </AbsoluteFill>
  );
}

const SHOTS = [Dig, Sleep, Fleet, Payout, Deep];

export function PioneerAd() {
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      {SHOTS.map((Shot, i) => (
        <Sequence key={i} from={i * BEAT} durationInFrames={BEAT}>
          <Shot />
        </Sequence>
      ))}
      <Sequence from={SHOTS.length * BEAT} durationInFrames={END}>
        <EndCard />
      </Sequence>
      {/* the master: -14 LUFS under a -1.5 dBTP limiter (raea check) */}
      <Mix lufs={-14} />
      <Audio src={staticFile(SOUNDS.theme)} endAt={AD_FRAMES} fadeOut={2} />
    </AbsoluteFill>
  );
}

