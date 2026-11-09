// The Pioneer Program's storyboard: six beats, one subject each (ad.tsx draws them).
import { script } from "raea/brief";

export default script({
  title: "The Pioneer Program",
  logline: "GemCore's recruitment ad: every promise from the brochure, and the truth in the fine print.",
  scenes: [
    {
      heading: "The brochure",
      payoff: "Signing up feels heroic, safe and generous.",
      beats: [
        { onScreen: "The Probe drill ship bores straight down through warm strata; dust sprays up. EARTH IS RUNNING LOW / Somebody has to dig.", camera: "sinks with the drill, never stops", cues: ["GemCore Theme, quiet opening"], seconds: 4.8 },
        { onScreen: "Odin-I asleep inside a frosted capsule, drifting through ink stars. SAFE CRYO TRAVEL / Sleep safe.", camera: "slow drift right", cut: "hard cut, motion carried by the stars", seconds: 4.8 },
        { onScreen: "Four ships fly in formation across a rising orange sun. THE AZTEC REACH / Wake a hero.", camera: "fleet leads the frame left to right", cut: "on the stars speeding up", seconds: 4.8 },
        { onScreen: "A payout counter climbs to 48 000 CR while gems rain into a pile. FAMILY PAYOUT GUARANTEE / Your family is paid every cycle.", camera: "locked, the gems do the moving", cues: ["the theme reaches full"], seconds: 4.8 },
        { onScreen: "The big drill, close and shaking, throws gems. CIVILIZATION NEEDS YOU / Dig deep. Hold the future.", camera: "slow push in on the drill head", seconds: 4.8 },
      ],
    },
    {
      heading: "The end card",
      payoff: "The call to enlist, and the five fine-print lines that say everything the leak will.",
      beats: [
        {
          onScreen: "GemCore logo, THE PIONEER PROGRAM, Enlist today. Your family will thank you. Fine print: cryo is a brand term; payout subject to clause 14(c); cycles counted from your most recent activation; contracts not recallable; your existence is our property.",
          camera: "settles from 104% to 100%",
          cues: ["theme fades over the last 2 s"],
          seconds: 6,
        },
      ],
    },
  ],
});
