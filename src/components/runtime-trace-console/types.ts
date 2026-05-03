/**
 * @fileoverview Central types module for the Torafirma Runtime, Trace & Console component family.
 * All components in this directory import types from this module.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/types
 * @version 0.2.0
 */

import type React from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// Authority & Governance Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Authority levels as defined by the Torafirma Authority Model (Section 6). */
export type AuthorityLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Human-readable authority labels. */
export type AuthorityLabel =
  | "OBSERVE"
  | "DRAFT"
  | "STAGE"
  | "EXECUTE"
  | "COMMIT"
  | "OVERRIDE"
  | "ROOT";

/** Authority display tuple — level + label. */
export interface AuthorityDisplay {
  level: AuthorityLevel;
  label: AuthorityLabel;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Canonical State Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Product state values as defined in the Torafirma State Model (Section 5). */
export type ProductState =
  | "IDLE"
  | "READY"
  | "DIRTY"
  | "VALIDATING"
  | "VALID"
  | "WARNING"
  | "BLOCKED"
  | "STAGED"
  | "RUNNING"
  | "COMPLETE"
  | "DEGRADED"
  | "FAULTED"
  | "LOCKED"
  | "SIMULATED"
  | "COMMITTED"
  | "DEPLOYED"
  | "DISCONNECTED";

// ═══════════════════════════════════════════════════════════════════════════════
// Trace & Event Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Action types for traceable events (Section 3.9 Trace Layer). */
export type TraceAction =
  | "create"
  | "edit"
  | "validate"
  | "stage"
  | "execute"
  | "commit"
  | "deploy"
  | "abort"
  | "reject"
  | "override"
  | "fault"
  | "recover";

/** Event severity levels. */
export type EventSeverity = "info" | "debug" | "warn" | "error" | "fatal";

/** Core trace event record (Section 3.9 Trace Layer). */
export interface TraceEvent {
  /** Unique event identifier. */
  eventId: string;
  /** Event timestamp (ISO 8601). */
  timestamp: string;
  /** Actor who triggered the event. */
  actor: string;
  /** Action performed. */
  action: TraceAction;
  /** Target object or system. */
  target: string;
  /** Before state snapshot (where applicable). */
  before?: Record<string, unknown>;
  /** After state snapshot (where applicable). */
  after?: Record<string, unknown>;
  /** Validation state at event time. */
  validationState?: ProductState;
  /** Authority level required/produced. */
  authorityLevel: AuthorityLevel;
  /** Runtime target identifier. */
  runtimeTarget: string;
  /** Operation result. */
  result?: "success" | "failure" | "partial" | "blocked";
  /** Error or reason code. */
  reasonCode?: string;
  /** Human-readable message. */
  message: string;
  /** Event severity. */
  severity: EventSeverity;
  /** Parent event ID for tree relationships. */
  parentId?: string;
  /** Span duration in milliseconds. */
  durationMs?: number;
  /** Stack trace (for errors). */
  stackTrace?: string[];
  /** Metadata key-value pairs. */
  metadata?: Record<string, unknown>;
}

/** Streamed event for real-time event streams. */
export interface StreamEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: EventSeverity;
  source: string;
  message: string;
  data?: Record<string, unknown>;
  badge?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Runtime Target Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Types of runtime targets (Section 9 Runtime Boundary Rules). */
export type RuntimeTargetType =
  | "browser-local"
  | "desktop-daemon"
  | "cloud-worker"
  | "container"
  | "gpu-server"
  | "embedded"
  | "external-api"
  | "database"
  | "agent-runtime";

/** Runtime target definition. */
export interface RuntimeTarget {
  id: string;
  name: string;
  type: RuntimeTargetType;
  state: ProductState;
  connection: "connected" | "disconnected" | "stale" | "unknown";
  url?: string;
  version?: string;
  region?: string;
  lastSeen?: string;
  metrics?: RuntimeMetrics;
  tags?: string[];
}

/** Runtime performance metrics. */
export interface RuntimeMetrics {
  cpuPercent: number;
  memoryMb: number;
  memoryLimitMb?: number;
  activeProcesses: number;
  queueDepth: number;
  latencyP50Ms: number;
  latencyP99Ms: number;
  throughputRps: number;
  errorRate: number;
  uptimeSeconds: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Process Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Process/thread state. */
export type ProcessState =
  | "running"
  | "sleeping"
  | "waiting"
  | "stopped"
  | "zombie"
  | "blocked";

/** Process or thread record. */
export interface ProcessInfo {
  pid: number;
  ppid?: number;
  name: string;
  command?: string;
  state: ProcessState;
  cpuPercent: number;
  memoryMb: number;
  threads: number;
  startedAt: string;
  runtimeTargetId: string;
  children?: ProcessInfo[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// Log Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Log level values. */
export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

/** Log line record. */
export interface LogLine {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
  threadId?: string;
  processId?: number;
  metadata?: Record<string, unknown>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Timeline & Execution Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Timeline event marker. */
export interface TimelineEvent {
  id: string;
  timestamp: number;
  label: string;
  type: "execution" | "milestone" | "error" | "warning" | "commit" | "stage";
  severity: EventSeverity;
  trackId: string;
  durationMs?: number;
  data?: Record<string, unknown>;
}

/** Timeline track definition. */
export interface TimelineTrack {
  id: string;
  label: string;
  color?: string;
  events: TimelineEvent[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// Terminal Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Terminal line record. */
export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "warning" | "info" | "prompt";
  content: string;
  timestamp: string;
  prompt?: string;
}

/** Terminal autocomplete suggestion. */
export interface TerminalSuggestion {
  label: string;
  value: string;
  description?: string;
  type?: "command" | "file" | "variable" | "flag";
}

// ═══════════════════════════════════════════════════════════════════════════════
// Span & Trace Visualization Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Trace span for waterfall/flame graph views. */
export interface TraceSpan {
  id: string;
  parentId?: string;
  name: string;
  startTime: number;
  endTime: number;
  durationMs: number;
  service: string;
  status: "ok" | "error" | "unknown";
  depth: number;
  events?: TraceSpanEvent[];
  tags?: Record<string, string>;
}

/** Event within a span. */
export interface TraceSpanEvent {
  timestamp: number;
  name: string;
  attributes?: Record<string, unknown>;
}

/** Flame graph node. */
export interface FlameNode {
  id: string;
  name: string;
  value: number;
  children?: FlameNode[];
  color?: string;
  tooltip?: string;
}

/** Waterfall row data. */
export interface WaterfallRow {
  id: string;
  label: string;
  startMs: number;
  durationMs: number;
  status: "ok" | "error" | "pending";
  depth: number;
  dependencies?: string[];
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Console Output Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Console output block types. */
export type ConsoleOutputType =
  | "text"
  | "json"
  | "table"
  | "error"
  | "warning"
  | "info"
  | "debug"
  | "progress"
  | "spinner";

/** Console output block. */
export interface ConsoleOutputBlock {
  id: string;
  type: ConsoleOutputType;
  content: unknown;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/** Progress bar data. */
export interface ProgressData {
  label: string;
  current: number;
  total: number;
  percent: number;
  status?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Metric & Alert Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Metric gauge data point. */
export interface MetricPoint {
  timestamp: number;
  value: number;
}

/** Metric gauge definition. */
export interface MetricGauge {
  id: string;
  label: string;
  unit: string;
  currentValue: number;
  minValue?: number;
  maxValue?: number;
  thresholdWarning?: number;
  thresholdCritical?: number;
  history: MetricPoint[];
  state: "ok" | "warning" | "critical";
}

/** Metric alert threshold. */
export interface MetricAlert {
  id: string;
  metricId: string;
  condition: "above" | "below" | "equals";
  threshold: number;
  severity: EventSeverity;
  triggered: boolean;
  triggeredAt?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Bookmark & Annotation Types
// ═══════════════════════════════════════════════════════════════════════════════

/** Trace bookmark. */
export interface TraceBookmark {
  id: string;
  eventId: string;
  label: string;
  timestamp: string;
  actor: string;
  note?: string;
}

/** Trace annotation. */
export interface TraceAnnotation {
  id: string;
  eventId: string;
  text: string;
  timestamp: string;
  actor: string;
  type: "note" | "warning" | "action";
}

// ═══════════════════════════════════════════════════════════════════════════════
// Component Shared Props
// ═══════════════════════════════════════════════════════════════════════════════

/** Base props applied to all runtime-trace-console components. */
export interface BaseComponentProps {
  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data attribute for testing. */
  "data-testid"?: string;
}

/** Common handler for selection changes. */
export type SelectionHandler<T> = (item: T) => void;

/** Common handler for filter changes. */
export type FilterHandler<T> = (filters: T) => void;
