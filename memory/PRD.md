# Birthday Site — PRD

## Problem Statement
> Create a fun birthday website add a section which has things i want for my birthday my birthday day and a timer for that day

## User Inputs
- Birthday date: **June 23, 2026**
- Heading: "It's the bestest, sweetest human in the world's birthday"
- Vibe: Girlypop / bows / lipgloss / diva core (playful + colorful)
- Wishlist: Pre-filled, editable later in code
- Wishlist items: Claude subscription, Copy.ai (ANNUAL), new bag, New Balance casuals, sparkly earrings, Bunty Mahajan cake

## Architecture
- Pure frontend (React 19 + Tailwind + shadcn/ui base). No backend required.
- Files touched:
  - `/app/frontend/src/App.js` — single-page layout (hero, countdown, wishlist, footer)
  - `/app/frontend/src/index.css` — girlypop palette, fonts (Caveat Brush / Fredoka / Pacifico / Quicksand), animations, stickers
  - `/app/frontend/src/App.css` — reset
  - `/app/frontend/src/components/Bow.jsx` — custom SVG bow/sparkle/heart

## Implemented (2026-04-22)
- Hero with polaroid save-the-date card, wiggle bows, gradient text
- Live countdown (days / hrs / min / sec) auto-ticking to 2026-06-23
- 6 wishlist cards with sticker bows, holo tags, "I'll get this" buttons + sonner toast
- Floating bow / sparkle / heart decor rising in background
- "It's today!" celebration state when the timer hits zero
- Responsive 1 → 2 → 3 column wishlist grid, mobile hero
- Footer "see you on June 23" CTA card

## Backlog
- **P1**: Optional backend wishlist CRUD (currently hard-coded)
- **P2**: RSVP form / guest book persisted to MongoDB
- **P2**: Shareable invite link with OG image
- **P2**: Confetti burst on birthday day / when clicking "I'll get this"
- **P2**: Add a photo upload slot for the polaroid hero

## Next Tasks
- Ship to the birthday girl, collect feedback, then layer in RSVP or editable wishlist if desired.
