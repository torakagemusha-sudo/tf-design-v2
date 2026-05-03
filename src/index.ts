/**
 * @fileoverview Torafirma Design System v2
 * @module @torakagemusha-sudo/tf-design-v2
 * @version 0.2.0
 *
 * Spec/catalog: 1,193 component definitions (Torafirma codex) | 18 state machines | 20 layout templates
 * 15 design rule enforcers | 10 hooks | 18 utilities (named exports from utils)
 * 5 canonical themes | 256+ semantic design tokens (see README for CSS custom property counts)
 *
 * Controlled force. Operational clarity. Governed execution.
 */

// @ts-nocheck — intentional cross-module `export *` collisions (same names in types, components, machines, layouts); prefer subpath imports for stable public types.

// ── Types ────────────────────────────────────────────────────
export * from './types';

// ── Components (catalog-aligned coverage; see README) ─────────
export * from './components';

// ── State Machines (18 machines, 150 states, 495 transitions) ─
export * from './state-machines';

// ── Layout Templates (20 templates, 72 theme variants) ───────
export * from './layouts';

// ── Design Rule Enforcers (15 categories, 80+ rules) ─────────
export * from './rules';

// ── React Hooks (10 hooks) ───────────────────────────────────
export * from './hooks';

// ── Utilities (18 named exports from utils) ────────────────
export * from './utils';
