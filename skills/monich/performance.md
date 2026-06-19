# Performance

Scroll-driven pages can become expensive quickly. Keep animation work predictable.

## Animation Rules

- Animate `transform` and `opacity`.
- Avoid animating `top`, `left`, `width`, `height`, `margin`, `padding`, or layout-heavy filters.
- Use `will-change` only on elements that are actively animated.
- Avoid unbounded particle systems.
- Avoid scroll event spam.
- Prefer Motion/GSAP scroll progress tooling or a single requestAnimationFrame loop.
- Lazy-load Three.js so it is split from the initial app chunk.
- Dispose Three.js geometries, materials, renderers, observers, and animation frames on unmount.

## Assets

- Do not require external assets by default.
- Use CSS mockups when no assets are provided.
- Compress real images if the user provides them.
- Use `aspect-ratio` to avoid layout shift.

## DOM And CSS

- Keep layers purposeful and limited.
- Avoid thousands of DOM nodes.
- Use simple selectors.
- Keep fixed/sticky elements bounded to the showcase.
- Avoid expensive backdrop filters in large full-screen animated layers.

## Verification

Before shipping:

- run the build
- inspect console errors
- verify no missing imports
- verify the canvas is nonblank in a real browser
- check mobile layout
- check reduced-motion mode
