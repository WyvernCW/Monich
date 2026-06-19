# Monich React Vite Motion Template

A React + Vite + Motion template for premium scroll-linked product showcases. It is best for smooth parallax, app/product storytelling, floating panels, GLB model reveals, and clean high-end landing pages.

## Language

Use the language requested by the user. If no language is specified, use concise English copy.

## Content

Adapt the hero, feature panels, and model labels to the user's product. Keep one dominant product or app mockup as the focal point.

## Features

- React + Vite project structure
- Motion React scroll transforms
- Sticky scroll showcase section
- Three.js GLB model support
- Mac Mini model loading path included
- Web Audio scroll sound effect
- Responsive layout and reduced-motion fallback
- No external brand assets required

## Tech Stack

- React
- Vite
- Motion React
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
- Scroll scene: `src/components/ScrollShowcase.jsx`
- GLB model component: `src/components/ThreeAppModel.jsx`
- Styles: `src/styles/monich.css`
- Model folder: `MiniMacModel/`

## Required Images/Videos

This template expects a local `.glb` model in `MiniMacModel/`. If the model is unavailable, agents should use a CSS fallback rather than inventing a missing external asset.

## Design

Use this template for Raycast-clean app pages, Apple-like product storytelling, AI browser showcases, SaaS product reveals, or any premium parallax page that does not need a full pinned GSAP timeline.

## Notes

Browser audio usually needs a user gesture before playback. Keep sound optional, visible, and respectful of reduced-motion preferences.
