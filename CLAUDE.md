# Claude Code Project Memory

This repository contains a reusable portable skill named `monich`.

At the start of any task involving scroll websites, sticky product stories, parallax pages, pinned reveals, Raycast-like app pages, Apple-like product showcases, NVIDIA-like technical reveals, GPU showcases, AI browser landing pages, or premium animated SaaS pages, read:

`skills/monich/SKILL.md`

Use progressive disclosure, but always read and scan the available `templates/` folder before choosing references. Do not jump directly into any named template subfolder.

## Template Selection

- Default to React for generated websites unless the user asks for another stack.
- Start by listing or scanning `templates/` so the available template families are known.
- Choose references only after that scan.
- For Next.js requests or existing Next.js projects, adapt discovered template patterns into the app-router or pages-router structure already in the project.
- For Astro, SvelteKit, Vue, Nuxt, or other stacks, preserve the Monich scroll architecture and translate the component patterns into the requested framework.

## Working Rules

- Generate runnable code, not advice-only responses.
- Do not invent missing image assets.
- Do not copy brand assets, names, logos, screenshots, exact layouts, or marketing text.
- Prefer CSS mockups when no assets are provided.
- Learn and adapt from templates; do not copy-paste template code line-by-line into the generated project.
- Use templates to extract layout strategy, visual rhythm, motion timing, spacing, and interaction intent, then write fresh code for the target stack.
- Animate transform and opacity.
- Include responsive CSS and a reduced-motion fallback.
- Match visible copy to the language the user spoke. The web-template pack contains Chinese-first examples, but generated pages should not stay Chinese unless the user requests Chinese.
- Set `<html lang>` or framework metadata to the generated content language.
- Verify imports, package dependencies, and build commands before claiming completion.
