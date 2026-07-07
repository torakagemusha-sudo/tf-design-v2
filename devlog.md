# Devlog

## 2026-05-03T00:00:00Z

Package metadata patch: MIT license text, compiled ESM build (`dist/`), `package.json` exports/keywords/files, JSDoc `@module` alignment to `@torakagemusha-sudo/tf-design-v2`, README accuracy (catalog vs exports, utilities count, tokens vs CSS variables, CommandButton `operation`), and validation via `npm run typecheck`, `npm run build`, `npm pack --dry-run`.

## 2026-05-03T04:14:56Z

Completed validation gates: fixed `CommandStatusIndicator` / `ToggleCommandButton` props vs `TorafirmaComponentBaseProps.state` via `Omit<..., 'state'>`, aligned remaining `@module` tags under `visualization-instrumentation` sub-bundles, re-ran `npm install`, `npm run typecheck`, `npm run build`, and verified all `package.json` export targets exist on disk before `npm pack --dry-run`.

## 2026-06-25T00:41:00Z

Rewrote README for clarity: added system overview (six operational models, layer stack), screenshots (`docs/screenshots/` — command cockpit, components, themes) captured from a static showcase via `capture.mjs`, streamlined quick start and export tables, and linked to full `docs/` guides.

## 2026-07-07T09:31:56Z

Security scan (at-rest vulnerability review). Identified 1 new HIGH finding: authentication brute-force lockout bypass in `createMachine.ts` — the transition map uses a flat `${from}::${event}` key that silently overwrites guard-differentiated transitions, breaking the `authorityLifecycleMachine`'s auth failure counter and lockout mechanism. Reported to Slack (both DM and #general channels) and updated automation memory. All 7 previously reported findings remain active at the same commit.
