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
import { AbsoluteFill, Audio, Composition, Sequence, registerRoot, staticFile, useCurrentFrame, useGameEvents, useGameState } from "raea";
import { FILES, TERMINAL, WORKER } from "./lore";
import { FPS, FRAMES, INITIAL, step, type Term } from "./terminal";
import { C, FONT, Glass, SOUNDS, Sprite, hash, typed } from "./gemcore";

export { playtest } from "./terminal";

// ------------------------------------------------------------------------------------------------------------------
// Drawing
// ------------------------------------------------------------------------------------------------------------------
function Header({ g }: { g: Term }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 36, borderBottom: `2px solid ${C.paper}33`, paddingBottom: 18 }}>
      <Sprite name="spr_player_probe" scale={2} fps={8} />
      <div style={{ fontSize: 24, color: C.paper, opacity: 0.75 }}>{TERMINAL.title}  /  PIONEER {WORKER.id}</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 22, color: C.paper, opacity: 0.6 }}>RANK: {WORKER.rank.toUpperCase()}</div>
      <div style={{ fontSize: 40, color: C.warning }}>CYCLE {g.cycle}</div>
    </div>
  );
}

function List({ g }: { g: Term }) {
  return (
    <div style={{ marginTop: 26 }}>
      <div style={{ fontSize: 22, color: C.paper, opacity: 0.55, marginBottom: 14 }}>ARCHIVE (LEAKED)   DATE: NOT AVAILABLE TO PIONEERS</div>
      {FILES.map((f, i) => {
        const on = i === g.sel;
        return (
          <div key={f.code} style={{ display: "flex", gap: 24, fontSize: 28, lineHeight: 1.7, color: on ? C.glass : C.paper, background: on ? C.paper : "transparent", padding: "0 14px" }}>
            <div style={{ width: 170 }}>{f.code}</div>
            <div style={{ width: 210, color: on ? C.glass : f.redacted ? C.danger : C.paper }}>{f.redacted ? "GC REDACTED" : `GC ${f.year}`}</div>
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
        return <div key={l} style={{ fontSize: 28, lineHeight: 1.55, color: C.paper }}>{typed(l, frame, start, 90)}</div>;
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
    <div style={{ marginTop: 60, transform: `translateX(${shake}px)` }}>
      <div style={{ fontSize: 56, color: C.danger }}>{TERMINAL.breach}</div>
      <div style={{ fontSize: 30, color: C.paper, marginTop: 24, lineHeight: 1.6 }}>
        <div>GC YEAR: {WORKER.now}. SIGNED: GC {WORKER.signed}.</div>
        <div>RE-UPLOADS: {g.reuploads}. NEXT: {g.reuploads + 1}.</div>
      </div>
      <div style={{ fontSize: 30, color: C.paper, marginTop: 30 }}>{typed(TERMINAL.scheduled, frame, g.modeAt + 30, 40)}</div>
      <div style={{ fontSize: 26, color: C.warning, marginTop: 40, opacity: k > 60 ? 1 : 0 }}>{TERMINAL.again}</div>
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
      <AbsoluteFill style={{ fontFamily: FONT, padding: "56px 80px" }}>
        <Header g={g} />
        {g.mode === "list" ? <List g={g} /> : null}
        {g.mode === "file" ? <FileView g={g} frame={frame} /> : null}
        {g.mode === "q1" || g.mode === "q2" ? <Query g={g} frame={frame} /> : null}
        {g.mode === "wrong" ? <Wrong g={g} frame={frame} /> : null}
        {g.mode === "breach" ? <Breach g={g} frame={frame} /> : null}
        <div style={{ position: "absolute", left: 80, bottom: 40, fontSize: 20, color: C.paper, opacity: 0.45 }}>{TERMINAL.help}</div>
      </AbsoluteFill>
      {wrongs.map((f) => <Sequence key={`w${f}`} from={f} durationInFrames={FPS}><Audio src={staticFile(SOUNDS.radar)} volume={0.5} /></Sequence>)}
      {breaches.map((f) => <Sequence key={`b${f}`} from={f} durationInFrames={3 * FPS}><Audio src={staticFile(SOUNDS.glass)} volume={0.7} /></Sequence>)}
    </Glass>
  );
}

registerRoot(() => <Composition id="cycle-terminal" component={CycleTerminal} width={1280} height={720} fps={FPS} durationInFrames={FRAMES} />);
