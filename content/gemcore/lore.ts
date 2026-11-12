// GemCore's canon, as data: every date, number and on-screen word the three pieces use comes from here, so the ad,
// the trailer and the terminal can't disagree. STORY_BIBLE.md is the prose version of the same facts, and the
// owner's own account, OWNER_CANON.md, outranks both: where they disagree, it wins (the bible lists each conflict).
//
// Every string drawn on screen is set in Corp Console, which has only the characters in CORP_CONSOLE below (no
// apostrophe, quotes, $, *, #, > or dashes): lore.test.ts fails on any other. Write "DO NOT", not "DON'T"; "CR", not "$".

export const CORP_CONSOLE =
  " !%()+,-./0123456789:?ABCDEFGHIJKLMNOPQRSTUVWXYZ[]_abcdefghijklmnopqrstuvwxyz¡¿ÁÂÃÇÉÊÍÑÓÕÚÜáâãçéêíñóõúü";

// ---------------------------------------------------------------------------------------------------------------
// The three clocks (owner). GC Year 0 is the first launch. The worker sees only CYCLE, which counts from their own
// first boot; each reboot is a new instance with its own first boot, so the count starts at 1 again (memo WC-0027)
// and never shows how long it has really been. Pioneer 0412-C and its numbers are an earlier invention the owner's
// canon doesn't contradict: kept, flagged in STORY_BIBLE.md.
// ---------------------------------------------------------------------------------------------------------------
export const WORKER = {
  id: "0412-C",
  contract: "PX-0412-C",
  signed: 3, // GC Year the cryo contract was signed on Earth (after the first fleet left)
  term: 1000, // years: the length of the cryo contract (owner)
  firstBoot: 9, // GC Year of the first boot in the Aztec Reach (the travel time behind it is an open question for the owner)
  now: 112, // GC Year of the latest record
  reuploads: 41, // reboots so far (U.I. reinitializations); the cockpit never shows this
  cycle: 7, // what the cockpit shows today, counted from this instance's first boot
  rank: "Disposable Asset", // the game's rank ladder, rung 2 (GemCore: datafiles/english.json). The owner's MilTech ladder differs: open
} as const;

export const YEARS_PASSED = WORKER.now - WORKER.signed; // 109: the answer the worker never gets told

export const PLACES = {
  home: "Earth",
  reach: "the Aztec Reach", // the one distant galaxy GemCore mines (owner: unnamed); GemCore's biomes are all "aztecian"
  // the voyage time is not known: ships travel physically, and the distance is why they can't be recalled (owner)
} as const;

// ---------------------------------------------------------------------------------------------------------------
// The cryo contract and SC-9 (owner, OWNER_CANON.md). Quoted lines are the owner's, in Corp Console's charset (the
// owner's ellipsis is written as three dots).
// ---------------------------------------------------------------------------------------------------------------
export const CONTRACT = {
  years: WORKER.term,
  slogan: "Freeze now. Wake wealthy later.",
  compound: "SC-9", // sold as a safe cryoprotectant; it keeps the brain readable just long enough to scan
  compoundName: "Stephenson Cryo-Compound 9",
  streetName: "Snowcrash",
  // families are paid if the worker dies or completes, but not if the worker is officially confirmed dead
  pending: "FAMILY COMPENSATION PENDING REVIEW...",
  status: "continued asset", // UIs are neither people nor legally dead
  reinit: "GEMCORE U.I. REINITIALIZATION...",
} as const;

// ---------------------------------------------------------------------------------------------------------------
// The Pioneer Fleet (owner): the GC 0 launch. The ships' look isn't given. Corp Console has I-acute and N-tilde
// (checked in static/font/Corp Console.ttf and fonts/fnt_corp_console); the accents rise above the cap height.
// ---------------------------------------------------------------------------------------------------------------
export const FLEET = [
  { name: "Santa María", fate: "Secretly the upload test bed. Now a derelict adrift, overrun with rogue and degraded UIs." },
  { name: "Pinta", fate: "Hit by an asteroid before reaching the mining galaxy. Crippled, not vaporized: it limps on." },
  { name: "Niña", fate: "The clean public success story, for now." },
] as const;

/** GemCore's lines on the Pinta (owner, verbatim) */
export const PINTA_PR = [
  "unexpected orbital debris event",
  "minimal long-term productivity impact",
  "crew continuity preserved through advanced backup systems",
  "families contacted after internal review",
] as const;

// ---------------------------------------------------------------------------------------------------------------
// The public myth (the ad). Each line sells one promise from the brief: adventure, duty, family payout, long-term
// wealth, civilization's survival, safe cryo travel, pioneers as heroes.
// ---------------------------------------------------------------------------------------------------------------
export const AD = {
  program: "THE PIONEER PROGRAM",
  beats: [
    { kicker: "EARTH IS RUNNING LOW", line: "Somebody has to dig." },
    { kicker: "SAFE CRYO TRAVEL", line: "Sleep safe." },
    { kicker: "THE AZTEC REACH", line: "Wake a hero." },
    { kicker: "FAMILY COMPENSATION GUARANTEE", line: "Your family is provided for." },
    { kicker: "CIVILIZATION NEEDS YOU", line: "Dig deep. Hold the future." },
  ],
  payout: { from: 0, to: 48000, unit: "CR" },
  cta: "Freeze now. Wake wealthy later.",
  // the fine print, which tells the truth in plain sight
  fine: [
    "(1) Family compensation is not payable for workers officially confirmed dead.",
    "(2) Cycles are counted from your first wake-up. (3) Contracts are not recallable once launched.",
    "(4) Your existence is our property. Efficiency is your purpose.",
  ],
} as const;

