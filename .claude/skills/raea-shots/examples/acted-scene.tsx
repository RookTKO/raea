// An acted scene, the unit a story is built from: a set with depth, a puppet that gestures on a spoken word, a
// screen inside the world that changes, a voice with captions that follow it, a score ducked under the voice and a
// sting on the reveal. Every technique here rendered on a Linux CPU container (raea 0.1.0, 2026-11).
//   raea render .claude/skills/raea-shots/examples/acted-scene.tsx --at 10,60,100,140 -o /tmp/stills/
// Swap the plate, the puppet's parts and the line for the project's own (the puppet's parts would be the
// character's art cut into pieces: body, head, upper arm, forearm, prop).
import { AbsoluteFill, Composition, Easing, Mix, Sequence, interpolate, registerRoot, useCurrentFrame } from "raea";
import * as Tone from "raea/tone";
import { ImagePlane, Screen } from "raea/3d";
import { Camera3d } from "raea/camera";
import { AmbientLight } from "raea/light";
import { Transform } from "raea/transform";
import { Speech, speechAt } from "raea/speech";

const FPS = 30;
const LENGTH = 150;
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const PLATE = "../../../../sdk/raea/bench/bevy/planes/media/poster.png"; // the set's back plate

// The voice: one line, cast from Pocket's voices (render it in three or four and pick one).
const LINE = { text: "Good morning, pioneer. This is cycle one.", voice: "alba", seed: 2 };
const VO = 18; // the frame it starts on

// The score: a low pad under the voice, ducked by it; a single high bell on the reveal.
Tone.getTransport().bpm.value = 60;
Tone.buses.music.duck(Tone.buses.voice, { amount: -12 });
const pad = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "fatsine" }, envelope: { attack: 1.2, release: 2 }, volume: -12 }).connect(Tone.buses.music);
new Tone.Part((t, c) => pad.triggerAttackRelease(c, "1m", t), [["0:0", ["A2", "E3", "C4"]], ["1:0", ["F2", "C3", "A3"]], ["2:0", ["D2", "A2", "F3"]], ["3:0", ["E2", "B2", "G#3"]]]).start(0);
const bell = new Tone.FMSynth({ harmonicity: 3.01, modulationIndex: 14, envelope: { attack: 0.001, decay: 1.6, sustain: 0, release: 1 }, volume: -8 }).connect(Tone.buses.music);
new Tone.Part((t, n) => bell.triggerAttackRelease(n, "2n", t), [[100 / FPS, "E6"]]).start(0);
Tone.getTransport().start();

/** The index of the first spoken word that starts with `w` (Pocket's words keep their punctuation). */
const wordIndex = (words: string[], w: string) => words.findIndex((x) => x.toLowerCase().startsWith(w));

/** A cutout puppet: each part nested in its parent and turning round its own pivot, so a head turn carries the
 *  antenna and an arm raise carries the hand and the pointer. `raise` (0..1) is the gesture, eased by the caller. */
