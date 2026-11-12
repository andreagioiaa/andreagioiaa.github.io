# andreagioiaa.github.io

Portfolio personale di Andrea Gioia — IoT, software engineering e AI agentica.

## Stack

- **Vite + React 19**: single page con sezioni ancorate (`#progetti`, `#competenze`, …).
- **GSAP + ScrollTrigger**: animazioni d'ingresso, reveal allo scroll, parallax e barra di avanzamento.
- **Lenis**: smooth scroll globale, guidato dal ticker di GSAP (un solo `requestAnimationFrame`).
- **React Bits**: `SplitText`, `ShinyText`, `DotGrid`, `Magnet`, `SpotlightCard`, `LogoLoop` in `src/components/reactbits/`
  (licenza MIT + Commons Clause, vedi `LICENSE.md` nella cartella).

Performance e accessibilità: si animano solo `transform`/`opacity`; con `prefers-reduced-motion: reduce`
Lenis non parte, i reveal GSAP sono disattivati (`gsap.matchMedia`) e i componenti React Bits rispettano la stessa preferenza.

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

## Contenuti

- Progetti: `src/data/projects.js` (formato Problema → Soluzione architetturale → Tech stack)
- Loghi delle competenze (Simple Icons): `src/data/logos.js`
- Soft skill e AI workflows: `src/data/skills.js`
- R&D personale (testi e galleria): `src/components/RnD.jsx`, foto in `public/img/*.webp`
- Le vecchie URL (`chi_sono.html`, `projects.html`, `red/*.html`, …) sono redirect alle sezioni della home.

## Deploy

Il workflow `.github/workflows/deploy.yml` builda e pubblica `dist/` su GitHub Pages a ogni push su `main`.
Prerequisito (una tantum): **Settings → Pages → Build and deployment → Source: GitHub Actions**.
