---
name: monich
license: MIT
description: Build premium scroll-driven web pages and product showcases inspired by high-end app, hardware, and product interaction patterns. Use for Raycast-like, Apple-like, NVIDIA-like, RTX/GPU, SaaS, AI browser, parallax, sticky scroll, pinned reveal, Three.js GLB model, Web Audio sound effect, Motion React, GSAP ScrollTrigger, responsive accessibility, and performance-safe frontend requests.
---

# Monich Skill

## Purpose

This skill helps agents build premium scroll-driven websites with:

- sticky scenes
- scroll-linked animation
- parallax depth
- product/app reveals
- CSS mockups, imported assets, or Three.js GLB product models
- clean hero sections
- responsive layout
- reduced-motion support

## Use This Skill When

The user asks for:

- Raycast-like landing page
- Apple-like product showcase
- NVIDIA-like product reveal
- RTX/GPU showcase
- scroll parallax website
- sticky scroll website
- pinned scroll animation
- premium product page
- animated SaaS landing page
- AI app/browser landing page

## Do Not Copy Brands

Do not copy:

- logos
- names
- screenshots
- exact layout
- product claims
- marketing text
- brand assets

Only use general interaction patterns.

## Stack Selection

Default to React for generated websites unless the user explicitly asks for another stack. Prefer React + Vite for fast runnable demos and React + Next.js for routed, production-style, SEO-aware, or app-router projects. Other stacks such as Astro, SvelteKit, Vue, Nuxt, vanilla Web Components, or plain HTML/CSS/JS are allowed when the user requests them or the host project already uses them.

Use React + Motion when:

- simple parallax
- Raycast-like app landing
- floating cards
- UI panel reveal
- CSS app mockups or imported Three.js GLB product models
- scroll progress controls translate/scale/opacity

Use React + GSAP ScrollTrigger when:

- pinned scene
- Apple-like staged product reveal
- NVIDIA-like hardware reveal
- imported Three.js GLB hardware/product models
- scroll scrub timeline
- feature/spec reveal inside pinned section

Use plain HTML/CSS/JS when:

- the user explicitly requests no framework
- the user wants a one-file demo
- the target environment cannot run a framework

Use React + Next.js when:

- the user asks for Next.js
- the target project is already Next.js
- the page needs routing, metadata, server components, static generation, or production app structure

Use the web-template reference pack when:

- the user asks for broader website design systems
- the task needs page-type recipes such as landing pages, portfolios, decks, social cards, or content pages
- the agent needs additional visual style references beyond the three scroll-specific starter templates

## Required Scroll Architecture

Every generated page must include:

1. Normal hero section
2. Tall scroll wrapper, 250vh to 500vh
3. Sticky scene, 100vh
4. Layered visual elements:
   - background layer
   - atmosphere/grid/glow layer
   - midground UI/spec layer
   - main product/app/object layer
   - foreground text/accent layer
5. Next section after the showcase

## Motion Timeline

Map scroll progress like:

- 0.00 to 0.20: hero locks into scene
- 0.20 to 0.45: main product/app appears
- 0.45 to 0.70: features/spec cards enter
- 0.70 to 1.00: scene transitions out

## Visual Rules

- one clear focal point
- large typography
- dark premium background by default
- one accent color
- no random neon unless asked
- no particle soup
- no unreadable microtext
- no generic AI SaaS slop
- strong spacing and hierarchy
- mobile-first fallback

## Code Rules

- Animate transform and opacity.
- Avoid top, left, width, height, margin, padding animation.
- Include prefers-reduced-motion.
- Default to React components for generated websites, but adapt to Next.js, Astro, SvelteKit, Vue, Nuxt, or plain HTML/CSS/JS when requested or when the existing project requires it.
- Match visible page copy to the language the user spoke. If the source template contains Chinese but the user writes in English or Indonesian, rewrite headings, labels, CTAs, alt text, and microcopy into that user language.
- Set document language correctly, such as `<html lang="en">`, `<html lang="id">`, or the equivalent framework metadata.
- Use CSS-only mockups when no assets are provided.
- Use user-provided `.glb`, `.gltf`, image, or video assets when available.
- Use CSS-only mockups when no assets are available.
- Do not invent missing external assets or copy real brand assets.
- No missing image imports.
- No unused packages.
- No fake dependencies.
- Keep components readable.

## Bundled Templates

Copy or adapt templates from:

- `assets/templates/react-vite-motion/` for Motion React parallax, GLB product assembly, and optional Web Audio scroll sound.
- `assets/templates/react-vite-gsap/` for GSAP ScrollTrigger pinned timeline, GLB hardware reveal, and optional Web Audio scroll sound.
- `assets/templates/plain-html-css-js/` for explicit no-framework sticky/parallax demos.
- `assets/templates/web-template/` for the copied website design-system and page-template reference pack.

The `web-template` reference pack contains Chinese-first template material. Use its composition, rhythm, typography, and page-type guidance, but localize final generated content to the user's language unless the user requests Chinese.

## Output Requirements

When generating a website, include:

- file structure
- install command
- complete source code
- complete CSS
- run command
- customization notes
- accessibility/performance checklist

## Final Checklist

Before final answer, verify:

- sticky scene works
- scroll wrapper is tall enough
- layers are visible
- main focal object exists
- responsive CSS exists
- reduced-motion fallback exists
- no brand assets copied
- no missing imports
- app can run
