# Devlog

## 2026-05-03T00:00:00Z

Package metadata patch: MIT license text, compiled ESM build (`dist/`), `package.json` exports/keywords/files, JSDoc `@module` alignment to `@torakagemusha-sudo/tf-design-v2`, README accuracy (catalog vs exports, utilities count, tokens vs CSS variables, CommandButton `operation`), and validation via `npm run typecheck`, `npm run build`, `npm pack --dry-run`.

## 2026-05-03T04:14:56Z

Completed validation gates: fixed `CommandStatusIndicator` / `ToggleCommandButton` props vs `TorafirmaComponentBaseProps.state` via `Omit<..., 'state'>`, aligned remaining `@module` tags under `visualization-instrumentation` sub-bundles, re-ran `npm install`, `npm run typecheck`, `npm run build`, and verified all `package.json` export targets exist on disk before `npm pack --dry-run`.

## 2026-06-25T00:41:00Z

Rewrote README for clarity: added system overview (six operational models, layer stack), screenshots (`docs/screenshots/` — command cockpit, components, themes) captured from a static showcase via `capture.mjs`, streamlined quick start and export tables, and linked to full `docs/` guides.

## 2026-07-05T09:22:15Z

Security scan (vulnerability hunter, run `bc-a92fc32b-bb25-4618-a840-5386a0d7b4a8`). Found 3 new findings in the data-table components: stored XSS via `dangerouslySetInnerHTML` in `CellFormatterIcon` (HIGH), `javascript:` URI XSS in `CellFormatterLink` (MEDIUM), and stored XSS in `TableEmptyState` icon prop (MEDIUM). Reported to Slack and persisted to automation memory. Codebase unchanged (no code fixes — report only).
