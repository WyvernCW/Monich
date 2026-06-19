# Animation Patterns

## Simple Parallax Pattern

Use Motion React or CSS variables to map scroll progress to transform and opacity values. Keep a tall wrapper around `350vh` and a `position: sticky` scene at `100vh`.

Typical mapping:

- background moves slowly upward
- app/product mockup rises and scales into focus
- title fades or slides away as the product appears
- feature cards enter from the sides or bottom
- final copy remains readable at the end

## Pinned Product Timeline

Use GSAP ScrollTrigger when a section must stay pinned while a timeline scrubs through staged reveals.

Timeline beats:

1. Headline visible, product dimmed.
2. Product enters, scales, and rotates subtly.
3. Headline exits or compresses.
4. Spec cards enter in sequence.
5. Background grid shifts using transform.
6. Final CTA appears.

## App UI Stack

Layer CSS-only interface panels to imply product depth:

- main app window
- command palette overlay
- side rail or toolbar
- data cards
- notification chip
- floating integration cards

Animate each layer at a slightly different rate for depth.

## GPU/Hardware Reveal

Create a fictional hardware card or product slab using CSS. Use technical grids, edge lines, cooling fins, spec plates, and restrained glow. Avoid real vendor marks.

Recommended motion:

- product rises from shadow
- slight rotateX or rotateY for dimensionality
- edge light intensifies through opacity
- spec panels slide in after the product is stable
- final CTA fades in after specs

## Hero-To-Showcase Transition

Start with a normal hero. The next section should be a tall scroll wrapper. The sticky showcase should feel like the hero is handing attention to the focal product.

Keep the hero outside the pinned area so the page remains understandable with reduced motion.