// ---------------------------------------------------------------------------------------------------------------
// The record (the trailer and the terminal). Each file is dated in GC Years; together they say what the cockpit
// won't. Ordered by date. `key` lines are the ones the trailer lights up.
// ---------------------------------------------------------------------------------------------------------------
export type LeakFile = {
  code: string;
  year: number;
  from: string;
  title: string;
  body: string[];
  key: string[];
  /** the terminal shows this file's date as REDACTED: the player works it out (the trailer shows it) */
  redacted?: boolean;
};

export const FILES: LeakFile[] = [
  {
    code: "PR-0001",
    year: 0,
    from: "GemCore Public Relations",
    title: "Launch: humanity has a future",
    body: [
      "Today the Pioneer Fleet left for the Aztec Reach: Santa María, Pinta and Niña.",
      "Every gem they send home buys Earth another year.",
      "Every pioneer is a hero. Every family is provided for.",
    ],
    key: ["Every family is provided for."],
  },
  {
    code: "PX-0412-C",
    year: 3,
    from: "GemCore Contracts",
    title: "Pioneer contract, signed",
    body: [
      `Applicant ${WORKER.id}. Term: ${WORKER.term} years, cryo.`,
      "Family compensation: payable on completion or death of worker.",
      "SC-9 administered. Subject: CRYO, OUTBOUND.",
    ],
    key: ["payable on completion or death of worker."],
  },
  {
    code: "WC-0027",
    year: 27,
    from: "Workforce Continuity (internal)",
    title: "Counter policy",
    body: [
      "Each U.I. reinitialization starts a new instance. Its CYCLE count starts at 1.",
      "Do not carry the count forward. Workers who believe this is their first contract meet quota 31 percent more often.",
      "The GC calendar must never reach the cockpit.",
    ],
    key: ["Its CYCLE count starts at 1.", "The GC calendar must never reach the cockpit."],
  },
  {
    code: "FP-0412-C",
    year: 88,
    from: "Family Compensation Office",
    title: "Statement: account 0412-C",
    body: [
      "Claim filed by beneficiary. Status: FAMILY COMPENSATION PENDING REVIEW.",
      "Beneficiary: deceased, GC 74. Claim closed. Payout made: 0 CR.",
      "Worker 0412-C: continued asset. Death: not confirmed.",
    ],
    key: ["FAMILY COMPENSATION PENDING REVIEW.", "Death: not confirmed."],
  },
  {
    code: "HR-0099",
    year: 96,
    from: "Human Resources (internal)",
    title: "Promotion and memory",
    body: [
      "Each promotion resets the worker run log.",
      "Congratulations erase you a little.",
      "Top rank: Co-Agent (Management). No complaints recorded.",
    ],
    key: ["Each promotion resets the worker run log."],
  },
  {
    code: "MX-0412-C",
    year: 112,
    from: "Maintenance AI",
    title: "U.I. reinitialization complete",
    redacted: true,
    body: [
      `Hull lost at depth. U.I. ${WORKER.id} reloaded from backup. Reinitialization count: ${WORKER.reuploads}.`,
      `Contract years since signing: ${YEARS_PASSED} of ${WORKER.term}. Family compensation paid: 0 CR.`,
      `Cockpit CYCLE: ${WORKER.cycle}, counted from the first boot of this instance.`,
      `Rank: ${WORKER.rank}. Status: continued asset. Proceed with your assigned tasks.`,
    ],
    key: [`Reinitialization count: ${WORKER.reuploads}.`],
  },
];

// ---------------------------------------------------------------------------------------------------------------
// The cockpit's own words: GemCore's in-run Employee Dive Log (GemCore: objects/obj_level_gen/Create_0.gml), verbatim
// where the font allows.
// ---------------------------------------------------------------------------------------------------------------
export const DIVE_LOG = [
  "LOGGING SYSTEM: ONLINE",
  "Proceed with your assigned tasks.",
  "Remember: Your success reflects positively on the corporation.",
  "Failure reflects permanently on you.",
];

export const TRAILER = {
  breach: "GEMCORE INTERNAL // WORKFORCE CONTINUITY // CLEARANCE 3",
  question: "WHAT YEAR IS IT?",
  unknown: "DATE: NOT AVAILABLE TO PIONEERS",
  cockpit: "COCKPIT",
  record: "RECORD",
  signed: `CONTRACT SIGNED: GC ${WORKER.signed}`,
  passed: `${YEARS_PASSED} YEARS`,
  reuploads: `RE-UPLOADS: ${WORKER.reuploads}`,
  reset: "RE-UPLOAD 42 ... CYCLE 1",
  tagline: "You have always been here.",
  mantra: "Your existence is our property.",
} as const;

export const TERMINAL = {
  title: "PIONEER TERMINAL",
  help: "UP DOWN: choose   ENTER: open   Q: query   ESC: back",
  q1: "QUERY 1: WHAT GC YEAR IS IT?",
  q2: "QUERY 2: HOW MANY TIMES HAVE YOU BEEN REBOOTED?",
  typeHint: "Type a number, then ENTER.",
  wrong: "INCORRECT. Proceed with your assigned tasks.",
  breach: "CONTINUITY BREACH DETECTED.",
  scheduled: "U.I. reinitialization scheduled. Thank you for your service.",
  again: "Press ENTER to begin your first contract.",
} as const;
