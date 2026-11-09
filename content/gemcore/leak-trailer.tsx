// The leak: GemCore's lore trailer, 60 s (storyboard: leak-trailer.script.ts). The ad breaks, the cockpit shows the only
// clock a pioneer gets, the record shows the real one, and the two are set side by side: the poster frame.
//   raea render content/gemcore/leak-trailer.tsx -o content/gemcore/out/leak-trailer.mp4
import type { ReactElement } from "react";
import { AbsoluteFill, Audio, Composition, Easing, Sequence, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Fleet, Sleep } from "./ad";
import { DIVE_LOG, FILES, TRAILER, WORKER, type LeakFile } from "./lore";
import { C, FONT, Glass, Glitch, LH, LH_BIG, SOUNDS, Sprite, hash, s, typed, typeFrames } from "./gemcore";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// the cut, in frames (30 fps)
const T = {
  ad: 0, // the brochure, already playing
  breach: s(6), // it breaks
  cockpit: s(8), // the only clock a pioneer gets
  record: s(18), // the real one, file by file
  cross: s(40), // the two set side by side
  reset: s(50), // the hull goes, the counter goes back to 1
  title: s(55),
  end: s(60),
  get record_len() { return this.cross - this.record; },
};

// Each file gets the time its text takes to type, plus a hold to read it, at the slowest typing speed that fits the
// record's 22 s: a long file doesn't get cut off, a short one doesn't sit.
const LEAD = 16, GAP = 4, HOLD = 28;
const fileLength = (f: LeakFile, cps: number) => LEAD + f.body.reduce((n, l) => n + typeFrames(l, cps) + GAP, 0) + HOLD;
const CPS = (() => {
  for (let cps = 50; cps < 400; cps += 5) if (FILES.reduce((n, f) => n + fileLength(f, cps), 0) <= T.record_len) return cps;
  return 400;
})();
const STARTS = FILES.reduce<number[]>((a, f, i) => [...a, i === 0 ? 0 : a[i - 1] + fileLength(FILES[i - 1], CPS)], []);
const LENGTHS = FILES.map((f, i) => (i === FILES.length - 1 ? T.record_len - STARTS[i] : fileLength(f, CPS)));

// A. The ad, interrupted: two of its shots, the second torn by the leak
function Brochure() {
  return (
    <Glitch at={s(5.4)} frames={s(0.6)} strength={1.4}>
      <Glitch at={s(4.1)} frames={4} strength={0.6}>
        <AbsoluteFill>
          <Sequence from={0} durationInFrames={s(3)}><Sleep /></Sequence>
          <Sequence from={s(3)} durationInFrames={s(3)}><Fleet /></Sequence>
        </AbsoluteFill>
      </Glitch>
    </Glitch>
  );
}

// B. The breach banner
function Breach() {
  const f = useCurrentFrame();
  return (
    <Glass>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT, lineHeight: LH }}>
        <div style={{ fontSize: 38, color: C.danger, letterSpacing: 3, width: 1500, textAlign: "center" }}>{typed(TRAILER.breach, f, 4, 60)}</div>
      </AbsoluteFill>
    </Glass>
  );
}

