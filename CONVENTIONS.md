# Coding Conventions for Scroll Showcase Skill

When building scroll showcase websites:

- Use semantic HTML.
- Default to React unless the user asks otherwise.
- Use React + Vite for fast runnable demos.
- Use React + Next.js when the user asks for Next.js or the existing project uses it.
- Use Astro, SvelteKit, Vue, Nuxt, or other stacks when requested.
- Use the stack requested by the user, the existing project, or the template scan.
- Use transform/opacity animations.
- Include reduced-motion fallback.
- Keep CSS responsive.
- Avoid copying brand assets.
- Avoid overanimated neon UI.
- Prefer CSS mockups over missing images.
- Read and recursively scan the whole `templates/` folder before choosing references.
- If present, scan every folder and file inside `templates/web-template/design-templates/`, `templates/web-template/horizontal-craft/`, and `templates/web-template/design-systems/`.
- Choose the closest matching template or reference set based on the user's requested website.
- Learn from templates; do not copy-paste full template code into the generated project.
- Adapt layout, interaction, color logic, typography, and motion into fresh code for the target stack.
- Match visible page text to the language the user spoke.
- Do not keep Chinese template copy unless the user asked for Chinese.

If the task mentions Raycast, NVIDIA, Apple, sticky scroll, parallax, pinned reveal, or product showcase:

- Read `skills/monich/SKILL.md`.
- Read and recursively scan the whole `templates/` folder.
- Use the closest template as a reference, then generate new runnable code.
