// The attract run (no keys pressed) must play the whole story: a wrong guess, both right answers, the breach, the
// reboot. And a person's first key takes over. Run: bun test content/gemcore
import { expect, test } from "bun:test";
import { INITIAL, step } from "./terminal";
import { WORKER } from "./lore";

const run = (frames: number, keysAt: (f: number) => string[] = () => []) => {
  let s = INITIAL;
  const modes: string[] = [];
  for (let f = 0; f < frames; f++) {
    s = step(s, { keys: keysAt(f) }, f);
    if (modes.at(-1) !== s.mode) modes.push(s.mode);
  }
  return { s, modes };
};

test("the attract run tells the whole story inside the composition", () => {
  const { s, modes } = run(60 * 30);
  expect(modes).toContain("wrong");
  const iBreach = modes.indexOf("breach");
  expect(iBreach).toBeGreaterThan(modes.indexOf("q2"));
  expect(modes.at(-1)).toBe("list");
  expect(s.cycle).toBe(1);
  expect(s.reuploads).toBe(WORKER.reuploads + 1);
});

test("a person's first key stops the script", () => {
  const { s } = run(400, (f) => (f === 5 ? ["ArrowDown"] : []));
  expect(s.human).toBe(true);
  expect(s.mode).toBe("list");
  expect(s.sel).toBe(1);
});
