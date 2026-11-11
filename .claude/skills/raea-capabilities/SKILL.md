---
name: raea-capabilities
description: The whole of what raea can put on screen and in the ear, arranged by what a story needs (a character acting, a place with depth, a voice, a reveal, a cut on the music) rather than by module, with the guide file for each, what was verified on a Linux CPU container, and the environment traps (Pocket TTS behind a proxy, sao being Mac-only, pixel sprites in 3D, the export cache). Load before planning any raea film, trailer, explainer or lore piece, and whenever a plan reaches for "a still with a slow push and a caption", which is the sign the capability map wasn't read. Triggers on: what can raea do, raea capabilities, raea features, which raea component, how do I show X in raea, voice in raea, narration, Speech, 3D in raea, parallax, ImagePlane, Screen, CRT, puppet, cutout animation, song map, raea song, Tone.js, foley, Pocket TTS.
---

# What raea can do, by what the story needs

raea's official skill is the source of truth and lives in this repo as a submodule:
`skills/skills/raea/` (`git submodule update --init skills` if it's empty). Its `SKILL.md` routes to every guide.
This file doesn't replace it. It answers a different question: **"the story needs X on screen. Which raea thing
does X, and does it work here?"** Read the guide named in the row before you write the code.

The point of this map is variety. A film made only from rows 1 and 12 (a still image and a caption) is a slideshow,
whatever the art is. Every piece should draw from at least four different rows, and every scene should add one
thing the scene before didn't use.

Status: **V** verified rendering on Linux with the CPU Vulkan driver (lavapipe), raea 0.1.0 from a checkout,
2026-11; **M** works on the Mac only; **U** in the SDK but unverified here; **S** needs setup first (see "Traps").

## The rows

| # | The story needs... | raea gives | Guide | Status |
|---|---|---|---|---|
| 1 | a picture: a painted plate, a poster, a sprite | `<Img>` on the page; `ImagePlane` (`raea/3d`) in the scene | `motion/assets.md`, `3d/assets.md` | V |
| 2 | **a place with depth**: the camera moves and near things slide past far ones | `ImagePlane`s at different `z` under one `<Camera3d>`; the camera's `transform` from the frame. Cutouts with alpha keep their shape (`cutout` for hard edges) | `3d/scene.md`, `3d/assets.md` | V |
| 3 | **a character who acts**: points, shrugs, turns its head, blinks, talks | a cutout puppet: the art split into parts (body, head, upper arm, forearm, prop), nested `div`s or `ImagePlane`s, each rotating round its own pivot (`transformOrigin`), driven by `track()` keys or the frame | `motion/animating.md` (tracks, curves); `../raea-shots/examples/verified-probe.tsx` | V |
| 4 | a sprite that animates (a game's own frames) | `ImagePlane grid={[cols, rows]} frame={n}` for a sheet; frame-stepped `<Img>` swaps on the page | `3d/assets.md` | V (`<Img>`), U (`grid`) |
| 5 | **a screen inside the world**: a cockpit monitor, a terminal, a TV ad playing in a room | `<Screen>` (`raea/3d`): a nested composition painted onto a quad or a model's glass, as a CRT (`crt={{curvature, scanlines, flicker, glow}}`) or flat; `power` 0 to 1 switches it on | `sdk/render/src/screen.tsx` header, `3d/post.md` (passes) | V |
| 6 | **a voice**: a narrator, a character's line, an announcer | `<Speech text voice start />` (`raea/speech`, Pocket TTS, local). 8 voices: alba, marius, javert, jean, fantine, cosette, eponine, azelma; or a WAV to clone. `seed` picks another take, `temperature` calmer or livelier | `motion/sound.md` | V (after the Pocket trap below) |
| 7 | words cued to the voice: captions, a cut on a word, a stamp landing as it's said | `speechAt(line, frame, fps)` gives the word being said and `endFrame`; `speechDuration(line)` the line's length, so scenes are timed from the voice rather than guessed | `sdk/audio/src/speech.tsx` header, `motion/words.md` | V |
| 8 | **cuts on the music**: holds in the quiet, faster through a build, the big change on the drop | `raea song FILE -o F.song.json --plot F.png`, then `song(map, {fps}).cutsAt()`, `useSong(map).buildProgress` | `motion/timing.md` ("Pacing cuts to a song's energy"), `motion/music.md` | S (needs `raea-perceive`) |
| 9 | a score written for the picture: a drone, a pulse, a sting on the reveal | Tone.js (`raea/tone`): `PolySynth`, `FMSynth`, `MembraneSynth`, `NoiseSynth`, `Part`, `Sequence` on `Tone.buses.music`; `duck` under the voice; `Tone.Sfx` one-shots | `motion/music.md` | V (synths); TokenSynth instruments S |
| 10 | foley: a stamp, paper, a clicker, a hatch, a drill | the project's own sound files first; `sao("prompt", {seconds})` | `motion/sound.md` | own files V; `sao` M |
| 11 | the mix | one `<Mix lufs={-14} ceiling={-1.5} />`; each sound in its own `<Sequence layout="none">`; levels in `gainDb` | `motion/sound.md` | V |
| 12 | type: a title, a counter, a stamp, a label | `<Animate enter="rise|pop|slam|slide|wipe|strike|tick">` moves, `<Stagger>`, `timeline(sequence(...), parallel(...))` | `motion/animating.md`, `motion/layout.md`, `graphics.md` | V |
| 13 | text that lives in the world | `Text3D` (`raea/text`), `Decal` on a surface | `3d/meshes.md`, `3d/materials.md` | U |
| 14 | a modelled object: a capsule, a gem, a drill, a console | primitives (`Cuboid`, `Sphere`, `Cylinder`, `Cone`, `Torus`), Manifold solids (`manifold.box().minus()...`), `<Model src=".glb">` | `3d/meshes.md`, `3d/assets.md` | U (primitives V in the official probe) |
| 15 | a look laid over a 3D scene: flat painted illustration, cartoon, pixel, ink lines | `<Look mode="paint|cartoon|pixel">`, `<Outline>`, `ToonMaterial`, `skip={["ui"]}` to keep a page crisp | `3d/post.md`, `3d/materials.md` | U |
| 16 | light that means something: a warning lamp, a screen's glow, dawn | `PointLight`, `SpotLight`, `DirectionalLight`; `emissive` + `<Bloom>`; `Fog`, `VolumetricFog` | `3d/lights.md`, `3d/post.md` | Bloom V; rest U |
| 17 | a lens: focus pulled from the back to the face, a fisheye, motion blur | `<DepthOfField focal_distance aperture_f_stops>` inside `<Camera3d>`; `<Fisheye>`, `<LensDistortion>`, `<MotionBlur>` | `3d/post.md` | DoF: no visible blur here, U |
| 18 | things that fall, scatter, collide, break | `<Physics>` / `<Body>` (baked), `glitch` on a body, `<Goo>` for liquids, `<Fire>` | `3d/animation.md`, `3d/liquids.md`, `3d/post.md` | U |
| 19 | many of a thing: a fleet, a queue, a field of rocks | `<Instances>`, `scatter()`; on the page, a mapped list seeded by index | `3d/meshes.md` | U |
| 20 | a 3D person | Anny bodies (`raea/character`) posed by goals and motion capture | `3d/characters.md` | U; only when the project's design has 3D people |
| 21 | a playable beat: the viewer presses a key and the world answers | `useGameState`, `useInput`; `raea play`; a render is its attract run | `games.md`, `motion/games.md` | V (GemCore's `cycle-terminal.tsx`) |
| 22 | real footage, cut by its words | `<Video>`, `raea cut`, `raea frame`, `<FaceFrame>` | `footage.md` | U (no footage in our projects yet) |
| 23 | a brief and a storyboard the person approves before anything renders | `brief.ts`, `NAME.script.ts` from `raea/brief`; `raea spec FILE` checks them | `reference/files.md` | V |
| 24 | a measured check of the export | `raea check OUT.mp4` (text, contrast, freezes, flashes, loudness, blotching) | `motion/rendering.md`, `craft/rubric.md` | V |

## Combinations that carry a story

Single rows are tools. These are the combinations that do narrative work, each built from verified rows:

- **The acted scene** (2 + 3 + 6 + 7): a character as a puppet in front of a parallax set, saying a line, its arm
  lifting on the word that matters. This is the default unit of a story, not the captioned still.
- **The diegetic reveal** (5 + 7 + 16): the clue appears on a screen inside the world (the cockpit's counter
  flips), the light of the screen changes the room, a voice reacts. The audience discovers it with the character.
- **The insert** (2 + 12 + 10): a close shot of one object (a stamp, a form field, a counter) with one sound, cut in
  between two acted shots. It's how a fact enters a story without a caption.
- **The music-led montage** (8 + 1/2 + 12): only after `raea song`, the cuts on the map's events, a build driving a
  push-in, the title on the drop.
- **The broadcast** (5 + 6 + 9): an in-world ad or briefing playing on a screen, which the film can cut into and out
  of: propaganda seen as the characters see it.

## Traps on this kind of machine

- **Pocket TTS behind a TLS-intercepting proxy.** raea downloads the voice model with rustls and its own root
  certificates, so a proxy's CA isn't trusted and `<Speech>` renders silence with
  `Pocket TTS unavailable: ... invalid peer certificate: UnknownIssuer`. `SSL_CERT_FILE` doesn't help. Fetch the files
  with curl, which does use the system's CA, into the cache raea reads: `bash .claude/skills/raea-capabilities/fetch-pocket.sh`.
- **The export cache.** Rendering an unchanged composition to the same path returns the cached export
  (`the same export as before: from the export cache`). After fixing the environment, change the composition (or the
  output path) to make it render again.
- **`sao` is Core ML** (Mac only). On Linux, use the project's own sound files and Tone.js synths for effects
  (`NoiseSynth` for a hiss or a stamp's thud, `MembraneSynth` for an impact, `MetalSynth` for a clank).
- **`raea song` needs two things a checkout doesn't have**: `raea-perceive` beside the binary
  (`cargo build --release -p raea-perceive`, about 5 minutes), and the Beat This! model at
  `~/.local/share/raea-models/beat-this/beat_this_small0.onnx`, which only raea's release archive ships
  (`share/raea/models/beat-this/` inside `raea-VERSION-PLATFORM.tar.gz`, from github.com/shinyobjectz/raea releases).
  Without them, map the song by ear from a waveform (`ffmpeg -i SONG -filter_complex showwavespic=s=2400x300 wave.png`),
  write the section starts and hits down as seconds, and say in the piece's notes that the cuts aren't from a map.
- **Pixel sprites on an `ImagePlane` are filtered smooth** (there's no nearest-neighbour switch). Upscale the PNG by
  a whole number with nearest-neighbour first (`ffmpeg -i in.png -vf scale=iw*8:ih*8:flags=neighbor out.png`) and
  use that.
- **The page draws over the 3D.** A `div` is always in front of every `ImagePlane`. To put a puppet *between* layers
  of a set, make its parts `ImagePlane`s too, or split the set into a back plate (3D) and a foreground (page).
- **Speed.** lavapipe renders 25-130 ms a frame at 1080p. Render stills at the moments that matter
  (`--at A,B,C`) and look, before any full render. Render long pieces in the background.
- **Relative paths** in `src` resolve from the composition's own folder.
- **The official floor bans generated imagery.** A person's own standing instruction overrides a guide ("the person
  wins", `craft/ROUTER.md`). When a project allows generated art (GemCore allows OpenArt images made from its own art
  as reference), write that permission into the project's design bible and the brief, so the next agent doesn't
  undo it or overuse it.
