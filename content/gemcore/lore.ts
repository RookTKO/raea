// GemCore's canon, as data: every date, number and on-screen word the three pieces use comes from here, so the ad,
// the trailer and the terminal can't disagree. STORY_BIBLE.md is the prose version of the same facts.
//
// Every string drawn on screen is set in Corp Console, which has only the characters in CORP_CONSOLE below (no
// apostrophe, quotes, $, *, #, > or dashes): lore.test.ts fails on any other. Write "DO NOT", not "DON'T"; "CR", not "$".

export const CORP_CONSOLE =
  " !%()+,-./0123456789:?ABCDEFGHIJKLMNOPQRSTUVWXYZ[]_abcdefghijklmnopqrstuvwxyz¡¿ÁÂÃÇÉÊÍÑÓÕÚÜáâãçéêíñóõúü";

// ---------------------------------------------------------------------------------------------------------------
// The three clocks. GC Year 0 is the first Pioneer launch. The worker sees only CYCLE, which counts wake-ups since
// their latest activation and is set back to 1 at every re-upload (memo WC-27), so it never shows how long it's been.
// ---------------------------------------------------------------------------------------------------------------
export const WORKER = {
  id: "0412-C",
  contract: "PX-0412-C",
  signed: 3, // GC Year the contract was signed and the profile captured on Earth
  firstBoot: 9, // GC Year the profile first woke in the Aztec Reach (6 years of signal lag)
  now: 112, // GC Year of the latest record
  reuploads: 41, // re-uploads so far; the cockpit never shows this
  cycle: 7, // what the cockpit shows today
  rank: "Disposable Asset", // GemCore's rank ladder, rung 2 (GemCore: datafiles/english.json, rank keys)
  denativized: 62, // percent of native (Earth) memory trimmed
} as const;

export const YEARS_PASSED = WORKER.now - WORKER.signed; // 109: the answer the worker never gets told

export const PLACES = {
  home: "Earth",
  reach: "the Aztec Reach", // the one distant galaxy GemCore mines; GemCore's biomes are all "aztecian"
  lag: 6, // years for a profile signal to cross
} as const;

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
    { kicker: "FAMILY PAYOUT GUARANTEE", line: "Your family is paid every cycle." },
    { kicker: "CIVILIZATION NEEDS YOU", line: "Dig deep. Hold the future." },
  ],
  payout: { from: 0, to: 48000, unit: "CR" },
  cta: "Enlist today. Your family will thank you.",
  // the fine print, which tells the truth in plain sight
  fine: [
    "(1) Cryo is a brand term. (2) Payout subject to clause 14(c), Continuity Deductions.",
    "(3) Cycles are counted from your most recent activation. (4) Contracts are not recallable once transmitted.",
    "(5) Your existence is our property. Efficiency is your purpose.",
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
      "Today the first Pioneer fleet left for the Aztec Reach.",
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
      "Applicant 0412-C. Term: until quota is met.",
      "Family Payout: 2 percent of yield, paid yearly to beneficiary.",
      "Profile capture: COMPLETE. Subject body: RETIRED.",
    ],
    key: ["Subject body: RETIRED."],
  },
  {
    code: "PS-0019",
    year: 3,
    from: "Profile Services (internal)",
    title: "On the word cryo",
    body: [
      "Cryo is a brand term. No body has ever left Earth.",
      "Pioneers are sent as profiles, by signal.",
      "Do not correct applicants. They sign faster when they think they will sleep.",
    ],
    key: ["No body has ever left Earth."],
  },
  {
    code: "WC-0027",
    year: 27,
    from: "Workforce Continuity (internal)",
    title: "Counter policy",
    body: [
      "On every re-upload, set the cockpit CYCLE counter back to 1.",
      "Pilots who believe this is their first contract meet quota 31 percent more often.",
      "The GC calendar must never reach the cockpit.",
    ],
    key: ["set the cockpit CYCLE counter back to 1", "The GC calendar must never reach the cockpit."],
  },
  {
    code: "FP-0412-C",
    year: 88,
    from: "Family Payout Office",
    title: "Statement: account 0412-C",
    body: [
      "Payouts sent since signing: 85. Beneficiary: deceased, GC 74.",
      "Account unclaimed. Funds returned to GemCore under clause 14(c).",
    ],
    key: ["Beneficiary: deceased, GC 74."],
  },
  {
    code: "HR-0099",
    year: 96,
    from: "Human Resources (internal)",
    title: "Promotion is denativization",
    body: [
      "Each rank trims native memory: Earth, names, faces.",
      "Fully denativized profiles are filed as GemCore Robot Guy.",
      "Top rank. No complaints recorded.",
    ],
    key: ["Each rank trims native memory"],
  },
  {
    code: "MX-0412-C",
    year: 112,
    from: "Maintenance AI",
    title: "Re-upload complete",
    redacted: true,
    body: [
      "Hull lost at depth. Profile 0412-C re-uploaded. Re-upload count: 41.",
      "Payout transfers logged since signing: 109.",
      "Cockpit CYCLE set to 7 by request of Continuity, for morale.",
      "Rank: Disposable Asset. Denativization: 62 percent. Proceed with your assigned tasks.",
    ],
    key: ["Re-upload count: 41."],
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
  scheduled: "Re-upload scheduled. Thank you for your service.",
  again: "Press ENTER to begin your first contract.",
} as const;
