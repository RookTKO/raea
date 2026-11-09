// The Leak's storyboard (leak-trailer.tsx draws it).
import { script } from "raea/brief";

export default script({
  title: "The Leak",
  logline: "The brochure breaks; the cockpit shows the only clock a pioneer gets; the record shows the real one.",
  scenes: [
    {
      heading: "The brochure, interrupted",
      beats: [
        { onScreen: "The ad's cryo capsule, then the fleet at sunrise, already playing.", camera: "the ad's own drift", cues: ["GemCore Theme from its full section"], seconds: 3 },
        { onScreen: "The fleet shot tears sideways in bands, red bleeding through.", cut: "glitch: a 4-frame tear, then a full one", seconds: 3 },
      ],
    },
    {
      heading: "The breach",
      beats: [{ onScreen: "Black glass. GEMCORE INTERNAL // WORKFORCE CONTINUITY // CLEARANCE 3 types out in red.", cut: "hard cut on the tear", cues: ["radio filter burst", "Judgement Day begins"], seconds: 2 }],
    },
    {
      heading: "The cockpit",
      payoff: "The worker's only clock: CYCLE 7, and no date.",
      beats: [
        {
          onScreen: "The Probe beside a huge yellow CYCLE 7; GemCore's Employee Dive Log types out; WHAT YEAR IS IT? DATE: NOT AVAILABLE TO PIONEERS.",
          camera: "slow push in, 100% to 108%",
          seconds: 10,
        },
      ],
    },
    {
      heading: "The record",
      payoff: "The real clock, file by file: no bodies left Earth, the counter is reset, the family is gone, 41 re-uploads.",
      beats: [
        {
          onScreen: "Seven files, each with its GC Year huge and red on the left and its text typing on the right; the key lines turn red. A timeline marker runs from GC 0 to GC 112 along the bottom.",
          camera: "each file slides in on its cut, date from below, text from the right",
          cues: ["radar blips on the counter policy, the payout statement and the re-upload count", "the score lifts for the last files"],
          seconds: 22,
        },
      ],
    },
    {
      heading: "The cross-reference (poster frame)",
      beats: [
        {
          onScreen: "COCKPIT: CYCLE 7 on the left, RECORD: GC 112 on the right; a line joins them; CONTRACT SIGNED: GC 3, then 109 YEARS, then RE-UPLOADS: 41 in red.",
          seconds: 10,
        },
      ],
    },
    {
      heading: "The reset",
      beats: [
        {
          onScreen: "The ship breaks apart; white flash; RE-UPLOAD 42 ... CYCLE 1, the counter jittering from 7 to 1.",
          cut: "hard cut on the impact",
          cues: ["impact", "glass break"],
          seconds: 5,
        },
      ],
    },
    {
      heading: "Title",
      beats: [{ onScreen: "GemCore logo on the glass. You have always been here. Then, small and red: Your existence is our property.", cues: ["score fades over 3 s"], seconds: 5 }],
    },
  ],
});
