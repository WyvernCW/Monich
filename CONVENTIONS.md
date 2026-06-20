# Coding Conventions for Scroll Showcase Skill

When building scroll showcase websites:

- Use semantic HTML.
- Default to React unless the user asks otherwise.
- Use React + Vite for fast runnable demos.
- Use React + Next.js when the user asks for Next.js or the existing project uses it.
- Use Astro, SvelteKit, Vue, Nuxt, or other stacks when requested.
- Use plain HTML/CSS/JS only for no-framework or one-file requests.
- Use Motion for simple parallax.
- Use GSAP ScrollTrigger for pinned timeline.
- Use transform/opacity animations.
- Include reduced-motion fallback.
- Keep CSS responsive.
- Avoid copying brand assets.
- Avoid overanimated neon UI.
- Prefer CSS mockups over missing images.
- Scan `templates/` before choosing a reference, including `templates/web-template/`.
- Learn from templates; do not copy-paste full template code into the generated project.
- Adapt layout, interaction, color logic, typography, and motion into fresh code for the target stack.
- Match visible page text to the language the user spoke.
- Do not keep Chinese template copy unless the user asked for Chinese.

If the task mentions Raycast, NVIDIA, Apple, sticky scroll, parallax, pinned reveal, or product showcase:

- Read `skills/monich/SKILL.md`.
- Scan `templates/`, including `templates/web-template/`.
- Use the closest template as a reference, then generate new runnable code.
