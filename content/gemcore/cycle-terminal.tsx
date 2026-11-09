// The Pioneer Terminal: a small playable proof of GemCore's central clue. You are pioneer 0412-C. The cockpit says
// CYCLE 7 and won't say the date. The archive's files are dated in GC Years (the last one redacted). Work out what
// year it really is and how many times you have been rebooted, and answer the terminal's two queries.
//
//   raea play content/gemcore/cycle-terminal.tsx                                  (play it: arrows, Enter, Q, digits, Esc)
//   raea render content/gemcore/cycle-terminal.tsx -o content/gemcore/out/cycle-terminal.mp4   (the scripted attract run)
//
// The rules are terminal.ts, a pure fold over the keys (useGameState), so a render, a replay and a play-through agree. Nobody at the
// keys: the attract script plays (a wrong guess, the right files, the right answers). The first key a person presses
// hands the terminal to them.
import { AbsoluteFill, Audio, Composition, Mix, Sequence, registerRoot, staticFile, useCurrentFrame, useGameEvents, useGameState } from "raea";
import { FILES, TERMINAL, WORKER } from "./lore";
import { FPS, FRAMES, INITIAL, step, type Term } from "./terminal";
import { C, FONT, Glass, LH, SOUNDS, Sprite, hash, typed } from "./gemcore";

export { playtest } from "./terminal";

// ------------------------------------------------------------------------------------------------------------------
// Drawing
// ------------------------------------------------------------------------------------------------------------------
function Header({ g }: { g: Term }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, borderBottom: `2px solid ${C.paper}33`, paddingBottom: 12, whiteSpace: "nowrap" }}>
      <Sprite name="spr_player_probe" scale={2} fps={8} />
      <div>
        <div style={{ fontSize: 16, color: C.paper, opacity: 0.55 }}>{TERMINAL.title}</div>
        <div style={{ fontSize: 24, color: C.paper }}>PIONEER {WORKER.id}</div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 16, color: C.paper, opacity: 0.55 }}>RANK</div>
        <div style={{ fontSize: 20, color: C.paper }}>{WORKER.rank.toUpperCase()}</div>
      </div>
      <div style={{ fontSize: 40, color: C.warning, marginLeft: 20 }}>CYCLE {g.cycle}</div>
    </div>
  );
}

function List({ g }: { g: Term }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontSize: 18, color: C.paper, opacity: 0.55, marginBottom: 10 }}>ARCHIVE (LEAKED)   DATE: NOT AVAILABLE TO PIONEERS</div>
      {FILES.map((f, i) => {
        const on = i === g.sel;
        return (
          <div key={f.code} style={{ display: "flex", gap: 20, fontSize: 21, lineHeight: LH, whiteSpace: "nowrap", color: on ? C.glass : C.paper, background: on ? C.paper : "transparent", padding: "0 14px" }}>
            <div style={{ width: 200, flexShrink: 0 }}>{f.code}</div>
            <div style={{ width: 230, flexShrink: 0, color: on ? C.glass : f.redacted ? C.danger : C.paper }}>{f.redacted ? "GC REDACTED" : `GC ${f.year}`}</div>
            <div style={{ flex: 1 }}>{f.title}</div>
            <div style={{ width: 70, opacity: 0.6 }}>{g.read[i] ? "READ" : ""}</div>
          </div>
        );
      })}
    </div>
  );
}

function FileView({ g, frame }: { g: Term; frame: number }) {
  const f = FILES[g.sel];
  let at = g.modeAt + 6;
  return (
    <div style={{ marginTop: 26 }}>
      <div style={{ fontSize: 22, color: C.paper, opacity: 0.55 }}>{f.code}  /  {f.from}</div>
      <div style={{ fontSize: 26, color: f.redacted ? C.danger : C.paper, marginTop: 8 }}>{f.redacted ? "GC YEAR: REDACTED" : `GC YEAR: ${f.year}`}</div>
      <div style={{ fontSize: 40, color: C.paper, marginTop: 16, marginBottom: 22 }}>{f.title}</div>
      {f.body.map((l) => {
        const start = at;
        at += Math.ceil((l.length * FPS) / 90) + 3;
        return <div key={l} style={{ fontSize: 26, color: C.paper }}>{typed(l, frame, start, 90)}</div>;
      })}
    </div>
  );
}

