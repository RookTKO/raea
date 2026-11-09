// Every on-screen string is set in Corp Console, which lacks apostrophes, quotes, $, *, # and dashes: a missing
// glyph draws as a box or nothing, so catch it here (bun test content/gemcore).
import { expect, test } from "bun:test";
import * as lore from "./lore";

function strings(v: unknown, at: string, out: [string, string][]) {
  if (typeof v === "string") out.push([at, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => strings(x, `${at}[${i}]`, out));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) strings(x, `${at}.${k}`, out);
  return out;
}

test("every lore string draws in Corp Console", () => {
  const ok = new Set(lore.CORP_CONSOLE);
  const bad = strings({ ...lore, CORP_CONSOLE: "" }, "lore", [])
    .flatMap(([at, s]) => [...s].filter((c) => !ok.has(c)).map((c) => `${at}: ${JSON.stringify(c)} in ${JSON.stringify(s)}`));
  expect(bad).toEqual([]);
});

test("the clocks add up", () => {
  const { WORKER, YEARS_PASSED, FILES } = lore;
  expect(WORKER.signed + YEARS_PASSED).toBe(WORKER.now);
  expect(FILES.at(-1)!.year).toBe(WORKER.now);
  expect(FILES.at(-1)!.body.join(" ")).toContain(`since signing: ${YEARS_PASSED}`);
  expect(FILES.at(-1)!.body.join(" ")).toContain(`count: ${WORKER.reuploads}`);
  for (const f of FILES) for (const k of f.key) expect(f.body.join(" ")).toContain(k);
  expect([...FILES].sort((a, b) => a.year - b.year)).toEqual(FILES);
});
