# Claude Code: the narrative director

This folder is picked up by Claude Code when it works in this repo. It adds one agent and five skills for *making*
films with raea (raea's own skill, `skills/skills/raea/`, covers how raea works; these cover how to tell a story with
it).

| | What it's for |
|---|---|
| `agents/raea-director.md` | the agent: turns information (a premise, lore, posters, a storyboard sheet) into a raea film, faithful to the project's designs, with real shot variety; reviews finished videos |
| `skills/raea-capabilities/` | what raea can do, arranged by what a story needs, with what's verified on a Linux CPU container and the traps (`fetch-pocket.sh` fixes the voice behind a proxy) |
| `skills/raea-storyline/` | from information to a storyline: the protagonist, the secret and who knows it when, facts turned into actions, structures, the beat sheet, the storyboard file |
| `skills/raea-shots/` | the shot vocabulary, how each shot is built in raea, sound per shot, and the ten-point variety check; `examples/acted-scene.tsx` is a rendered, working scene |
| `skills/raea-fidelity/` | the project design bible (template in `templates/`) and the checks at the storyboard, the stills and the export |
| `skills/raea-review/` | how to review finished videos honestly; `sheet.sh` makes a contact sheet |

Ask for it by name ("use the raea-director agent to...") or let Claude pick it for a film, trailer or lore video.
The skills need the official skill checked out: `git submodule update --init skills`.

The first project it was written for is GemCore (RookTKOLLC/GemCore, `media/`): its design bible is
`media/DESIGN_BIBLE.md` and the review that motivated all this is `media/reviews/2026-11-review.md`.
