# Devlog

## 2026-05-03T00:00:00Z

Package metadata patch: MIT license text, compiled ESM build (`dist/`), `package.json` exports/keywords/files, JSDoc `@module` alignment to `@torakagemusha-sudo/tf-design-v2`, README accuracy (catalog vs exports, utilities count, tokens vs CSS variables, CommandButton `operation`), and validation via `npm run typecheck`, `npm run build`, `npm pack --dry-run`.

## 2026-05-03T04:14:56Z

Completed validation gates: fixed `CommandStatusIndicator` / `ToggleCommandButton` props vs `TorafirmaComponentBaseProps.state` via `Omit<..., 'state'>`, aligned remaining `@module` tags under `visualization-instrumentation` sub-bundles, re-ran `npm install`, `npm run typecheck`, `npm run build`, and verified all `package.json` export targets exist on disk before `npm pack --dry-run`.

## 2026-06-25T00:41:00Z

Rewrote README for clarity: added system overview (six operational models, layer stack), screenshots (`docs/screenshots/` — command cockpit, components, themes) captured from a static showcase via `capture.mjs`, streamlined quick start and export tables, and linked to full `docs/` guides.

## 2026-06-26T09:12:00Z

Security scan (at-rest vulnerability review) at commit `53497c3eb9ed7554e267358a64643f2e0b172109`. Identified 4 validated findings (3 HIGH, 1 MEDIUM): stored XSS in `FormFieldMarkdown` and `FormFieldRichText` via unsanitized `dangerouslySetInnerHTML`/`innerHTML`, arbitrary JS execution via Pyodide `exec()` with unrestricted `import js` interop in `PyodideMatplotlib`, and ReDoS in `LogViewer` from unescaped regex construction. Findings reported to Slack and persisted in automation memory.
