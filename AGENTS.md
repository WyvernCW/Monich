# AGENTS.md

## Skill Registry

This repo contains portable AI coding-agent skills.

When the user asks for scroll-driven landing pages, parallax websites, pinned product showcases, Apple-like product pages, NVIDIA-like reveal pages, or Raycast-like app landing pages, use:

`skills/monich/SKILL.md`

## Scroll Showcase Skill Triggers

Use the Monich skill for requests containing concepts like:

- Raycast-style website
- Apple-style showcase
- NVIDIA-style showcase
- RTX/GPU reveal page
- scroll parallax
- sticky scroll
- pinned reveal
- product storytelling
- premium landing page
- animated SaaS landing page
- app showcase
- AI browser landing page

## Required Workflow

1. Read `skills/monich/SKILL.md`.
2. Read and recursively scan the whole `templates/` folder before choosing references. Do not stop at top-level README files.
3. If present, scan every folder and file inside `templates/web-template/design-templates/`, `templates/web-template/horizontal-craft/`, and `templates/web-template/design-systems/`.
4. Build an inventory of template names, metadata, visual style, page type, layout pattern, motion pattern, and stack.
5. Choose the template or reference set most similar to what the user wants to build.
6. Learn from selected references without copying their code line-by-line.
5. Generate complete runnable code.
6. Include responsive CSS.
7. Include reduced-motion fallback.
8. Avoid broken imports.
9. Avoid copying Raycast, NVIDIA, Apple, or any real brand.
10. Match visible copy to the language the user spoke.

## Coding Rules

- Animate transform and opacity by default.
- Avoid animating top, left, width, height, margin, padding.
- Use sticky scenes with tall scroll wrappers.
- Use layered depth: background, midground, product/object, text, foreground accents.
- Keep one main focal object.
- Prefer clean dark UI unless user asks otherwise.
- Do not create generic neon AI SaaS slop.
- Do not use external assets unless the user provides them.
- Use CSS-only mockups when assets are missing.
- Default to React for generated websites.
- Adapt to Next.js, Astro, SvelteKit, Vue, Nuxt, or plain HTML/CSS/JS when requested.
- Use the recursive template scan as references for layout, motion rhythm, typography scale, spacing, and component patterns.
- Do not copy-paste a template codebase or large code blocks into the user's project.
- Rebuild the page in the target stack with fresh component names, content, data, tokens, and CSS that fit the user request.
- If a copied template contains Chinese, translate or rewrite all visible UI copy into the user's language unless Chinese was requested.
- Set the page language correctly with `<html lang>` or framework metadata.

## Final Quality Check

Before finishing, verify:

- The project runs.
- The scroll effect works.
- The sticky section has enough scroll height.
- The product/app mockup is visible.
- The page works on mobile.
- Reduced motion is supported.
- No brand assets were copied.
- No unused dependency was installed.
