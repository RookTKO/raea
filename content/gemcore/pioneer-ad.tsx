// The Pioneer Program: GemCore's recruitment ad, 30 s (shots: ad.tsx, storyboard: pioneer-ad.script.ts).
//   raea render content/gemcore/pioneer-ad.tsx -o content/gemcore/out/pioneer-ad.mp4
import { Composition, registerRoot } from "raea";
import { AD_FRAMES, PioneerAd } from "./ad";

registerRoot(() => <Composition id="pioneer-ad" component={PioneerAd} width={1920} height={1080} fps={30} durationInFrames={AD_FRAMES} />);
