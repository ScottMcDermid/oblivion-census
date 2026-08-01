# Oblivion Wayshrine

![Status](https://img.shields.io/badge/Status-Experimental-8A2BE2?style=flat-square)
![Made with Next.js](https://img.shields.io/badge/Next.js-powered-black?style=flat-square)
![License MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)

Track your progress through every discoverable location in The Elder Scrolls IV: Oblivion.
Source for https://wayshrine.oblivion.tools

## Highlights

- Browse and filter all discoverable locations by type (cities, forts, caves, ruins, etc.)
- Mark locations as discovered or cleared on your journey to 100% completion.
- Quick-reference info for quests, skill books, merchants, and unique items at each location.
- Progress tracking with totals for discovered and cleared locations.

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
