# Oblivion Census

![Status](https://img.shields.io/badge/Status-Experimental-8A2BE2?style=flat-square)
![Made with Next.js](https://img.shields.io/badge/Next.js-powered-black?style=flat-square)
![License MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)

A reference and progress-tracking tool for NPCs in *The Elder Scrolls IV: Oblivion*.
Source for https://census.oblivion.tools

## Highlights

- Browse and filter ~910 hand-curated NPCs from the base game and all DLC by race, gender, faction, city, role, and base responsibility score.
- Track quest completion and unique item acquisition per NPC — progress persists in your browser across sessions.
- Full trainer reference for all 21 skills across Novice, Journeyman, and Master tiers, including prerequisites and max trainable levels.
- NPC detail view with location breadcrumbs, daily routine, UESP wiki links, and a direct gamemap link for each character.
- UOP-aware quest data that surfaces both vanilla and Unofficial Oblivion Patch-corrected level thresholds for leveled rewards.
- Deep-linkable NPC URLs (`/npc/[id]`) for sharing or bookmarking specific characters.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **MUI v6** for UI components, **Tailwind CSS** for layout utilities
- **Zustand** for client-side state and localStorage persistence

## Getting Started

### Development

1. Ensure `docker`, `docker compose`, and `make` are installed.
2. Launch the development stack:
   ```bash
   make dev
   ```
3. Navigate to [http://localhost:3000](http://localhost:3000) and start exploring.

### Deployment

To build the production image and boot the server:

```bash
make prod-build
```

Then visit [http://localhost:3000](http://localhost:3000).

## Configuration

Adjust `.env` to override defaults for local runs.

| Name             | Purpose                |
| ---------------- | ---------------------- |
| `CONTAINER_NAME` | Docker container name  |
| `PORT`           | Port server listens to |

## Helpful Commands

- `make stop` -- halt running containers.
- `make logs` -- tail application logs for quick debugging.

## Legal

- **Trademarks** -- *The Elder Scrolls*, *Oblivion*, and related marks are the property of Bethesda Softworks/ZeniMax. References here are purely descriptive; this project is independent, non-commercial, and not endorsed by the rights holders.
- **Copyright** -- All original code in this repository is released under the MIT License (see `LICENSE`). External assets retain their original ownership and are either used with permission or under their respective licenses.
- **Community transparency** -- Contributions occur publicly through issues, pull requests, and commit history so authorship remains attributable. Please flag any content concerns and they will be reviewed or removed to keep the project respectful of both community norms and IP boundaries.
