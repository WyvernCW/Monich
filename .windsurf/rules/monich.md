# Scroll Showcase Skill Rule

Use this rule when a user asks for Raycast-like, Apple-like, NVIDIA-like, GPU/RTX, sticky scroll, scroll parallax, pinned reveal, product storytelling, animated SaaS, app showcase, portfolio showcase, or AI browser landing pages.

## Skill Location

Read `skills/monich/SKILL.md` before implementing.

## Template Locations

- Simple parallax and app UI reveal: `templates/react-vite-motion/`
- Pinned timeline and staged product reveal: `templates/react-vite-gsap/`
- No framework or one-file demo: `templates/plain-html-css-js/`

## Implementation Rules

- Generate runnable code, not advice only.
- Use semantic HTML and readable component names.
- Use sticky sections with tall wrappers from 250vh to 500vh.
- Include one clear focal app/product/object mockup.
- Use layered depth: background, atmosphere/grid, midground cards/specs, focal object, foreground text.
- Prefer clean dark UI with one accent color unless the user asks otherwise.
- Prefer CSS-only mockups when assets are missing.
- Do not invent image imports.
- Do not copy real brand assets, names, screenshots, logos, claims, exact layouts, or marketing text.

## Motion And Performance

- Animate transform and opacity.
- Avoid animating top, left, width, height, margin, padding, or expensive filters during scroll.
- Use Motion React for simple scroll progress transforms.
- Use GSAP ScrollTrigger for pinned scrub timelines.
- Use requestAnimationFrame for manual scroll progress in plain JS.
- Avoid scroll event spam.
- Use `will-change` sparingly on the animated focal elements only.

## Accessibility

- Include `prefers-reduced-motion`.
- Do not trap scrolling.
- Keep content readable without animation.
- Preserve focus visibility and semantic landmarks.
- Make the mobile layout usable without hover.

