# Birthday Site — PRD

## Problem Statement
> Create a fun birthday website add a section which has things i want for my birthday my birthday day and a timer for that day
> **v2**: Full party theme (poppers, confetti, streamers), RSVP, shareable link, expanded wishlist (penthouse, car/cash, Koh Samui vacation + shopping, Tomorrowland tix), Brokee Clause (dance performance for the broke ones, 1 gift / 1 person, no empty-handers). Loves thistle.

## Vibe / Design
- Girlypop + party core: hot pink + thistle (`#9b6cb5`) + lilac accents, cream/white backdrop
- Fonts: Caveat Brush (display) + Fredoka (hero) + Pacifico (script) + Quicksand (body)
- Animations: canvas-confetti bursts, CSS rise/wiggle/sparkle/heartbeat, streamers, marquee

## Architecture
- **Backend** (FastAPI, `/app/backend/server.py`):
  - `POST /api/rsvp` (validates name + gift; rejects empty-handers)
  - `GET /api/rsvp` (list — newest first)
  - `GET /api/rsvp/stats` (totals + claimed gifts)
  - MongoDB collection: `rsvps`
- **Frontend** (`/app/frontend/src/App.js`):
  - Sections: Hero w/ streamers, Marquee, Countdown, Brokee Clause, Wishlist, RSVP + Guest Wall, Footer
  - `canvas-confetti` for poppers + side bursts on load, gift claim, RSVP submit, share
  - `navigator.share` / clipboard fallback for share button
  - Claimed-gift badge reads from `/api/rsvp/stats`; dropdown disables claimed items (1 gift / 1 person)

## Implemented
### 2026-04-22 (v1)
- Hero, countdown, static wishlist (6 items), polaroid save-the-date
### 2026-04-22 (v2 — party)
- Streamers on hero, 3-rule "Brokee Clause" panel, rules marquee
- Expanded wishlist: sea-facing penthouse, car (cash bundle), Koh Samui vacation, Koh Samui shopping $$$, Tomorrowland tickets + original 6
- Confetti on page load, "pop the confetti" CTA, claim clicks, RSVP submit, share
- RSVP form (name, attending yes/maybe/no, gift dropdown w/ claimed state, brokee dance input, message) → MongoDB
- Guest Wall showing recent RSVPs
- Share button: Web Share API + clipboard fallback
- Thistle accents across headers, gradients, rules section

## Backlog
- **P2**: Admin page to view all RSVPs + export CSV
- **P2**: OG image / meta tags for shareable preview
- **P2**: Brokee dance video upload (fal.ai or Cloudinary)
- **P2**: Countdown push notification / email reminder
- **P3**: Theme-switch (girlypop ↔ neon party)

## Next Tasks
- Share with guests. If they start flooding in, add admin view + OG image.
