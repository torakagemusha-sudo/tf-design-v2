/**
 * @fileoverview useLayout - React Hook for consuming Torafirma Layout Context
 *
 * Provides access to layout state and dispatch actions from any component
 * nested within a LayoutProvider. Throws if used outside provider context.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { state, setTheme, toggleSidebar } = useLayout();
 *
 *   return (
 *     <button onClick={() => setTheme('field-green')}>
 *       Current: {state.theme}
 *     </button>
 *   );
 * };
 * ```
 */

import { useContext } from 'react';
import { LayoutContext } from './LayoutProvider';

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error(
      'useLayout must be used within a LayoutProvider. ' +
      'Wrap your app or layout component with <LayoutProvider>.'
    );
  }

  return context;
}

/** Convenience hook that returns only the current theme */
export function useLayoutTheme() {
  const { state } = useLayout();
  return state.theme;
}

/** Convenience hook that returns only the dispatch function */
export function useLayoutDispatch() {
  const { dispatch } = useLayout();
  return dispatch;
}

/** Convenience hook that returns panel visibility helpers */
export function usePanelVisibility() {
  const { state, togglePanel } = useLayout();
  return {
    visibility: state.panelVisibility,
    sizing: state.panelSizing,
    toggle: togglePanel,
    sidebarCollapsed: state.sidebarCollapsed,
    rightPanelCollapsed: state.rightPanelCollapsed,
    bottomPanelCollapsed: state.bottomPanelCollapsed,
  };
}

/** Convenience hook that returns breakpoint info */
export function useBreakpoint() {
  const { state } = useLayout();
  return {
    breakpoint: state.breakpoint,
    isMobile: state.isMobile,
    isDesktop: state.breakpoint === 'desktop' || state.breakpoint === 'wide' || state.breakpoint === 'ultrawide',
    isWide: state.breakpoint === 'wide' || state.breakpoint === 'ultrawide',
    isUltrawide: state.breakpoint === 'ultrawide',
  };
}

export default useLayout;