function Query({ g, frame }: { g: Term; frame: number }) {
  const caret = Math.floor(frame / 15) % 2 ? "_" : " ";
  return (
    <div style={{ marginTop: 90 }}>
      <div style={{ fontSize: 36, color: C.paper }}>{typed(g.mode === "q1" ? TERMINAL.q1 : TERMINAL.q2, frame, g.modeAt, 60)}</div>
      <div style={{ fontSize: 22, color: C.paper, opacity: 0.55, marginTop: 12 }}>{TERMINAL.typeHint}</div>
      <div style={{ fontSize: 96, color: C.warning, marginTop: 30 }}>] {g.entry}{caret}</div>
    </div>
  );
}

function Wrong({ g, frame }: { g: Term; frame: number }) {
  return <div style={{ marginTop: 140, fontSize: 40, color: C.danger }}>{typed(TERMINAL.wrong, frame, g.modeAt, 50)}</div>;
}

function Breach({ g, frame }: { g: Term; frame: number }) {
  const k = frame - g.modeAt;
  const shake = k < 20 ? (hash(frame) - 0.5) * 24 : 0;
  return (
    <div style={{ marginTop: 34, transform: `translateX(${shake}px)` }}>
      <div style={{ fontSize: 46, color: C.danger }}>{TERMINAL.breach}</div>
      <div style={{ fontSize: 24, color: C.paper, marginTop: 10 }}>
        <div>GC YEAR: {WORKER.now}. SIGNED: GC {WORKER.signed}.</div>
        <div>RE-UPLOADS: {g.reuploads}. NEXT: {g.reuploads + 1}.</div>
      </div>
      <div style={{ fontSize: 24, color: C.paper, marginTop: 18, minHeight: 24 * LH }}>{typed(TERMINAL.scheduled, frame, g.modeAt + 30, 40)}</div>
      <div style={{ fontSize: 22, color: C.warning, marginTop: 18, opacity: k > 60 ? 1 : 0 }}>{TERMINAL.again}</div>
    </div>
  );
}

export function CycleTerminal() {
  const frame = useCurrentFrame();
  const g = useGameState(INITIAL, step);
  // sound cued to the fold's own moments: a radar blip on a wrong answer, glass on the breach
  const wrongs = useGameEvents(INITIAL, step, (a, b) => a.mode !== "wrong" && b.mode === "wrong");
  const breaches = useGameEvents(INITIAL, step, (a, b) => a.mode !== "breach" && b.mode === "breach");
  return (
    <Glass>
      <AbsoluteFill style={{ fontFamily: FONT, lineHeight: LH, padding: "48px 80px" }}>
        <Header g={g} />
        {g.mode === "list" ? <List g={g} /> : null}
        {g.mode === "file" ? <FileView g={g} frame={frame} /> : null}
        {g.mode === "q1" || g.mode === "q2" ? <Query g={g} frame={frame} /> : null}
        {g.mode === "wrong" ? <Wrong g={g} frame={frame} /> : null}
        {g.mode === "breach" ? <Breach g={g} frame={frame} /> : null}
        <div style={{ position: "absolute", left: 80, bottom: 28, fontSize: 18, color: C.paper, opacity: 0.45 }}>{TERMINAL.help}</div>
      </AbsoluteFill>
      {/* the master: -14 LUFS under a -1.5 dBTP limiter (raea check) */}
      <Mix lufs={-14} />
      {wrongs.map((f) => <Sequence key={`w${f}`} from={f} durationInFrames={FPS}><Audio src={staticFile(SOUNDS.radar)} volume={0.5} /></Sequence>)}
      {breaches.map((f) => <Sequence key={`b${f}`} from={f} durationInFrames={3 * FPS}><Audio src={staticFile(SOUNDS.glass)} volume={0.7} /></Sequence>)}
    </Glass>
  );
}

registerRoot(() => <Composition id="cycle-terminal" component={CycleTerminal} width={1280} height={720} fps={FPS} durationInFrames={FRAMES} />);