// C. The cockpit: a small ship, a big counter, the Dive Log, and the question it can't answer
function Cockpit() {
  const f = useCurrentFrame();
  const push = interpolate(f, [0, T.record - T.cockpit], [1, 1.06]);
  let at = 30;
  const lines = DIVE_LOG.map((l) => {
    const start = at;
    at += typeFrames(l, 50) + 10;
    return { l, start };
  });
  const ask = at + 20;
  return (
    <Glass>
      <AbsoluteFill style={{ transform: `scale(${push})`, fontFamily: FONT, lineHeight: LH, padding: "90px 150px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <Sprite name="spr_player_probe" scale={4} fps={8} />
          <div>
            <div style={{ fontSize: 30, color: C.paper, opacity: 0.7 }}>PIONEER {WORKER.id}</div>
            <div style={{ fontSize: 110, lineHeight: LH_BIG, color: C.warning }}>CYCLE {WORKER.cycle}</div>
          </div>
        </div>
        <div style={{ marginTop: 30, fontSize: 32, color: C.paper }}>
          {lines.map(({ l, start }) => <div key={l} style={{ minHeight: 32 * LH }}>{typed(l, f, start, 50)}</div>)}
        </div>
        <div style={{ marginTop: 34, fontSize: 54, color: C.paper, opacity: f >= ask ? 1 : 0 }}>{TRAILER.question}</div>
        <div style={{ fontSize: 30, color: C.danger }}>{typed(TRAILER.unknown, f, ask + 30, 40)}</div>
      </AbsoluteFill>
    </Glass>
  );
}

/** One file of the record: its date big on the left, the text typing on the right, the key lines turning red */
function FileCard({ file, index }: { file: LeakFile; index: number }) {
  const f = useCurrentFrame();
  const slide = interpolate(f, [0, 10], [60, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const typedLines: { text: string; start: number }[] = [];
  let at = LEAD;
  for (const l of file.body) {
    typedLines.push({ text: l, start: at });
    at += typeFrames(l, CPS) + GAP;
  }
  const lit = f >= at + 4;
  return (
    <AbsoluteFill style={{ fontFamily: FONT, lineHeight: LH, padding: "110px 150px", flexDirection: "row", gap: 70 }}>
      <div style={{ width: 400, transform: `translateY(${slide}px)` }}>
        <div style={{ fontSize: 32, color: C.paper, opacity: 0.6 }}>GC YEAR</div>
        <div style={{ fontSize: 170, lineHeight: LH_BIG, color: C.danger }}>{file.year}</div>
        <div style={{ fontSize: 26, color: C.paper, opacity: 0.6 }}>FILE {index + 1} / {FILES.length}</div>
      </div>
      <div style={{ flex: 1, transform: `translateX(${slide}px)` }}>
        <div style={{ fontSize: 26, color: C.paper, opacity: 0.6 }}>{file.code} / {file.from}</div>
        <div style={{ fontSize: 50, color: C.paper, marginBottom: 20 }}>{file.title}</div>
        {typedLines.map(({ text, start }) => {
          const shown = typed(text, f, start, CPS);
          const key = lit && file.key.some((k) => text.includes(k));
          return <div key={text} style={{ fontSize: 32, color: key ? C.danger : C.paper }}>{shown}</div>;
        })}
      </div>
    </AbsoluteFill>
  );
}

// D. The record: each file in turn, over a timeline whose marker steps from file to file, GC 0 to GC 112
function Record() {
  const f = useCurrentFrame();
  const i = Math.max(0, STARTS.findLastIndex((st) => st <= f));
  const from = i === 0 ? 0 : FILES[i - 1].year;
  const year = interpolate(f - STARTS[i], [0, 14], [from, FILES[i].year], { ...clamp, easing: Easing.out(Easing.cubic) });
  const x = 150 + (year / WORKER.now) * (1920 - 300);
  return (
    <Glass>
      {FILES.map((file, k) => (
        <Sequence key={file.code} from={STARTS[k]} durationInFrames={LENGTHS[k]}>
          <FileCard file={file} index={k} />
        </Sequence>
      ))}
      <div style={{ position: "absolute", left: 150, right: 150, bottom: 100, height: 2, background: C.paper, opacity: 0.35 }} />
      {FILES.map((file) => (
        <div key={file.code} style={{ position: "absolute", left: 150 + (file.year / WORKER.now) * 1620 - 1, bottom: 94, width: 2, height: 14, background: C.paper, opacity: 0.35 }} />
      ))}
      <div style={{ position: "absolute", left: x - 8, bottom: 92, width: 16, height: 18, background: C.danger }} />
      <div style={{ position: "absolute", left: x - 100, width: 200, bottom: 30, textAlign: "center", fontFamily: FONT, lineHeight: LH, fontSize: 26, color: C.danger }}>GC {Math.round(year)}</div>
    </Glass>
  );
}

// E. The cross-reference: the cockpit's clock beside the record's, and what lies between them (the poster frame)
function Cross() {
  const f = useCurrentFrame();
  const show = (at: number) => interpolate(f, [at, at + 12], [0, 1], clamp);
  const bridge = interpolate(f, [70, 130], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <Glass>
      <AbsoluteFill style={{ fontFamily: FONT, lineHeight: LH, flexDirection: "row", justifyContent: "space-between", padding: "150px 110px 0" }}>
        <div style={{ opacity: show(0), textAlign: "center", width: 800 }}>
          <div style={{ fontSize: 34, color: C.paper, opacity: 0.6 }}>{TRAILER.cockpit}</div>
          <div style={{ fontSize: 110, lineHeight: LH_BIG, color: C.warning, whiteSpace: "nowrap" }}>CYCLE {WORKER.cycle}</div>
        </div>
        <div style={{ opacity: show(30), textAlign: "center", width: 800 }}>
          <div style={{ fontSize: 34, color: C.paper, opacity: 0.6 }}>{TRAILER.record}</div>
          <div style={{ fontSize: 110, lineHeight: LH_BIG, color: C.danger, whiteSpace: "nowrap" }}>GC {WORKER.now}</div>
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 960 - 560 * bridge, width: 1120 * bridge, top: 470, height: 4, background: C.paper }} />
      <AbsoluteFill style={{ fontFamily: FONT, lineHeight: LH, alignItems: "center", top: 510 }}>
        <div style={{ fontSize: 30, color: C.paper, opacity: show(100) * 0.7 }}>{TRAILER.signed}</div>
        <div style={{ fontSize: 120, lineHeight: LH_BIG, color: C.paper, opacity: show(140) }}>{TRAILER.passed}</div>
        <div style={{ fontSize: 48, color: C.danger, opacity: show(200) }}>{TRAILER.reuploads}</div>
      </AbsoluteFill>
    </Glass>
  );
}

// F. The reset: the hull breaks up, and the counter starts over as if nothing happened
function Reset() {
  const f = useCurrentFrame();
  const counter = f < 80 ? WORKER.cycle : 1;
  const flash = interpolate(f, [0, 3, 14], [0, 1, 0], clamp);
  return (
    <Glass>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT, lineHeight: LH }}>
        {f < 70 ? <Sprite name="spr_ship_destroyed" scale={8} fps={18} loop={false} /> : null}
        {f >= 70 ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 34, color: C.paper, opacity: 0.7, minHeight: 34 * LH }}>{typed(TRAILER.reset, f, 70, 30)}</div>
            <div style={{ fontSize: 150, lineHeight: LH_BIG, color: C.warning, transform: `translateX(${f < 84 ? (hash(f) - 0.5) * 30 : 0}px)` }}>CYCLE {counter}</div>
          </div>
        ) : null}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: C.paper, opacity: flash }} />
    </Glass>
  );
}

