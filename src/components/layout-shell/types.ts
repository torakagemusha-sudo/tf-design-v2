/**
 * ============================================================================
 * Torafirma Design System — Layout & Shell Types
 * ============================================================================
 *
 * Central type definitions for the Layout & Shell component family.
 * All components import from this module to ensure type consistency
 * across the Torafirma operational interface system.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 * ============================================================================
 */

import React from "react";

/* ------------------------------------------------------------------ */
/*  Primitives (mirrored from Torafirma Component System Overview)    */
/* ------------------------------------------------------------------ */

export type TorafirmaComponentState =
  | "idle"
  | "ready"
  | "dirty"
  | "validating"
  | "valid"
  | "warning"
  | "blocked"
  | "staged"
  | "running"
  | "complete"
  | "degraded"
  | "faulted"
  | "locked"
  | "simulated"
  | "committed"
  | "deployed"
  | "disconnected";

export type AuthorityLevel =
  | "AUTH_0_OBSERVE"
  | "AUTH_1_DRAFT"
  | "AUTH_2_STAGE"
  | "AUTH_3_EXECUTE"
  | "AUTH_4_COMMIT"
  | "AUTH_5_OVERRIDE"
  | "AUTH_6_ROOT";

export type ComponentDensity = "compact" | "standard" | "field";

export type ComponentCriticality =
  | "passive"
  | "informational"
  | "operational"
  | "warning"
  | "critical"
  | "audit";

export type SemanticVariant =
  | "neutral"
  | "inspect"
  | "run"
  | "warning"
  | "instability"
  | "danger"
  | "stream"
  | "model"
  | "authority";

export type ProductTheme =
  | "command-dark"
  | "tactical-field"
  | "analysis-deep-blue"
  | "forge-graphite"
  | "threat-redline";

export type Orientation = "horizontal" | "vertical";

export type DockPosition = "left" | "right" | "top" | "bottom" | "center";

export type SplitDirection = "horizontal" | "vertical";

/* ------------------------------------------------------------------ */
/*  Base Props                                                        */
/* ------------------------------------------------------------------ */

export interface TorafirmaComponentBaseProps {
  id?: string;
  label?: string;
  description?: string;
  state?: TorafirmaComponentState;
  authority?: AuthorityLevel;
  requiredAuthority?: AuthorityLevel;
  density?: ComponentDensity;
  criticality?: ComponentCriticality;
  disabled?: boolean;
  disabledReason?: string;
  traceId?: string;
  testId?: string;
}

/* ------------------------------------------------------------------ */
/*  Layout Shell Specific Types                                       */
/* ------------------------------------------------------------------ */

/** Navigation rail item descriptor. */
export interface NavRailItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  state?: TorafirmaComponentState;
  authority?: AuthorityLevel;
  badge?: string | number;
  badgeVariant?: SemanticVariant;
  children?: NavRailItem[];
}

/** Workspace tab descriptor. */
export interface WorkspaceTabData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  state?: TorafirmaComponentState;
  dirty?: boolean;
  closable?: boolean;
  pinned?: boolean;
  content?: React.ReactNode;
}

/** Breadcrumb item descriptor. */
export interface BreadcrumbData {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  authority?: AuthorityLevel;
}

/** Dock panel tab descriptor. */
export interface DockPanelTabData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  closable?: boolean;
  state?: TorafirmaComponentState;
}

/** Sidebar section item. */
export interface SidebarItemData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  state?: TorafirmaComponentState;
  authority?: AuthorityLevel;
  children?: SidebarItemData[];
  badge?: string | number;
}

/** Toolbar action item. */
export interface ToolbarAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: SemanticVariant;
  authority?: AuthorityLevel;
  disabled?: boolean;
  disabledReason?: string;
  shortcut?: string;
  onClick?: () => void;
}

/** Status bar section descriptor. */
export interface StatusBarSectionData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: SemanticVariant;
  state?: TorafirmaComponentState;
  onClick?: () => void;
}

/** Dashboard widget descriptor. */
export interface DashboardWidgetData {
  id: string;
  title: string;
  state?: TorafirmaComponentState;
  colSpan?: number;
  rowSpan?: number;
  headerActions?: ToolbarAction[];
  content: React.ReactNode;
}

/** Floating window descriptor. */
export interface FloatingWindowData {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  state?: TorafirmaComponentState;
  content: React.ReactNode;
  minimizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
}

/** Blocked state reason payload. */
export interface BlockedStateReason {
  reasonCode: string;
  message: string;
  requiredAction?: string;
  requiredAuthority?: AuthorityLevel;
}

/** Split pane panel descriptor. */
export interface SplitPanePanel {
  id: string;
  content: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
}

/** Card action descriptor. */
export interface CardAction {
  id: string;
  label: string;
  variant?: SemanticVariant;
  authority?: AuthorityLevel;
  disabled?: boolean;
  onClick?: () => void;
}

/** List item action descriptor. */
export interface ListItemActionData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: SemanticVariant;
  onClick?: () => void;
}
