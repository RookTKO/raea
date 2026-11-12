// The Pioneer Terminal's rules, as a pure fold over the keys (no drawing, no React): cycle-terminal.tsx draws it,
// cycle-terminal.test.ts plays it. A render, a replay and a play-through all fold the same steps.
import type { FrameInput, Playtest } from "raea";
import { FILES, WORKER } from "./lore";

export const FPS = 30;
export const FRAMES = 60 * FPS;

export type Mode = "list" | "file" | "q1" | "q2" | "wrong" | "breach";
export interface Term {
  mode: Mode;
  modeAt: number; // the frame the mode began, for typing and timeouts
  sel: number;
  entry: string; // the digits typed into a query
  read: boolean[];
  cycle: number; // what the cockpit shows
  reuploads: number; // the truth, never shown until the breach
  prev: string[]; // last frame's keys, for presses
  human: boolean; // a person has pressed a key: the attract script stops
}

export const INITIAL: Term = {
  mode: "list", modeAt: 0, sel: 0, entry: "", read: FILES.map(() => false),
  cycle: WORKER.cycle, reuploads: WORKER.reuploads, prev: [], human: false,
};

// ------------------------------------------------------------------------------------------------------------------
// The attract run: key taps at frames (each held 2 frames). Reads the contract, guesses the cockpit's number, reads
// the counter policy, the family's claim and the redacted file, then answers both queries and breaks continuity.
// ------------------------------------------------------------------------------------------------------------------
const TAPS: [number, string][] = [];
{
  let t = 40;
  let sel = 0; // where the list cursor is, so each file is found by its code, not by its place in the list
  const tap = (k: string, wait = 8) => { TAPS.push([t, k]); t += wait; };
  const open = (code: string, read: number) => {
    const i = FILES.findIndex((f) => f.code === code);
    for (; sel !== i; sel = (sel + 1) % FILES.length) tap("ArrowDown", 7);
    tap("Enter", read);
    tap("Escape", 14);
  };
  open("PX-0412-C", 110); // signed GC 3, a 1000-year term
  tap("q", 30); tap("7", 30); tap("Enter", 80); // the cockpit says 7: wrong
  open("WC-0027", 120); // each reboot starts the CYCLE at 1
  open("FP-0412-C", 120); // the family, never paid
  open("MX-0412-C", 150); // 41 reinitializations, 109 years since signing
  tap("q", 30); tap("1", 10); tap("1", 10); tap("2", 26); tap("Enter", 50);
  tap("4", 10); tap("1", 26); tap("Enter", 200);
  tap("Enter", 60); // begin your "first" contract
}
const SCRIPT = new Map<number, string>();
for (const [t, k] of TAPS) { SCRIPT.set(t, k); SCRIPT.set(t + 1, k); }
const scripted = (frame: number) => (SCRIPT.has(frame) ? [SCRIPT.get(frame)!] : []);

const DIGITS = "0123456789";

export function step(s: Term, input: FrameInput, frame: number): Term {
  const human = s.human || input.keys.length > 0;
  const keys = human ? input.keys : scripted(frame);
  const pressed = keys.filter((k) => !s.prev.includes(k));
  let t: Term = { ...s, human, prev: keys };
  const to = (mode: Mode, more: Partial<Term> = {}): Term => ({ ...t, ...more, mode, modeAt: frame });
  for (const k of pressed) {
    if (t.mode === "list") {
      if (k === "ArrowDown") t = { ...t, sel: (t.sel + 1) % FILES.length };
      else if (k === "ArrowUp") t = { ...t, sel: (t.sel + FILES.length - 1) % FILES.length };
      else if (k === "Enter") t = to("file", { read: t.read.map((r, i) => r || i === t.sel) });
      else if (k === "q" || k === "Q") t = to("q1", { entry: "" });
    } else if (t.mode === "file") {
      if (k === "Escape" || k === "Backspace" || k === "Enter") t = to("list");
    } else if (t.mode === "q1" || t.mode === "q2") {
      if (DIGITS.includes(k) && t.entry.length < 4) t = { ...t, entry: t.entry + k };
      else if (k === "Backspace") t = { ...t, entry: t.entry.slice(0, -1) };
      else if (k === "Escape") t = to("list");
      else if (k === "Enter" && t.entry) {
        const want = t.mode === "q1" ? WORKER.now : t.reuploads;
        t = Number(t.entry) !== want ? to("wrong") : t.mode === "q1" ? to("q2", { entry: "" }) : to("breach");
      }
    } else if (t.mode === "wrong") {
      if (k === "Enter" || k === "Escape") t = to("list");
    } else if (t.mode === "breach") {
      // the reboot: the counter back to 1, the archive unread, one more re-upload nobody will mention
      if (k === "Enter" && frame - t.modeAt > 60) t = to("list", { cycle: 1, sel: 0, read: FILES.map(() => false), reuploads: t.reuploads + 1, entry: "" });
    }
  }
  if (t.mode === "wrong" && frame - t.modeAt > 90) t = to("list");
  return t;
}

// what a playtest bot steps and traces (sdk/react/docs/playtest.md)
export const playtest: Playtest<Term> = {
  initial: INITIAL,
  step,
  actions: [["ArrowDown"], ["ArrowUp"], ["Enter"], ["Escape"], ["q"], ["1"], ["4"], []],
};

