# Opportunity — Three-Domain MMORPG Prototype

[Master Blueprint](docs/MASTER_BLUEPRINT.md)

## Run

Requires internet access for Three.js CDN. Serve from the repository root:

```bash
npx http-server . -p 8080 -c-1
```

Open http://localhost:8080. Use WASD/arrows to move, E to interact, drag mouse to orbit, and scroll to zoom. The browser prototype is single-player; wallet and progression save locally.

## Test

```bash
npm test
```

The deterministic economy module is testable but **not** an authoritative multiplayer ledger. See the blueprint for target architecture, visual parity requirements, and acceptance criteria.