// G. The title
function Title() {
  const f = useCurrentFrame();
  const show = interpolate(f, [0, 15], [0, 1], clamp);
  return (
    <Glitch at={s(2.2)} frames={5} strength={0.5}>
      <Glass>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT, lineHeight: LH, opacity: show }}>
          <Sprite name="spr_logo_gemcore" scale={4} frame={0} />
          <div style={{ fontSize: 46, color: C.paper, marginTop: 44, minHeight: 46 * LH }}>{typed(TRAILER.tagline, f, 20, 30)}</div>
          <div style={{ fontSize: 26, color: C.danger, opacity: interpolate(f, [90, 105], [0, 0.85], clamp) }}>{TRAILER.mantra}</div>
        </AbsoluteFill>
      </Glass>
    </Glitch>
  );
}

const SCENES: [number, number, () => ReactElement][] = [
  [T.ad, T.breach, Brochure],
  [T.breach, T.cockpit, Breach],
  [T.cockpit, T.record, Cockpit],
  [T.record, T.cross, Record],
  [T.cross, T.reset, Cross],
  [T.reset, T.title, Reset],
  [T.title, T.end, Title],
];

export function LeakTrailer() {
  return (
    <AbsoluteFill style={{ background: C.glass }}>
      {SCENES.map(([from, to, Scene], i) => (
        <Sequence key={i} from={from} durationInFrames={to - from}><Scene /></Sequence>
      ))}
      {/* the brochure's theme, from its full section; then Judgement Day from the breach to the end */}
      <Sequence from={T.ad} durationInFrames={T.breach}><Audio src={staticFile(SOUNDS.theme)} startFrom={s(18)} fadeOut={0.2} /></Sequence>
      <Sequence from={T.breach} durationInFrames={T.end - T.breach}><Audio src={staticFile(SOUNDS.judgement)} fadeOut={3} /></Sequence>
      <Sequence from={T.breach} durationInFrames={s(2)}><Audio src={staticFile(SOUNDS.radio)} volume={0.7} /></Sequence>
      {[3, 4, 6].map((k) => (
        <Sequence key={k} from={T.record + STARTS[k] + LENGTHS[k] - HOLD} durationInFrames={s(1)}><Audio src={staticFile(SOUNDS.radar)} volume={0.5} /></Sequence>
      ))}
      <Sequence from={T.reset} durationInFrames={s(3)}><Audio src={staticFile(SOUNDS.impact)} volume={0.8} /></Sequence>
      <Sequence from={T.reset + 4} durationInFrames={s(3)}><Audio src={staticFile(SOUNDS.glass)} volume={0.7} /></Sequence>
    </AbsoluteFill>
  );
}

registerRoot(() => <Composition id="leak-trailer" component={LeakTrailer} width={1920} height={1080} fps={30} durationInFrames={T.end} />);

