/**
 * @fileoverview Torafirma Design System — Component Catalog
 * @module @torafirma/design-system/components
 * @version 2.0.0
 *
 * 1,193 components across 12 operational families.
 * All components follow the Torafirma grammar:
 *   - Dark, dense, engineer-level interfaces
 *   - Semantic variants (never decorative)
 *   - Authority-aware at every level
 *   - State-rich with 17 canonical states
 *   - Trace-ready with traceId propagation
 *   - Governed, fail-closed, audit-traced
 */

// ────────────────────────────────────────────────────────────
// 03.1  Command & Action Components (50)
// Commands that change system state. Buttons, palettes, modals,
// safety controls — every action is governed.
// ────────────────────────────────────────────────────────────
export * from './command-action';

// ────────────────────────────────────────────────────────────
// 03.2  State, Status & Telemetry Components (90)
// Real-time indicators of system health, authority, and
// operational condition. If it can fail, it must be visible.
// ────────────────────────────────────────────────────────────
export * from './state-status-telemetry';

// ────────────────────────────────────────────────────────────
// 03.3  Layout & Shell Components (115)
// Application shells, navigation rails, split panes, dock
// panels, and 10 product-specific canonical layouts.
// ────────────────────────────────────────────────────────────
export * from './layout-shell';

// ────────────────────────────────────────────────────────────
// 03.4  Data & Table Components (125)
// Dense data tables, record inspectors, validation matrices,
// 50+ cell formatters, and full data grid system.
// ────────────────────────────────────────────────────────────
export * from './data-table';

// ────────────────────────────────────────────────────────────
// 03.5  Graph & Workflow Components (152)
// Graph canvas, 42 node types, 12 edge types, swimlanes,
// minimap, alignment tools, and collaboration features.
// ────────────────────────────────────────────────────────────
export * from './graph-workflow';

// ────────────────────────────────────────────────────────────
// 03.6  Editor, Form & Configuration Components (120)
// Property panels, schema editors, code panes, 50+ form field
// types, patch editors, and config management.
// ────────────────────────────────────────────────────────────
export * from './editor-form-config';

// ────────────────────────────────────────────────────────────
// 03.7  Governance & Authority Components (70)
// Policy gates, interlock notices, override panels, signed
// workorders, audit trails, and authority ladders.
// ────────────────────────────────────────────────────────────
export * from './governance-authority';

// ────────────────────────────────────────────────────────────
// 03.8  AI-Assisted Studio Components (90)
// Intent inputs, AI proposal cards, diff viewers, suggestion
// queues, model selectors, safety checkers, and ethics panels.
// ────────────────────────────────────────────────────────────
export * from './ai-studio';

// ────────────────────────────────────────────────────────────
// 03.9  Runtime, Trace & Console Components (100)
// Trace consoles, event streams, execution timelines, flame
// graphs, log viewers, and terminal panes.
// ────────────────────────────────────────────────────────────
export * from './runtime-trace-console';

// ────────────────────────────────────────────────────────────
// 03.10  Visualization & Instrumentation Components (110)
// Telemetry charts, control charts, heat maps, gauges,
// sparklines, dashboards, and statistical plots.
// ────────────────────────────────────────────────────────────
export * from './visualization-instrumentation';

// ────────────────────────────────────────────────────────────
// 03.11  Modal, Drawer & Overlay Components (91)
// Modals, drawers, popovers, tooltips, toasts, alert banners,
// and command overlays — 10 modal variants.
// ────────────────────────────────────────────────────────────
export * from './modal-drawer-overlay';

// ────────────────────────────────────────────────────────────
// 03.12  Mobile, Field & Emergency Components (80)
// Touch-optimized field buttons, mission cards, emergency
// breakers, map overlays, and patrol components.
// ────────────────────────────────────────────────────────────
export * from './mobile-field-emergency';
