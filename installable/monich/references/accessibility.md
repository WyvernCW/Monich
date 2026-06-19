# Accessibility

Scroll showcase pages must remain understandable and usable without motion.

## Required Practices

- Use semantic landmarks: `header`, `main`, `section`, `footer`.
- Keep headings in logical order.
- Ensure text remains readable at mobile widths.
- Keep focus outlines visible.
- Do not create scroll traps.
- Do not hide essential content behind animation states.
- Provide a `prefers-reduced-motion` fallback.
- Avoid flashing, rapid pulses, or high-frequency effects.
- Ensure mobile users can access all content without hover.

## Reduced Motion

For CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

For JS-driven scroll effects:

- detect `window.matchMedia("(prefers-reduced-motion: reduce)")`
- skip scroll listeners or scrub timelines when reduced motion is true
- render the final readable state

## Readability

- Normal text contrast should meet WCAG AA.
- Avoid tiny decorative text as meaningful content.
- Avoid placing long copy on moving layers.
- Keep product mockups decorative with accessible text nearby.

