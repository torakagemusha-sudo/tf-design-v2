/**
 * @fileoverview LayoutProvider - React Context Provider for Torafirma Layout State
 *
 * Manages the shared layout state across all layout templates including:
 * - Active theme selection (5 canonical themes)
 * - Panel visibility and sizing
 * - Fullscreen mode
 * - Responsive breakpoint detection
 * - Sidebar/panel collapse state
 *
 * @example
 * ```tsx
 * <LayoutProvider initialTheme="command-dark">
 *   <CommandCockpitLayout />
 * </LayoutProvider>
 * ```
 */

import React, { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import type {
  LayoutAction,
  LayoutBreakpoint,
  LayoutState,
  PanelVisibility,
  PanelSizing,
  TorafirmaTheme,
} from './types';
import {
  BREAKPOINT_PX,
  defaultLayoutState,
  defaultPanelSizing,
  defaultPanelVisibility,
  layoutReducer,
} from './types';

// ───────────────────────────────────────────
// Context Definition
// ───────────────────────────────────────────

export interface LayoutContextValue {
  /** Current layout state */
  state: LayoutState;
  /** Dispatch a layout action */
  dispatch: React.Dispatch<LayoutAction>;
  /** Convenience: set theme directly */
  setTheme: (theme: TorafirmaTheme) => void;
  /** Convenience: toggle panel visibility */
  togglePanel: (panel: keyof PanelVisibility) => void;
  /** Convenience: set panel size */
  setPanelSize: (panel: keyof PanelSizing, size: number) => void;
  /** Convenience: toggle fullscreen */
  toggleFullscreen: () => void;
  /** Convenience: toggle sidebar */
  toggleSidebar: () => void;
  /** Convenience: toggle bottom panel */
  toggleBottomPanel: () => void;
  /** Convenience: toggle right panel */
  toggleRightPanel: () => void;
  /** Convenience: collapse all panels */
  collapseAll: () => void;
  /** Convenience: expand all panels */
  expandAll: () => void;
  /** Convenience: reset to defaults */
  resetLayout: () => void;
}

export const LayoutContext = createContext<LayoutContextValue | null>(null);

// ───────────────────────────────────────────
// Provider Props
// ───────────────────────────────────────────

export interface LayoutProviderProps {
  /** Initial theme (defaults to command-dark) */
  initialTheme?: TorafirmaTheme;
  /** Initial panel visibility overrides */
  initialPanelVisibility?: Partial<PanelVisibility>;
  /** Initial panel sizing overrides */
  initialPanelSizing?: Partial<PanelSizing>;
  /** Child components */
  children: React.ReactNode;
  /** Optional className for the provider wrapper */
  className?: string;
  /** Called whenever layout state changes */
  onStateChange?: (state: LayoutState) => void;
}

// ───────────────────────────────────────────
// Breakpoint Detection
// ───────────────────────────────────────────

function detectBreakpoint(width: number): LayoutBreakpoint {
  if (width >= BREAKPOINT_PX.ultrawide) return 'ultrawide';
  if (width >= BREAKPOINT_PX.wide) return 'wide';
  if (width >= BREAKPOINT_PX.desktop) return 'desktop';
  if (width >= BREAKPOINT_PX.tablet) return 'tablet';
  return 'mobile';
}

// ───────────────────────────────────────────
// Provider Component
// ───────────────────────────────────────────

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  initialTheme = 'command-dark',
  initialPanelVisibility,
  initialPanelSizing,
  children,
  className,
  onStateChange,
}) => {
  const [state, dispatch] = useReducer(layoutReducer, {
    ...defaultLayoutState,
    theme: initialTheme,
    panelVisibility: { ...defaultPanelVisibility, ...initialPanelVisibility },
    panelSizing: { ...defaultPanelSizing, ...initialPanelSizing },
    isMobile:
      typeof window !== 'undefined' ? window.innerWidth < BREAKPOINT_PX.tablet : false,
    breakpoint:
      typeof window !== 'undefined'
        ? detectBreakpoint(window.innerWidth)
        : 'desktop',
  });

  // Responsive breakpoint detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const breakpoint = detectBreakpoint(width);
      const isMobile = width < BREAKPOINT_PX.tablet;
      dispatch({ type: 'SET_BREAKPOINT', breakpoint });
      dispatch({ type: 'SET_MOBILE', isMobile });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Notify external listener
  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  // Keyboard shortcut: toggle fullscreen on F11 (prevent default)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_FULLSCREEN' });
      }
      // Toggle sidebar on Ctrl+B
      if (e.key === 'b' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_SIDEBAR' });
      }
      // Collapse all on Escape
      if (e.key === 'Escape' && e.shiftKey) {
        e.preventDefault();
        dispatch({ type: 'COLLAPSE_ALL' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Convenience callbacks
  const setTheme = useCallback((theme: TorafirmaTheme) => {
    dispatch({ type: 'SET_THEME', theme });
  }, []);

  const togglePanel = useCallback((panel: keyof PanelVisibility) => {
    dispatch({ type: 'TOGGLE_PANEL', panel });
  }, []);

  const setPanelSize = useCallback((panel: keyof PanelSizing, size: number) => {
    dispatch({ type: 'SET_PANEL_SIZE', panel, size });
  }, []);

  const toggleFullscreen = useCallback(() => {
    dispatch({ type: 'TOGGLE_FULLSCREEN' });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  const toggleBottomPanel = useCallback(() => {
    dispatch({ type: 'TOGGLE_BOTTOM_PANEL' });
  }, []);

  const toggleRightPanel = useCallback(() => {
    dispatch({ type: 'TOGGLE_RIGHT_PANEL' });
  }, []);

  const collapseAll = useCallback(() => {
    dispatch({ type: 'COLLAPSE_ALL' });
  }, []);

  const expandAll = useCallback(() => {
    dispatch({ type: 'EXPAND_ALL' });
  }, []);

  const resetLayout = useCallback(() => {
    dispatch({ type: 'RESET_LAYOUT' });
    if (initialTheme) {
      dispatch({ type: 'SET_THEME', theme: initialTheme });
    }
  }, [initialTheme]);

  const contextValue = useMemo<LayoutContextValue>(
    () => ({
      state,
      dispatch,
      setTheme,
      togglePanel,
      setPanelSize,
      toggleFullscreen,
      toggleSidebar,
      toggleBottomPanel,
      toggleRightPanel,
      collapseAll,
      expandAll,
      resetLayout,
    }),
    [state, setTheme, togglePanel, setPanelSize, toggleFullscreen, toggleSidebar, toggleBottomPanel, toggleRightPanel, collapseAll, expandAll, resetLayout]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      <div
        className={className}
        data-theme={state.theme}
        data-breakpoint={state.breakpoint}
        data-mobile={state.isMobile}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
