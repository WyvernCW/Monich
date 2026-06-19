# Monich Plain HTML/CSS/JS Template

A one-file no-framework scroll showcase for agents that need a portable product-story page without React, GSAP, Motion, or external assets. It uses a sticky assembly scene, CSS-only object parts, and a warm editorial product-studio visual direction.

## Language

Use the language requested by the user. If no language is specified, use concise English copy.

## Content

Replace the default Monich copy with the user's actual product, object, app, or portfolio story. Keep one clear focal object and avoid generic SaaS filler text.

## Features

- Single `index.html` file with internal CSS and JavaScript
- Sticky scroll section with manual `requestAnimationFrame` progress
- CSS-only exploded object that attaches during scroll
- Warm editorial palette with paper, ink, walnut, moss, clay, and brass tokens
- Semantic HTML sections and accessible navigation
- Responsive mobile fallback
- `prefers-reduced-motion` support
- No external images, fonts, scripts, or dependencies

## Tech Stack

- HTML
- CSS custom properties
- Vanilla JavaScript
- `requestAnimationFrame`

## Quick Start

Open `index.html` directly in a browser.

## Configuration

- Edit color tokens in `:root`.
- Edit hero copy in the `.hero` section.
- Edit scroll behavior in the `updateProgress()` function.
- Edit the CSS-only object by changing `.device-*` parts.
- Keep animations on `transform` and `opacity`.

## Required Images/Videos

None. This template is intentionally asset-free.

## Design

The design is inspired by object assembly, editorial product photography, and warm studio-room palettes. It should feel crafted, physical, and calm rather than neon, glassy, or randomly futuristic.

## Notes

Use this template when a user asks for a no-framework scroll showcase, quick demo, static prototype, or portable HTML page. For GLB models or advanced pinned timelines, use the React templates instead.
