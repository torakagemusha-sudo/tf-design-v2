/**
 * @fileoverview Core layout types and theme definitions for Torafirma Design System.
 * Provides the shared type system used across all layout templates.
 */

// ───────────────────────────────────────────
// Theme System
// ───────────────────────────────────────────

/** Five canonical Torafirma themes */
export type TorafirmaTheme =
  | 'command-dark'
  | 'field-green'
  | 'deep-blue'
  | 'forge'
  | 'redline';

/** Theme display metadata */
export interface ThemeMeta {
  id: TorafirmaTheme;
  label: string;
  description: string;
  accentColor: string;
  dangerColor: string;
  warningColor: string;
  successColor: string;
  infoColor: string;
  background: string;
  panelBg: string;
  raisedPanelBg: string;
  borderColor: string;
  textPrimary: string;
  textMuted: string;
}

/** Complete theme token map for all five themes */
export const THEME_TOKENS: Record<TorafirmaTheme, ThemeMeta> = {
  'command-dark': {
    id: 'command-dark',
    label: 'Command Dark',
    description: 'Default operational command surface. Severe, controlled, general-purpose.',
    accentColor: '#36D47B',
    dangerColor: '#F24B4B',
    warningColor: '#F2B84B',
    successColor: '#36D47B',
    infoColor: '#4BA3F2',
    background: '#050608',
    panelBg: '#0E1318',
    raisedPanelBg: '#141A20',
    borderColor: '#26323C',
    textPrimary: '#D6E0E6',
    textMuted: '#7F8C96',
  },
  'field-green': {
    id: 'field-green',
    label: 'Field Green',
    description: 'Tactical field command. Military, radar-like, operations room.',
    accentColor: '#36D47B',
    dangerColor: '#F24B4B',
    warningColor: '#F2B84B',
    successColor: '#76FF9F',
    infoColor: '#35D0E3',
    background: '#030705',
    panelBg: '#07120C',
    raisedPanelBg: '#0B1A12',
    borderColor: '#1E3A2A',
    textPrimary: '#CFE8D7',
    textMuted: '#6B8F7E',
  },
  'deep-blue': {
    id: 'deep-blue',
    label: 'Deep Blue',
    description: 'Analysis and intelligence workspace. Analytic, cold, cartographic.',
    accentColor: '#4BA3F2',
    dangerColor: '#F24B4B',
    warningColor: '#F2B84B',
    successColor: '#36D47B',
    infoColor: '#35D0E3',
    background: '#05080D',
    panelBg: '#07111F',
    raisedPanelBg: '#0E1A2A',
    borderColor: '#263B52',
    textPrimary: '#D8E6F2',
    textMuted: '#7A9BB8',
  },
  forge: {
    id: 'forge',
    label: 'Forge',
    description: 'IDE and build environment. Foundry, industrial, compiler console.',
    accentColor: '#F2B84B',
    dangerColor: '#F24B4B',
    warningColor: '#F07A2A',
    successColor: '#36D47B',
    infoColor: '#4BA3F2',
    background: '#070707',
    panelBg: '#111111',
    raisedPanelBg: '#191919',
    borderColor: '#33302A',
    textPrimary: '#E0DDD6',
    textMuted: '#8A8378',
  },
  redline: {
    id: 'redline',
    label: 'Redline',
    description: 'Emergency and fault response. Critical, high-alert, fail-closed.',
    accentColor: '#F24B4B',
    dangerColor: '#B00020',
    warningColor: '#F2B84B',
    successColor: '#36D47B',
    infoColor: '#4BA3F2',
    background: '#080303',
    panelBg: '#130707',
    raisedPanelBg: '#1C0B0B',
    borderColor: '#4A1F1F',
    textPrimary: '#F1DCDC',
    textMuted: '#B08A8A',
  },
};

// ───────────────────────────────────────────
// Layout Panel Configuration
// ───────────────────────────────────────────

/** Panel visibility toggle state */
export interface PanelVisibility {
  topBar: boolean;
  leftPanel: boolean;
  rightPanel: boolean;
  bottomPanel: boolean;
  statusBar: boolean;
}

/** Panel sizing (in pixels or percentages) */
export interface PanelSizing {
  topBarHeight: number;
  leftPanelWidth: number;
  rightPanelWidth: number;
  bottomPanelHeight: number;
  statusBarHeight: number;
}

/** A layout region/panel descriptor */
export interface LayoutPanel {
  id: string;
  label: string;
  collapsible: boolean;
  defaultOpen: boolean;
  minSize?: number;
  maxSize?: number;
}

// ───────────────────────────────────────────
// Layout State
// ───────────────────────────────────────────

/** Runtime state managed by the layout provider */
export interface LayoutState {
  theme: TorafirmaTheme;
  panelVisibility: PanelVisibility;
  panelSizing: PanelSizing;
  isFullscreen: boolean;
  isMobile: boolean;
  breakpoint: LayoutBreakpoint;
  activePanel: string | null;
  sidebarCollapsed: boolean;
  bottomPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
}

