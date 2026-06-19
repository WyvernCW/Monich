# Code Generation Rules

## React Component Rules

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

- Motion template uses `motion` and imports from `motion/react`.
- GSAP template uses `gsap` and `gsap/ScrollTrigger`.
- React 3D templates use `three` for procedural models.
- Plain template uses no external dependencies.
- Do not add dependencies that are not used.
- Do not use external images unless the user provides them.

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

- `templates/react-vite-motion/`: simple parallax, app/SaaS pages, command palette, floating cards.
- `templates/react-vite-gsap/`: pinned timeline, hardware reveal, Apple/NVIDIA-like staged product stories.
- `templates/plain-html-css-js/`: no framework, one-file demo, simple portable example.
