# Brand Architecture & Design Specifications: 7 Rings Katsina

A premier arts, sports, and entertainment hub based in Katsina, Nigeria, dedicating resources to youth empowerment, community growth, and organized Futsal leagues.

---

## 🎨 Design Philosophy: "Luxury Urban"
The visual identity is targeted towards Katsina's dynamic youth demographic. It projects cinematic weight, clean alignment, and athletic speed by using deep charcoal canvases, vibrant laser cyan markers, and subtle gold trophies.

### Color Tokens
*   **Deep Base Black:** `#050505` (Main contrast buffer)
*   **Tactical Gray:** `#0A0A0A` / `#0C0C0C` (Grid borders & input boxes)
*   **Neon Cyan Laser:** `#00E5FF` (Action triggers, dynamic clocks, active outlines)
*   **Imperial Gold Accent:** `#FFD700` (Hall of fame medals, trophies, timelines)
*   **Muted White Text:** `#E0E0E0` / `#FFFFFF` (High readability, WCAG AA compliant)

### Typography
*   **Display Header:** `Space Grotesk` (Technical, premium, bold tracking)
*   **Copy Sans:** `Inter` (Legible, neutral layout)
*   **Data Code:** `JetBrains Mono` (Scores, dates, form tickers, coordinates)

---

## 📂 Project Architecture Tree

The system is built on a modular React 19 architecture using Vite, TypeScript, and Tailwind CSS v4:

```
/
├── metadata.json           # Tailored app identity tags and permissions
├── Design.md               # [THIS FILE] Architecture blueprints
├── package.json            # Node modules & execution pipeline configurations
├── vite.config.ts          # Vite asset pipeline & HMR watch gates
├── src/
│   ├── main.tsx            # Main JS entry setup
│   ├── index.css           # Fonts imports, Tailwind layers, glow utilities
│   ├── App.tsx             # Unified layout assembly
│   ├── types.ts            # Shared TypeScript schema structures
│   ├── data/
│   │   ├── stats.ts        # Numeric footprint gauges
│   │   ├── teams.ts        # Standings, Fixtures, Player stats, Hall of Fame
│   │   └── events.ts       # Sallah fiestas, exhibitions, gallery items
│   └── components/
│       ├── Navbar.tsx      # Backdrop glass blur navbar & mobile navigation
│       ├── Hero.tsx        # flowing CSS mesh grid, particle nodes, live news ticker
│       ├── Stats.tsx       # Live countup gauges trigger on scroll visibility
│       ├── About.tsx       # Timeline metrics & core biographies
│       ├── SportsHub.tsx   # Toggled standings/scorers, team registration form
│       ├── Events.tsx      # Main event grids, elite arenas, past recaps
│       ├── Gallery.tsx     # Filtered media masonry, escape-adaptive Lightbox
│       ├── Contact.tsx     # GPS Address blocks, verification forms, Katsina iFrame
│       └── Footer.tsx      # Quick links & social outpost handles
```

---

## ⚡ Interactions & Animations Specs

1.  **Count-Up Stats:**
    *   Initiates automatically under visibility detectors when scrolled into view.
    *   Quadratic easing calculates values smoothly over 2000ms duration.
2.  **Laser-Light Particles:**
    *   Float from base to viewport through non-blocking CSS standard keyframes.
3.  **Active Link Underline:**
    *   Tracks current vertical position; Framer Motion spring updates highlight positions.
4.  **Escape-Adaptive Lightbox Selector:**
    *   Clicking an archive tile loads full-screen modal viewport focus.
    *   Supports keyboard standard navigation: esc (dismiss), left/right arrows (navigate).
5.  **Secure Verification Forms:**
    *   Double inputs validation. Shows localized feedback, with success toast alerts.