function Puppet({ f, raise }: { f: number; raise: number }) {
  const float = Math.sin(f / 9) * 5;                  // idle: it bobs, never perfectly still
  const breathe = 1 + Math.sin(f / 13) * 0.01;
  const head = Math.sin(f / 23) * 3 + raise * -6;     // the head tips back as the arm rises
  const upper = -20 - raise * 70;                      // shoulder
  const fore = -10 + raise * 40;                       // elbow: the forearm bends outward as it rises
  return (
    <div style={{ position: "absolute", left: 210, top: 330 + float, width: 150, height: 190, background: "#c8443c", borderRadius: 26, transform: `scale(${breathe})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 10, top: -118, width: 130, height: 110, background: "#e9e1cf", border: "6px solid #c8443c", borderRadius: 20, transformOrigin: "50% 100%", transform: `rotate(${head}deg)` }}>
        <div style={{ position: "absolute", left: 60, top: -40, width: 4, height: 40, background: "#333" }} />
      </div>
      <div style={{ position: "absolute", left: 130, top: 30, width: 80, height: 26, background: "#c8443c", borderRadius: 13, transformOrigin: "10% 50%", transform: `rotate(${upper}deg)` }}>
        <div style={{ position: "absolute", left: 66, top: 2, width: 70, height: 22, background: "#c8443c", borderRadius: 11, transformOrigin: "10% 50%", transform: `rotate(${fore}deg)` }}>
          <div style={{ position: "absolute", left: 60, top: 8, width: 110, height: 5, background: "#222", transformOrigin: "0% 50%", transform: "rotate(0deg)" }} />
        </div>
      </div>
    </div>
  );
}

/** What the screen in the world shows: a nested composition, on its own clock (frame 0 = the Screen's `from`). */
function Counter() {
  const f = useCurrentFrame();
  const flipped = f >= 100;
  const blank = f >= 92 && f < 100;                   // the screen goes dark for a moment: the reset
  return (
    <AbsoluteFill style={{ background: blank ? "#000" : "#06141f", justifyContent: "center", alignItems: "center", fontFamily: "monospace", color: flipped ? "#ff5a6e" : "#ffd95b" }}>
      <div style={{ fontSize: 44, opacity: 0.7 }}>{blank ? "" : "CYCLE"}</div>
      <div style={{ fontSize: 150, lineHeight: 1 }}>{blank ? "" : flipped ? "1" : "6"}</div>
    </AbsoluteFill>
  );
}

function Scene() {
  const f = useCurrentFrame();
  const at = speechAt({ ...LINE, start: VO }, f, FPS);
  // the gesture lands on the word "cycle", wherever the voice puts it: how many of the last 8 frames were at or past
  // that word gives a ramp that starts on the word, eased to settle
  const reached = (g: number) => {
    const s = speechAt({ ...LINE, start: VO }, g, FPS);
    const k = wordIndex(s.words, "cycle");
    return k >= 0 && s.word >= k ? 1 : 0;
  };
  let n = 0;
  for (let i = 0; i < 8; i++) n += reached(Math.max(0, f - i));
  const lift = Easing.out(Easing.cubic)(n / 8);
  // the camera never stops: a slow push and a drift, so a cut can join it mid-move
  const z = interpolate(f, [0, LENGTH], [5.2, 3.9], cl);
  const x = interpolate(f, [0, LENGTH], [-0.35, 0.25], cl);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Camera3d transform={Transform.fromXyz(x, 0.15, z).lookingAt([0, 0, -1])} projection={{ Perspective: { fov: 0.8 } }} hdr />
      <AmbientLight brightness={2000} />
      {/* depth: a back plate far away and the screen near the lens, so the drift slides one past the other */}
      <ImagePlane src={PLATE} width={9} position={[0, 0.2, -4]} />
      <Screen name="counter" resolution={[400, 300]} size={[1.3]} position={[1.0, 0.1, 0.4]} crt={{ curvature: 0.12, flicker: 0.06 }}><Counter /></Screen>
      {/* the puppet acts on the page, over the 3D (move its parts onto ImagePlanes to put it between layers) */}
      <Puppet f={f} raise={lift} />
      <Sequence from={VO} layout="none" name="vo"><Speech {...LINE} start={0} /></Sequence>
      {/* captions follow the voice word by word */}
      <div style={{ position: "absolute", left: 60, right: 60, bottom: 46, textAlign: "center", fontFamily: "monospace", fontSize: 44, color: "#fff" }}>
        {at.words.map((w, i) => <span key={i} style={{ opacity: i <= at.word ? 1 : 0.2 }}>{w} </span>)}
      </div>
      <Mix lufs={-14} ceiling={-1.5} />
    </AbsoluteFill>
  );
}

registerRoot(() => <Composition id="acted-scene" component={Scene} width={1280} height={720} fps={FPS} durationInFrames={LENGTH} />);
