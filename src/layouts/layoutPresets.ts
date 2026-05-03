/**
 * @fileoverview Named preset configurations for Torafirma layout templates.
 *
 * Each preset defines default panel visibility, sizing, and theme for a
 * specific workspace context. Presets can be applied to any layout via
 * the LayoutProvider initial props.
 */

import type { LayoutPreset, PanelSizing, PanelVisibility, TorafirmaTheme } from './types';

// ───────────────────────────────────────────
// Theme Constants
// ───────────────────────────────────────────

const COMMAND_DARK: TorafirmaTheme = 'command-dark';
const FIELD_GREEN: TorafirmaTheme = 'field-green';
const DEEP_BLUE: TorafirmaTheme = 'deep-blue';
const FORGE: TorafirmaTheme = 'forge';
const REDLINE: TorafirmaTheme = 'redline';

const DEFAULT_PANELS: PanelVisibility = {
  topBar: true,
  leftPanel: true,
  rightPanel: true,
  bottomPanel: true,
  statusBar: true,
};

const DEFAULT_SIZING: PanelSizing = {
  topBarHeight: 48,
  leftPanelWidth: 256,
  rightPanelWidth: 280,
  bottomPanelHeight: 200,
  statusBarHeight: 24,
};

// ───────────────────────────────────────────
// Preset Factory
// ───────────────────────────────────────────

function makePreset(
  name: string,
  description: string,
  defaultTheme: TorafirmaTheme,
  options?: { panels?: Partial<PanelVisibility>; sizing?: Partial<PanelSizing> },
): LayoutPreset {
  return {
    name,
    description,
    defaultTheme,
    panels: { ...DEFAULT_PANELS, ...options?.panels },
    sizing: { ...DEFAULT_SIZING, ...options?.sizing },
  };
}

// ───────────────────────────────────────────
// Product-Specific Presets
// ───────────────────────────────────────────

/** CommandCockpitLayout — Full operational command center */
export const PRESET_COMMAND_COCKPIT = makePreset(
  'command-cockpit',
  'Full operational command center with all panels visible.',
  COMMAND_DARK,
  { sizing: { bottomPanelHeight: 180 } },
);

/** BuilderStudioLayout — Builder workspace with wide canvas */
export const PRESET_BUILDER_STUDIO = makePreset(
  'builder-studio',
  'Builder workspace with collapsed right panel for maximum canvas area.',
  COMMAND_DARK,
  { sizing: { rightPanelWidth: 320, bottomPanelHeight: 160 } },
);

/** AnalysisDashboardLayout — Data analysis with expanded bottom panel */
export const PRESET_ANALYSIS_DASHBOARD = makePreset(
  'analysis-dashboard',
  'Data analysis workspace with expanded bottom panel for tables.',
  DEEP_BLUE,
  { sizing: { leftPanelWidth: 220, rightPanelWidth: 260, bottomPanelHeight: 240 } },
);

/** DataWorkspaceLayout — Data quality workspace */
export const PRESET_DATA_WORKSPACE = makePreset(
  'data-workspace',
  'Data quality workspace with validation panels.',
  COMMAND_DARK,
  { sizing: { leftPanelWidth: 240, rightPanelWidth: 300, bottomPanelHeight: 220 } },
);

/** OperationsCenterLayout — Operations monitoring */
export const PRESET_OPERATIONS_CENTER = makePreset(
  'operations-center',
  'Operations monitoring center with full telemetry visibility.',
  FIELD_GREEN,
  { sizing: { leftPanelWidth: 200, rightPanelWidth: 320, bottomPanelHeight: 160 } },
);

/** FieldConsoleLayout — Mobile field console */
export const PRESET_FIELD_CONSOLE = makePreset(
  'field-console',
  'Mobile field console with minimal panels for touch operation.',
  FIELD_GREEN,
  {
    panels: {
      rightPanel: false,
      bottomPanel: false,
      statusBar: true,
    },
    sizing: {
      topBarHeight: 56,
      leftPanelWidth: 0,
      statusBarHeight: 48,
    },
  },
);

/** AIStudioLayout — AI model development studio */
export const PRESET_AI_STUDIO = makePreset(
  'ai-studio',
  'AI model development studio with chat-centric workspace.',
  DEEP_BLUE,
  { sizing: { leftPanelWidth: 280, rightPanelWidth: 300, bottomPanelHeight: 140 } },
);

/** ForgeIDELayout — IDE development environment */
export const PRESET_FORGE_IDE = makePreset(
  'forge-ide',
  'Forge IDE with expanded terminal and file tree.',
  FORGE,
  { sizing: { leftPanelWidth: 240, rightPanelWidth: 260, bottomPanelHeight: 260 } },
);

