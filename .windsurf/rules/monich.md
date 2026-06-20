# Scroll Showcase Skill Rule

Use this rule when a user asks for Raycast-like, Apple-like, NVIDIA-like, GPU/RTX, sticky scroll, scroll parallax, pinned reveal, product storytelling, animated SaaS, app showcase, portfolio showcase, or AI browser landing pages.

## Skill Location

Read `skills/monich/SKILL.md` before implementing.

## Template Locations

Read and scan the whole `templates/` directory before choosing references. Build an inventory from the folder contents, then choose the smallest relevant reference set.

## Implementation Rules

- Generate runnable code, not advice only.
- Default to React for generated websites.
- Use React + Vite for fast runnable demos.
- Use React + Next.js when the user asks for Next.js or the existing project uses it.
- Adapt to Astro, SvelteKit, Vue, Nuxt, or another framework when requested.
- Use the stack requested by the user, the existing project, or the template scan.
- Use semantic HTML and readable component names.
- Use sticky sections with tall wrappers from 250vh to 500vh.
- Include one clear focal app/product/object mockup.
- Use layered depth: background, atmosphere/grid, midground cards/specs, focal object, foreground text.
- Prefer clean dark UI with one accent color unless the user asks otherwise.
- Prefer CSS-only mockups when assets are missing.
- Do not invent image imports.
- Do not copy real brand assets, names, screenshots, logos, claims, exact layouts, or marketing text.
- Learn and adapt from templates; do not copy-paste a template codebase or large template code blocks.
- Recreate the useful layout, motion, spacing, and typography ideas as fresh code in the target stack.
- Match visible copy to the language the user spoke.
- If a web-template reference contains Chinese, rewrite headings, labels, CTAs, alt text, and microcopy into the user's language unless Chinese was requested.
- Set `<html lang>` or framework metadata correctly.

## Motion And Performance

- Animate transform and opacity.
- Avoid animating top, left, width, height, margin, padding, or expensive filters during scroll.
- Use requestAnimationFrame for manual scroll progress in plain JS.
- Avoid scroll event spam.
- Use `will-change` sparingly on the animated focal elements only.

## Accessibility

- Include `prefers-reduced-motion`.
- Do not trap scrolling.
- Keep content readable without animation.
- Preserve focus visibility and semantic landmarks.
- Make the mobile layout usable without hover.
