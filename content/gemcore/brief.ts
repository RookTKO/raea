// GemCore's lore pieces: the brief raea reads first (`raea context content/gemcore`). The facts are STORY_BIBLE.md and
// lore.ts; this says who the pieces are for, what they should leave behind, and the world they're made in.
import { brief } from "raea/brief";

export default brief({
  title: "GemCore: The Resource-Collapse Era",
  logline:
    "A mining company sells heroism, safe cryo and a family payout. Its pioneers count Cycles in the cockpit while its files count GC Years, and the gap between the two clocks is the story.",
  for: "RookTKO (GemCore's developer)",
  audience:
    "Players and wishlisters meeting GemCore for the first time, on a store page, a trailer feed or a devlog; and the developer, to see what the lore can carry.",
  believe: "GemCore's cheerful mining company is lying about time: you have been here far longer, and far more often, than your cockpit admits.",
  mode: ["story", "pitch", "play"],
  voice:
    "Two voices, one face. The company: warm, upbeat, corporate, never wrong. The record: flat, procedural, internal, never addressed to you. No narrator: the words on screen are the company's own.",
  sound:
    "GemCore's own score by ZNO. The brochure: the GemCore Theme from its full section. The leak: Judgement Day from the breach to the end. SFX from the game: radio filter on the breach, radar on the worst lines, impact and glass on the reset.",
  look: `GemCore's palette, from the game (game_macros.gml), split into two worlds that share one typeface, Corp Console.
- The brochure (public myth): off-white paper #f3e7e7, ink #464647, RookTKO orange #df7126 as the only accent. Sprites at whole-number scales, crisp. Bright, flat, friendly.
- The cockpit and the record (the machine): black glass #0b0b0c with scanlines and a vignette, phosphor in the paper colour, warning yellow #ffdd57 for the CYCLE counter only, danger red #ff3860 only for what the record says the cockpit will not.
- Camera: always drifting, never easing to a stop; cuts land on motion or on a glitch.
- Poster frame: the two clocks side by side, CYCLE 7 against GC 112, with 109 YEARS between them.`,
  notDoing: [
    "No copying GemCore's files into this repo: media/ links to a GemCore checkout.",
    "No narrator voice-over and no characters' faces: the company's words and the ships carry it.",
    "No lens flare, grain or bloom doing the idea's work.",
    "No strings the Corp Console font cannot draw (lore.test.ts holds this).",
  ],
  assumed: ["audience", "voice", "sound"],
  sections: [
    {
      heading: "Canon",
      text: "STORY_BIBLE.md (prose) and lore.ts (data). GC Year 0 is the first launch; pioneer 0412-C signed in GC 3; it is GC 112; 41 re-uploads; the cockpit says CYCLE 7.",
    },
  ],
  deliver: [
    { name: "The Pioneer Program", specs: ["30 s", "16:9", "1920x1080", "with sound"], script: "pioneer-ad.script.ts" },
    { name: "The Leak", specs: ["60 s", "16:9", "1920x1080", "with sound"], script: "leak-trailer.script.ts" },
    { name: "Pioneer Terminal", specs: ["playable", "60 s attract run", "1280x720", "keyboard"] },
  ],
  references: [
    { target: "STORY_BIBLE.md", note: "the canon" },
    { target: "media/datafiles/english.json", note: "GemCore's rank ladder and UI copy" },
    { target: "media/objects/obj_level_gen/Create_0.gml", note: "the Employee Dive Log, quoted in the cockpit" },
  ],
});
