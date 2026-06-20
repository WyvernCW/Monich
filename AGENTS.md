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
2. Pick the correct implementation path:
   - React by default
   - React + Motion for simple parallax
   - React + GSAP ScrollTrigger for pinned timeline
   - React + Next.js if the user asks for Next.js or the project already uses it
   - plain HTML/CSS/JS only when explicit no-framework or one-file output is requested
   - other frameworks when the user or existing project requires them
3. Use the matching template from `templates/`.
4. Generate complete runnable code.
5. Include responsive CSS.
6. Include reduced-motion fallback.
7. Avoid broken imports.
8. Avoid copying Raycast, NVIDIA, Apple, or any real brand.
9. Match visible copy to the language the user spoke.

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
