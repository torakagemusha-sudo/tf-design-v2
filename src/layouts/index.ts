/**
 * @fileoverview Torafirma Design System — Layout Templates
 *
 * Canonical layout templates that compose design system components into
 * complete product surfaces. Every layout is fully typed, theme-aware,
 * and supports all five Torafirma themes: Command Dark, Field Green,
 * Deep Blue, Forge, and Redline.
 *
 * @example
 * ```tsx
 * import {
 *   LayoutProvider,
 *   CommandCockpitLayout,
 *   CommandCockpitDark,
 *   CommandCockpitGreen,
 * } from './layouts';
 *
 * <LayoutProvider initialTheme="command-dark">
 *   <CommandCockpitLayout
 *     commandBar={<MyCommandBar />}
 *     navRail={<MyNavRail />}
 *     primaryContent={<MyWorkspace />}
 *   />
 * </LayoutProvider>
 * ```
 */

// ───────────────────────────────────────────
// Core Infrastructure (export first for types)
// ───────────────────────────────────────────

export {
  // Types & Constants
  THEME_TOKENS,
  BREAKPOINT_PX,
  defaultPanelVisibility,
  defaultPanelSizing,
  defaultLayoutState,
  layoutReducer,
  buildThemeCSS,
} from './types';

export type {
  TorafirmaTheme,
  ThemeMeta,
  PanelVisibility,
  PanelSizing,
  LayoutPanel,
  LayoutState,
  LayoutAction,
  LayoutBreakpoint,
  PanelPosition,
  PanelSlot,
  LayoutPreset,
  LayoutBaseProps,
  LayoutComponent,
} from './types';

// ───────────────────────────────────────────
// Layout Context & Hooks
// ───────────────────────────────────────────

export { LayoutProvider, LayoutContext } from './LayoutProvider';
export type { LayoutProviderProps, LayoutContextValue } from './LayoutProvider';

export {
  useLayout,
  useLayoutTheme,
  useLayoutDispatch,
  usePanelVisibility,
  useBreakpoint,
} from './useLayout';

// ───────────────────────────────────────────
// Layout Presets
// ───────────────────────────────────────────

export {
  LAYOUT_PRESETS,
  PRESET_COMMAND_COCKPIT,
  PRESET_BUILDER_STUDIO,
  PRESET_ANALYSIS_DASHBOARD,
  PRESET_DATA_WORKSPACE,
  PRESET_OPERATIONS_CENTER,
  PRESET_FIELD_CONSOLE,
  PRESET_AI_STUDIO,
  PRESET_FORGE_IDE,
  PRESET_TRACE_CONSOLE,
  PRESET_GOVERNANCE,
  PRESET_EMERGENCY,
  PRESET_DENSITY_COMPACT,
  PRESET_DENSITY_SPACIOUS,
  PRESET_PRESENTATION,
  PRESET_FOCUS,
  getPreset,
  listPresets,
} from './layoutPresets';

// ───────────────────────────────────────────
// 1. CommandCockpitLayout
// ───────────────────────────────────────────

export {
  CommandCockpitLayout,
  CommandCockpitDark,
  CommandCockpitGreen,
  CommandCockpitBlue,
  CommandCockpitForge,
  CommandCockpitRedline,
} from './CommandCockpitLayout';
export type { CommandCockpitLayoutProps } from './CommandCockpitLayout';

// ───────────────────────────────────────────
// 2. BuilderStudioLayout
// ───────────────────────────────────────────

export {
  BuilderStudioLayout,
  BuilderStudioDark,
  BuilderStudioGreen,
  BuilderStudioBlue,
  BuilderStudioForge,
  BuilderStudioRedline,
} from './BuilderStudioLayout';
export type { BuilderStudioLayoutProps } from './BuilderStudioLayout';

// ───────────────────────────────────────────
// 3. AnalysisDashboardLayout
// ───────────────────────────────────────────

export {
  AnalysisDashboardLayout,
  AnalysisDashboardDark,
  AnalysisDashboardGreen,
  AnalysisDashboardBlue,
  AnalysisDashboardForge,
  AnalysisDashboardRedline,
} from './AnalysisDashboardLayout';
export type { AnalysisDashboardLayoutProps } from './AnalysisDashboardLayout';

// ───────────────────────────────────────────
// 4. DataWorkspaceLayout
// ───────────────────────────────────────────

export {
  DataWorkspaceLayout,
  DataWorkspaceDark,
  DataWorkspaceGreen,
  DataWorkspaceBlue,
  DataWorkspaceForge,
  DataWorkspaceRedline,
} from './DataWorkspaceLayout';
export type { DataWorkspaceLayoutProps } from './DataWorkspaceLayout';

// ───────────────────────────────────────────
// 5. OperationsCenterLayout
// ───────────────────────────────────────────

export {
  OperationsCenterLayout,
  OperationsCenterDark,
  OperationsCenterGreen,
  OperationsCenterBlue,
  OperationsCenterForge,
  OperationsCenterRedline,
} from './OperationsCenterLayout';
export type { OperationsCenterLayoutProps } from './OperationsCenterLayout';

// ───────────────────────────────────────────
// 6. FieldConsoleLayout
// ───────────────────────────────────────────

export {
  FieldConsoleLayout,
  FieldConsoleDark,
  FieldConsoleGreen,
  FieldConsoleBlue,
  FieldConsoleForge,
  FieldConsoleRedline,
} from './FieldConsoleLayout';
export type { FieldConsoleLayoutProps } from './FieldConsoleLayout';

