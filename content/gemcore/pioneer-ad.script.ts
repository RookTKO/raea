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
        { onScreen: "A payout counter climbs to 48 000 CR while gems rain into a pile. FAMILY COMPENSATION GUARANTEE / Your family is provided for.", camera: "locked, the gems do the moving", cues: ["the theme reaches full"], seconds: 4.8 },
        { onScreen: "The big drill, close and shaking, throws gems. CIVILIZATION NEEDS YOU / Dig deep. Hold the future.", camera: "slow push in on the drill head", seconds: 4.8 },
      ],
    },
    {
      heading: "The end card",
      payoff: "The slogan, and the fine print that says everything the leak will.",
      beats: [
        {
          onScreen: "GemCore logo, THE PIONEER PROGRAM, Freeze now. Wake wealthy later. Fine print: family compensation is not payable for workers officially confirmed dead; cycles counted from your first wake-up; contracts not recallable once launched; your existence is our property.",
          camera: "settles from 104% to 100%",
          cues: ["theme fades over the last 2 s"],
          seconds: 6,
        },
      ],
    },
  ],
});
