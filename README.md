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
- `~/.gemini/skills/monich`
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
2. Recursively scan the whole `templates/` directory.
3. If present, scan every folder and file inside `templates/web-template/design-templates/`, `templates/web-template/horizontal-craft/`, and `templates/web-template/design-systems/`.
4. Pick the closest matching template or reference set for the user's website request.
4. Learn from the selected templates, then generate fresh runnable frontend code.
5. Verify the build and scroll behavior.

Templates are references, not code to paste wholesale. Agents should study layout structure, motion timing, visual rhythm, typography, spacing, and interaction ideas, then rebuild the requested site in the target stack with new components, content, data, and styling.

## Template Choice

Default to React for generated websites unless the user asks for a different stack. React + Vite is the default for fast runnable demos, React + Next.js is valid when the user wants routing, SSR, app-router pages, metadata, or a production app structure, and other frontend stacks are allowed when explicitly requested. Plain HTML/CSS/JS remains supported, but it is not the default.

When Monich activates, read and recursively scan the whole `templates/` folder first. Do not stop at top-level README files. If present, scan every folder and file inside `templates/web-template/design-templates/`, `templates/web-template/horizontal-craft/`, and `templates/web-template/design-systems/`. Build an inventory of template names, metadata, visual style, page type, layout pattern, motion pattern, and stack. Pick the closest matching reference after the inventory exists, then learn from structure, rhythm, interaction, typography, spacing, and color logic without copying code line by line.

## Web Template References

The copied web-template pack includes many Chinese-first examples and typography references. Agents must treat those as visual and structural references, not as a required output language. Generate visible copy in the language the user spoke unless the user asks for another language. Set `<html lang>` correctly for the generated page.

Live examples from the web-template pack:

- [Xianying Tool](https://xianying-tool.vercel.app/)
- [Pricing Page](https://pricing-page-beige-psi.vercel.app/)
- [ASCII Cosmos](https://ascii-cosmos.vercel.app/)

## Use The Template Folder

Read and recursively scan `templates/` before choosing references. Agents should inventory the folder contents, inspect the nested reference folders and files, find the closest match to the user's requested website, then create a new implementation tailored to the request.

If a selected template is runnable, enter that selected folder and use its own README or package scripts. Do not assume a specific template path before scanning.

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

## License

Monich is released under the MIT License. See `LICENSE`.

## Troubleshooting

- Missing package: run `npm install` inside the selected template folder.
- Blank page: check browser console and verify imports match package names.
- Scroll scene too short: increase the wrapper height to `350vh` or `500vh`.
- 3D model is blank: verify `three` is installed, the canvas container has a stable height, and WebGL is available in the browser.
- Motion too intense: confirm `prefers-reduced-motion` CSS and runtime checks are active.
- Assets missing: replace image references with CSS mockups instead of inventing files.
- Mobile overlap: collapse cards below the focal mockup and reduce sticky content density.