// ───────────────────────────────────────────
// 7. AIStudioLayout
// ───────────────────────────────────────────

export {
  AIStudioLayout,
  AIStudioDark,
  AIStudioGreen,
  AIStudioBlue,
  AIStudioForge,
  AIStudioRedline,
} from './AIStudioLayout';
export type { AIStudioLayoutProps } from './AIStudioLayout';

// ───────────────────────────────────────────
// 8. ForgeIDELayout
// ───────────────────────────────────────────

export {
  ForgeIDELayout,
  ForgeIDEDark,
  ForgeIDEGreen,
  ForgeIDEBlue,
  ForgeIDEForge,
  ForgeIDERedline,
} from './ForgeIDELayout';
export type { ForgeIDELayoutProps } from './ForgeIDELayout';

// ───────────────────────────────────────────
// 9. TraceConsoleLayout
// ───────────────────────────────────────────

export {
  TraceConsoleLayout,
  TraceConsoleDark,
  TraceConsoleGreen,
  TraceConsoleBlue,
  TraceConsoleForge,
  TraceConsoleRedline,
} from './TraceConsoleLayout';
export type { TraceConsoleLayoutProps } from './TraceConsoleLayout';

// ───────────────────────────────────────────
// 10. GovernanceLayout
// ───────────────────────────────────────────

export {
  GovernanceLayout,
  GovernanceDark,
  GovernanceGreen,
  GovernanceBlue,
  GovernanceForge,
  GovernanceRedline,
} from './GovernanceLayout';
export type { GovernanceLayoutProps } from './GovernanceLayout';

// ───────────────────────────────────────────
// 11. EmergencyLayout
// ───────────────────────────────────────────

export {
  EmergencyLayout,
  EmergencyDark,
  EmergencyGreen,
  EmergencyBlue,
  EmergencyForge,
  EmergencyRedline,
} from './EmergencyLayout';
export type { EmergencyLayoutProps } from './EmergencyLayout';

// ───────────────────────────────────────────
// 12. EmptyStateLayout
// ───────────────────────────────────────────

export {
  EmptyStateLayout,
  NoDataState,
  NoAccessState,
  ErrorEmptyState,
  LoadingEmptyState,
  OfflineState,
} from './EmptyStateLayout';
export type { EmptyStateLayoutProps, EmptyStateVariant } from './EmptyStateLayout';

// ───────────────────────────────────────────
// 13. ErrorStateLayout
// ───────────────────────────────────────────

export {
  ErrorStateLayout,
  Error404,
  Error500,
  AuthFailed,
  TimeoutError,
  DegradedState,
} from './ErrorStateLayout';
export type { ErrorStateLayoutProps, ErrorVariant } from './ErrorStateLayout';

// ───────────────────────────────────────────
// 14. LoadingStateLayout
// ───────────────────────────────────────────

export {
  LoadingStateLayout,
  InitialLoadState,
  TransitionState,
  RefreshState,
} from './LoadingStateLayout';
export type { LoadingStateLayoutProps, LoadingVariant } from './LoadingStateLayout';

// ───────────────────────────────────────────
// 15. OnboardingLayout
// ───────────────────────────────────────────

export {
  OnboardingLayout,
  WelcomeLayout,
  TutorialLayout,
  FeatureDiscoveryLayout,
} from './OnboardingLayout';
export type { OnboardingLayoutProps, OnboardingVariant, OnboardingStep } from './OnboardingLayout';

// ───────────────────────────────────────────
// 16. SplitViewLayout
// ───────────────────────────────────────────

export {
  SplitViewLayout,
  Horizontal50_50,
  Horizontal30_70,
  Vertical40_60,
  TriplePane,
} from './SplitViewLayout';
export type { SplitViewLayoutProps, SplitVariant } from './SplitViewLayout';

// ───────────────────────────────────────────
// 17. FullscreenLayout
// ───────────────────────────────────────────

export {
  FullscreenLayout,
  FullscreenChart,
  FullscreenTable,
  FullscreenMap,
  FullscreenTerminal,
  FullscreenPresentation,
} from './FullscreenLayout';
export type { FullscreenLayoutProps, FullscreenVariant } from './FullscreenLayout';

// ───────────────────────────────────────────
// 18. ModalOverlayLayout
// ───────────────────────────────────────────

export {
  ModalOverlayLayout,
  CenteredModal,
  SlideRightDrawer,
  SlideBottomDrawer,
  FullscreenOverlay,
} from './ModalOverlayLayout';
export type { ModalOverlayLayoutProps, ModalVariant } from './ModalOverlayLayout';

// ───────────────────────────────────────────
// 19. ResponsiveLayout
// ───────────────────────────────────────────

export {
  ResponsiveLayout,
  DesktopLayout,
  TabletLayout,
  MobileLayout,
  WideLayout,
  UltrawideLayout,
} from './ResponsiveLayout';
export type { ResponsiveLayoutProps, ResponsiveVariant } from './ResponsiveLayout';

// ───────────────────────────────────────────
// 20. PrintLayout
// ───────────────────────────────────────────

export {
  PrintLayout,
  PrintReport,
  PrintSummary,
  PrintDetail,
} from './PrintLayout';
export type { PrintLayoutProps, PrintVariant } from './PrintLayout';
