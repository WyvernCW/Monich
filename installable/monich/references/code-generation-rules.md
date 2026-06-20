# Code Generation Rules

## React Component Rules

- Default to React for generated websites unless the user asks for a different stack.
- Use React + Vite for fast runnable demos.
- Use React + Next.js when the user asks for Next.js, the existing project uses Next.js, or the page needs routing, metadata, static generation, or app-router structure.
- Adapt these patterns to Astro, SvelteKit, Vue, Nuxt, Web Components, or another frontend stack when requested.
- Use plain HTML/CSS/JS when requested or when discovered templates make it the best fit.
- Read and recursively scan `assets/templates/` before choosing references.
- Read actual `.html`, `.css`, `.js`, `.jsx`, `.tsx`, `.md`, `.json`, and design-token files in every template/reference folder.
- Use templates to learn structure and design intent, not as paste-in source.
- Recreate patterns as fresh components, data, class names, CSS variables, and copy.
- Keep the showcase in one readable component.
- Use refs for scroll targets and pinned sections.
- Use CSS classes for layout and visual layers.
- Do not inline large style objects unless values are animated.
- Keep generated data arrays small and local.
- Avoid missing imports and unused packages.
- Put Three.js scene setup in a focused component with disposal cleanup.
- Lazy-load Three.js with `await import("three")` inside the 3D component when practical.

## CSS Rules

- Define color tokens with CSS custom properties.
- Use semantic section class names.
- Use stable dimensions with `min-height`, `aspect-ratio`, and responsive constraints.
- Use `position: sticky; top: 0; min-height: 100vh` for sticky scenes.
- Use `transform`, `opacity`, and CSS variables for motion.
- Avoid animating layout properties during scroll.
- Include responsive breakpoints for mobile and tablet.
- Include `@media (prefers-reduced-motion: reduce)`.

## Dependency Rules

- Use only dependencies required by the selected implementation.
- Do not add dependencies that are not used.
- Do not use external images unless the user provides them.

## Language Rules

- Match visible copy to the language the user spoke unless the user explicitly requests another language.
- The copied `web-template` pack contains Chinese-first material. Treat it as design reference, then rewrite headings, labels, CTAs, alt text, form placeholders, and microcopy into the user's language.
- Set `<html lang>` or framework metadata to the generated content language.
- Load Chinese/CJK typography references only when the user asks for Chinese/CJK output or provides substantial Chinese/CJK content.

## No Broken Assets

If assets are missing:

- use CSS-only app windows
- use procedural Three.js geometry when the stack includes Three.js
- use generated gradients with restraint
- use border/grid patterns
- use text/spec panels
- use simple product slabs

Never import placeholder image files that do not exist.

## Template Selection

- Always start by reading and recursively scanning the available `assets/templates/` folder.
- If present, scan every folder and file inside `assets/templates/web-template/design-templates/`, `assets/templates/web-template/horizontal-craft/`, and `assets/templates/web-template/design-systems/`.
- Do not rely only on `SKILL.md`, `README.md`, `info.md`, or folder names. Read the actual implementation/reference files, especially `.html` files.
- Build an inventory of template names, metadata, visual style, page type, layout pattern, motion pattern, component language, color system, typography, and stack.
- Choose the closest matching template or reference set only after the inventory exists.
- For broad or style-sensitive requests, present 2-4 closest template references to the user with a short rationale before implementation.

Do not copy a template codebase into the generated project. Read the selected matching reference files deeply, identify the reusable ideas, and write new code that fits the user's requested stack, content, and language.

Do not default to starter-template visuals when a closer `web-template` reference exists. Translate the selected reference into React, Next.js, or the requested stack while preserving its layout, composition, typography, palette logic, and interaction feel.