/** TraceConsoleLayout — Trace debugging workspace */
export const PRESET_TRACE_CONSOLE = makePreset(
  'trace-console',
  'Trace debugging workspace with maximized timeline.',
  COMMAND_DARK,
  { sizing: { leftPanelWidth: 280, rightPanelWidth: 320, bottomPanelHeight: 280 } },
);

/** GovernanceLayout — Governance and audit workspace */
export const PRESET_GOVERNANCE = makePreset(
  'governance',
  'Governance and audit workspace with authority panels.',
  COMMAND_DARK,
  { sizing: { leftPanelWidth: 260, rightPanelWidth: 300, bottomPanelHeight: 140 } },
);

/** EmergencyLayout — Emergency response layout */
export const PRESET_EMERGENCY = makePreset(
  'emergency',
  'Emergency response with minimal chrome and maximum alert visibility.',
  REDLINE,
  {
    panels: {
      leftPanel: false,
      rightPanel: false,
      bottomPanel: false,
      statusBar: true,
    },
    sizing: {
      topBarHeight: 64,
      statusBarHeight: 32,
    },
  },
);

// ───────────────────────────────────────────
// Density Presets
// ───────────────────────────────────────────

/** Maximum information density — all panels compact */
export const PRESET_DENSITY_COMPACT: LayoutPreset = {
  name: 'density-compact',
  description: 'Maximum information density with minimal spacing.',
  defaultTheme: COMMAND_DARK,
  panels: {
    topBar: true,
    leftPanel: true,
    rightPanel: true,
    bottomPanel: true,
    statusBar: true,
  },
  sizing: {
    topBarHeight: 36,
    leftPanelWidth: 200,
    rightPanelWidth: 220,
    bottomPanelHeight: 140,
    statusBarHeight: 20,
  },
};

/** Spacious layout for readability and onboarding */
export const PRESET_DENSITY_SPACIOUS: LayoutPreset = {
  name: 'density-spacious',
  description: 'Spacious layout for readability and onboarding contexts.',
  defaultTheme: COMMAND_DARK,
  panels: {
    topBar: true,
    leftPanel: true,
    rightPanel: true,
    bottomPanel: false,
    statusBar: true,
  },
  sizing: {
    topBarHeight: 56,
    leftPanelWidth: 280,
    rightPanelWidth: 340,
    bottomPanelHeight: 0,
    statusBarHeight: 28,
  },
};

/** Presentation mode — minimal chrome */
export const PRESET_PRESENTATION: LayoutPreset = {
  name: 'presentation',
  description: 'Presentation mode with minimal UI chrome.',
  defaultTheme: COMMAND_DARK,
  panels: {
    topBar: false,
    leftPanel: false,
    rightPanel: false,
    bottomPanel: false,
    statusBar: false,
  },
  sizing: {
    topBarHeight: 0,
    leftPanelWidth: 0,
    rightPanelWidth: 0,
    bottomPanelHeight: 0,
    statusBarHeight: 0,
  },
};

/** Focus mode — just workspace and status */
export const PRESET_FOCUS: LayoutPreset = {
  name: 'focus',
  description: 'Focus mode with workspace maximized and minimal distractions.',
  defaultTheme: COMMAND_DARK,
  panels: {
    topBar: true,
    leftPanel: false,
    rightPanel: false,
    bottomPanel: false,
    statusBar: true,
  },
  sizing: {
    topBarHeight: 40,
    leftPanelWidth: 0,
    rightPanelWidth: 0,
    bottomPanelHeight: 0,
    statusBarHeight: 24,
  },
};

// ───────────────────────────────────────────
// Preset Registry
// ───────────────────────────────────────────

/** All available presets keyed by name */
export const LAYOUT_PRESETS: Record<string, LayoutPreset> = {
  'command-cockpit': PRESET_COMMAND_COCKPIT,
  'builder-studio': PRESET_BUILDER_STUDIO,
  'analysis-dashboard': PRESET_ANALYSIS_DASHBOARD,
  'data-workspace': PRESET_DATA_WORKSPACE,
  'operations-center': PRESET_OPERATIONS_CENTER,
  'field-console': PRESET_FIELD_CONSOLE,
  'ai-studio': PRESET_AI_STUDIO,
  'forge-ide': PRESET_FORGE_IDE,
  'trace-console': PRESET_TRACE_CONSOLE,
  governance: PRESET_GOVERNANCE,
  emergency: PRESET_EMERGENCY,
  'density-compact': PRESET_DENSITY_COMPACT,
  'density-spacious': PRESET_DENSITY_SPACIOUS,
  presentation: PRESET_PRESENTATION,
  focus: PRESET_FOCUS,
};

/** Get a preset by name with safe fallback */
export function getPreset(name: string): LayoutPreset {
  return LAYOUT_PRESETS[name] ?? PRESET_COMMAND_COCKPIT;
}

/** List all preset names */
export function listPresets(): string[] {
  return Object.keys(LAYOUT_PRESETS);
}

export default LAYOUT_PRESETS;
