# Monich

A portable multi-agent skill pack for building premium scroll-driven websites with sticky scenes, scroll-linked parallax, pinned product reveals, Three.js GLB product models, layered depth, responsive layouts, reduced-motion fallbacks, Web Audio scroll sound effects, and performance-safe animation.

It is inspired by general interaction patterns found in high-end app, hardware, and product showcase pages. It must not copy Raycast, NVIDIA, Apple, or any real brand assets, names, screenshots, claims, logos, exact layouts, or marketing text.

## Supported Agents

- OpenAI Codex / Codex CLI: read `AGENTS.md`, then `skills/monich/SKILL.md`.
- Claude Code: read `CLAUDE.md`, then `skills/monich/SKILL.md`.
- Cursor: use `.cursor/rules/monich.mdc`.
- Windsurf: use `.windsurf/rules/monich.md`.
- Aider / agy-style terminal agents: read `CONVENTIONS.md`, then the skill file.
- Generic Markdown-reading agents: start with `AGENTS.md`.

## Universal Install

Monich installs into common skill/rule folders for Codex, Claude Code, Gemini CLI, Cursor, Windsurf, Cline, Antigravity-style agents, and generic Markdown-reading agents.

Windows PowerShell:

```powershell
irm https://raw.githubusercontent.com/WyvernCW/Monich/main/install.ps1 | iex
```

macOS/Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/WyvernCW/Monich/main/install.sh | sh
```

The installer writes Monich into these locations when supported by the agent:

- `~/.codex/skills/monich`
- `~/.claude/skills/monich`
- `~/.agents/skills/monich`
- `~/.gemini/extensions/monich`
- `~/.cursor/rules/monich.mdc`
- `~/.windsurf/rules/monich.md`
- `~/.cline/rules/monich.md`
- `~/.clinerules/monich.md`
- `~/.antigravity/rules/monich.md`
- `~/.monich/monich`

For project-local rule files, run the installer with `-ProjectPath` on PowerShell or `PROJECT_PATH=/path/to/project` on macOS/Linux.

Then restart any already-open agent apps/CLIs and invoke:

```text
Use $monich to build a premium scroll-driven product showcase.
```

The installable skill includes:

- `SKILL.md`
- `agents/openai.yaml`
- reference docs
- runnable templates under `assets/templates/`

## How To Use

Copy `Monich/` into a project, or keep it as a reusable reference folder. When a user asks for a premium scroll website, the agent should:

1. Read `skills/monich/SKILL.md`.
2. Pick one template.
3. Generate or adapt runnable frontend code.
4. Verify the build and scroll behavior.

## Template Choice

Use Motion React for simple parallax, Raycast-clean app pages, floating cards, command palettes, UI panels, GLB product models, Web Audio scroll sound, and transform/opacity scroll progress.

Use GSAP ScrollTrigger for pinned timelines, Apple-like staged product storytelling, NVIDIA-like technical reveal patterns, GLB hardware/GPU-style models, Web Audio scroll sound, product scale/rotation, and spec panels inside a pinned section.

Use the plain HTML/CSS/JS template when no framework is requested or when the user needs a single-file demo.

## Run The React + Motion Template

```bash
cd templates/react-vite-motion
npm install
npm run dev
```

## Run The React + GSAP Template

```bash
cd templates/react-vite-gsap
npm install
npm run dev
```

## Run The Plain Template

Open `templates/plain-html-css-js/index.html` in a browser. It has no dependencies.

## Copy Into Another Project

Copy these folders/files into the target repo:

- `AGENTS.md`
- `CLAUDE.md` if Claude Code is used
- `CONVENTIONS.md` if Aider-style agents are used
- `.cursor/rules/monich.mdc` if Cursor is used
- `.windsurf/rules/monich.md` if Windsurf is used
- `skills/monich/`
- `templates/`
- `prompts/`

Then ask the agent to use `skills/monich/SKILL.md`.

For Codex-specific sharing, copy only `installable/monich/` into another person's `~/.codex/skills/monich`.

## Brand Safety

Do not copy real brand assets. Do not use real product names, screenshots, logos, exact layouts, or marketing claims. Recreate only broad interaction patterns: sticky scenes, parallax depth, pinned reveal, large typography, clean dark UI, CSS mockups, technical spec panels, and responsive storytelling.

## Troubleshooting

- Missing package: run `npm install` inside the selected template folder.
- Blank page: check browser console and verify imports match package names.
- Scroll scene too short: increase the wrapper height to `350vh` or `500vh`.
- Pinned scene does not pin: verify GSAP `ScrollTrigger.registerPlugin(ScrollTrigger)` and timeline trigger refs.
- 3D model is blank: verify `three` is installed, the canvas container has a stable height, and WebGL is available in the browser.
- Motion too intense: confirm `prefers-reduced-motion` CSS and runtime checks are active.
- Assets missing: replace image references with CSS mockups instead of inventing files.
- Mobile overlap: collapse cards below the focal mockup and reduce sticky content density.
