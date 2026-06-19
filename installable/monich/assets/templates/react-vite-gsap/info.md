# Monich React Vite GSAP Template

A React + Vite + GSAP ScrollTrigger template for pinned product timelines and staged hardware-style reveals. It is best for Apple-like or GPU-like scroll stories where a scene pins while product details enter in sequence.

## Language

Use the language requested by the user. If no language is specified, use concise English copy.

## Content

Replace the fictional hardware copy with the user's product, object, specs, and CTA. Do not use real brand names, claims, screenshots, or assets unless the user provides them.

## Features

- React + Vite project structure
- GSAP ScrollTrigger pinned timeline
- Three.js GLB model support
- RTX-style model loading path included
- Staged spec panels and final CTA reveal
- Web Audio scroll sound effect
- Responsive layout and reduced-motion fallback
- Performance-safe transform and opacity animation

## Tech Stack

- React
- Vite
- GSAP ScrollTrigger
- Three.js

## Quick Start

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

## Configuration

- Main page: `src/App.jsx`
- Pinned scene: `src/components/PinnedShowcase.jsx`
- GLB model component: `src/components/ThreeHardwareModel.jsx`
- Styles: `src/styles/monich-gsap.css`
- Model folder: `RTX5090model/`

## Required Images/Videos

This template expects local model files in `RTX5090model/`, including the `.glb` and optional texture `.png` provided by the user. Do not fetch or invent brand assets.

## Design

Use this template for technical product reveals, GPU-style pages, hardware showcases, and any scroll story that benefits from a pinned scrubbed timeline.

## Notes

Keep the pinned section tall enough for the timeline, test mobile layout separately, and always include a reduced-motion path.