/** Layout action types for state transitions */
export type LayoutAction =
  | { type: 'SET_THEME'; theme: TorafirmaTheme }
  | { type: 'TOGGLE_PANEL'; panel: keyof PanelVisibility }
  | { type: 'SET_PANEL_SIZE'; panel: keyof PanelSizing; size: number }
  | { type: 'TOGGLE_FULLSCREEN' }
  | { type: 'SET_MOBILE'; isMobile: boolean }
  | { type: 'SET_BREAKPOINT'; breakpoint: LayoutBreakpoint }
  | { type: 'SET_ACTIVE_PANEL'; panel: string | null }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_BOTTOM_PANEL' }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'COLLAPSE_ALL' }
  | { type: 'EXPAND_ALL' }
  | { type: 'RESET_LAYOUT' };

/** Layout state reducer */
export function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'TOGGLE_PANEL':
      return {
        ...state,
        panelVisibility: {
          ...state.panelVisibility,
          [action.panel]: !state.panelVisibility[action.panel],
        },
      };
    case 'SET_PANEL_SIZE':
      return {
        ...state,
        panelSizing: { ...state.panelSizing, [action.panel]: action.size },
      };
    case 'TOGGLE_FULLSCREEN':
      return { ...state, isFullscreen: !state.isFullscreen };
    case 'SET_MOBILE':
      return { ...state, isMobile: action.isMobile };
    case 'SET_BREAKPOINT':
      return { ...state, breakpoint: action.breakpoint };
    case 'SET_ACTIVE_PANEL':
      return { ...state, activePanel: action.panel };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'TOGGLE_BOTTOM_PANEL':
      return { ...state, bottomPanelCollapsed: !state.bottomPanelCollapsed };
    case 'TOGGLE_RIGHT_PANEL':
      return { ...state, rightPanelCollapsed: !state.rightPanelCollapsed };
    case 'COLLAPSE_ALL':
      return {
        ...state,
        panelVisibility: {
          topBar: true,
          leftPanel: false,
          rightPanel: false,
          bottomPanel: false,
          statusBar: true,
        },
      };
    case 'EXPAND_ALL':
      return {
        ...state,
        panelVisibility: {
          topBar: true,
          leftPanel: true,
          rightPanel: true,
          bottomPanel: true,
          statusBar: true,
        },
      };
    case 'RESET_LAYOUT':
      return { ...state, ...defaultLayoutState };
    default:
      return state;
  }
}

// ───────────────────────────────────────────
// Breakpoints
// ───────────────────────────────────────────

export type LayoutBreakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultrawide';

export const BREAKPOINT_PX: Record<LayoutBreakpoint, number> = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
  ultrawide: 1920,
};

// ───────────────────────────────────────────
// Default Layout State
// ───────────────────────────────────────────

export const defaultPanelVisibility: PanelVisibility = {
  topBar: true,
  leftPanel: true,
  rightPanel: true,
  bottomPanel: true,
  statusBar: true,
};

export const defaultPanelSizing: PanelSizing = {
  topBarHeight: 48,
  leftPanelWidth: 256,
  rightPanelWidth: 280,
  bottomPanelHeight: 200,
  statusBarHeight: 24,
};

export const defaultLayoutState: Omit<LayoutState, 'theme' | 'isMobile' | 'breakpoint'> = {
  panelVisibility: defaultPanelVisibility,
  panelSizing: defaultPanelSizing,
  isFullscreen: false,
  activePanel: null,
  sidebarCollapsed: false,
  bottomPanelCollapsed: false,
  rightPanelCollapsed: false,
};

// ───────────────────────────────────────────
// Shared Layout Props
// ───────────────────────────────────────────

/** Base props accepted by every layout template */
export interface LayoutBaseProps {
  /** Active theme variant */
  theme?: TorafirmaTheme;
  /** Panel visibility overrides */
  panelVisibility?: Partial<PanelVisibility>;
  /** Panel sizing overrides */
  panelSizing?: Partial<PanelSizing>;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Children content for main workspace area */
  children?: React.ReactNode;
  /** Called when layout state changes */
  onLayoutChange?: (state: LayoutState) => void;
  /** Authority level of current operator */
  authorityLevel?: string;
  /** Density mode */
  density?: 'compact' | 'standard' | 'field';
  /** Optional test id */
  testId?: string;
}

/** Layout template component type */
export type LayoutComponent<P extends LayoutBaseProps = LayoutBaseProps> =
  React.FC<P> & {
    /** Display name for the layout */
    displayName: string;
    /** Default theme for this layout family */
    defaultTheme: TorafirmaTheme;
  };

// ───────────────────────────────────────────
// Utility Types
// ───────────────────────────────────────────

export type PanelPosition = 'top' | 'left' | 'main' | 'right' | 'bottom';

export interface PanelSlot {
  position: PanelPosition;
  component: React.ReactNode;
  priority?: number;
}

export interface LayoutPreset {
  name: string;
  description: string;
  panels: PanelVisibility;
  sizing: PanelSizing;
  defaultTheme: TorafirmaTheme;
}

/** CSS custom property builder for themes */
export function buildThemeCSS(theme: TorafirmaTheme): React.CSSProperties {
  const t = THEME_TOKENS[theme];
  return {
    '--tf-bg': t.background,
    '--tf-panel': t.panelBg,
    '--tf-raised': t.raisedPanelBg,
    '--tf-border': t.borderColor,
    '--tf-text': t.textPrimary,
    '--tf-text-muted': t.textMuted,
    '--tf-accent': t.accentColor,
    '--tf-danger': t.dangerColor,
    '--tf-warning': t.warningColor,
    '--tf-success': t.successColor,
    '--tf-info': t.infoColor,
  } as React.CSSProperties;
}
