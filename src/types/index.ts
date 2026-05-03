/**
 * ============================================================
 * Torafirma Design System v2 — Universal Type Definitions
 * ============================================================
 *
 * Derived from:
 *   01 — Torafirma Product Architecture Constitution
 *   02 — Torafirma Interaction & Command Grammar
 *   03.0 — Torafirma Component System Overview
 *   03.1 — Torafirma Command & Action Components
 *   v2 additions: State Machines, Layouts, Rules, Hooks, Utils
 *
 * This module exports the complete type system for Torafirma components,
 * commands, validation, trace, authority, state machines, layouts,
 * rules, hooks, and theme semantics.
 * ============================================================
 */

import type React from 'react';

// ============================================================================
// 1. CORE COMPONENT STATE TYPES
// (From 03.0 Sections 5.1, 6.1)
// ============================================================================

/**
 * Canonical runtime/UI states a Torafirma component may occupy.
 */
export type TorafirmaComponentState =
  | 'idle'
  | 'ready'
  | 'dirty'
  | 'validating'
  | 'valid'
  | 'warning'
  | 'blocked'
  | 'staged'
  | 'running'
  | 'complete'
  | 'degraded'
  | 'faulted'
  | 'locked'
  | 'simulated'
  | 'committed'
  | 'deployed'
  | 'disconnected';

/**
 * Authority levels governing access to consequential actions.
 */
export type AuthorityLevel =
  | 'AUTH_0_OBSERVE'
  | 'AUTH_1_DRAFT'
  | 'AUTH_2_STAGE'
  | 'AUTH_3_EXECUTE'
  | 'AUTH_4_COMMIT'
  | 'AUTH_5_OVERRIDE'
  | 'AUTH_6_ROOT';

/**
 * Visual density modes for operational layouts.
 */
export type ComponentDensity = 'compact' | 'standard' | 'field';

/**
 * Criticality tiers for component consequence and audit behavior.
 */
export type ComponentCriticality =
  | 'passive'
  | 'informational'
  | 'operational'
  | 'warning'
  | 'critical'
  | 'audit';

// ============================================================================
// 2. BASE COMPONENT PROPS
// (From 03.0 Section 5.2)
// ============================================================================

/**
 * Universal baseline props inherited by all substantial Torafirma components.
 */
export interface TorafirmaComponentBaseProps {
  /** Component identity. */
  id?: string;
  /** Human-readable name or action label. */
  label?: string;
  /** Extended description or tooltip content. */
  description?: string;
  /** Current runtime/UI state. */
  state?: TorafirmaComponentState;
  /** Current actor authority level. */
  authority?: AuthorityLevel;
  /** Minimum authority required to interact. */
  requiredAuthority?: AuthorityLevel;
  /** Layout density. */
  density?: ComponentDensity;
  /** Operational criticality tier. */
  criticality?: ComponentCriticality;
  /** Whether the component is non-interactive. */
  disabled?: boolean;
  /** Reason for disabled state (must be provided when disabled). */
  disabledReason?: string;
  /** Trace identifier for audit linkage. */
  traceId?: string;
  /** Test identifier for automation. */
  testId?: string;
  /** Additional CSS classes for the outer element. */
  className?: string;
  /** DOM `data-testid` attribute for automation (alias of `testId` in some components). */
  'data-testid'?: string;
}

// ============================================================================
// 3. COMMAND TYPES
// (From 03.1 Sections 4.1–4.4)
// ============================================================================

/**
 * Semantic command classes describing operational consequence.
 */
export type CommandClass =
  | 'observe'
  | 'draft'
  | 'validate'
  | 'stage'
  | 'execute'
  | 'commit'
  | 'deploy'
  | 'control'
  | 'destructive'
  | 'authority';

/**
 * Runtime states a command may occupy.
 */
export type CommandState =
  | 'available'
  | 'disabled'
  | 'blocked'
  | 'requires_confirmation'
  | 'requires_authority'
  | 'queued'
  | 'staged'
  | 'running'
  | 'complete'
  | 'failed';

/**
 * Structured reason when a component or command is blocked.
 * (From 03.0 Section 6.3)
 */
export interface BlockedStateReason {
  /** Machine-readable blocking condition code. */
  reasonCode: string;
  /** Human-readable explanation. */
  message: string;
  /** Suggested resolution action. */
  requiredAction?: string;
  /** Authority required to resolve the block. */
  requiredAuthority?: AuthorityLevel;
}

/**
 * Full descriptor for a structured command.
 * (From 03.1 Section 4.3)
 */
export interface CommandDescriptor {
  /** Unique command identifier. */
  id: string;
  /** Human-readable command label. */
  label: string;
  /** Machine operation name (e.g. workflow.execute). */
  operation: string;
  /** Semantic command class. */
  commandClass: CommandClass;
  /** Target object identifier. */
  target?: string;
  /** Type of the target object. */
  targetType?: string;
  /** Extended description or consequence statement. */
  description?: string;
  /** Current command runtime state. */
  state: CommandState;
  /** Minimum authority needed to execute. */
  requiredAuthority?: AuthorityLevel;
  /** Actor's current authority level. */
  currentAuthority?: AuthorityLevel;
  /** Reason the command is disabled. */
  disabledReason?: string;
  /** Structured block reason when state is blocked. */
  blockedReason?: BlockedStateReason;
  /** Whether the command requires confirmation before execution. */
  requiresConfirmation?: boolean;
  /** Whether the command must produce a trace record. */
  requiresTrace?: boolean;
  /** Whether the command is destructive. */
  destructive?: boolean;
  /** Audit depth for this command. */
  auditLevel?: 'none' | 'trace' | 'audit';
  /** Keyboard shortcut string. */
  shortcut?: string;
  /** Search aliases for command palette discovery. */
  aliases?: string[];
}

/**
 * Result payload returned after command dispatch.
 * (From 03.1 Section 4.4)
 */
export interface CommandResult {
  /** Identifier of the command that produced this result. */
  commandId: string;
  /** Outcome classification. */
  result: 'accepted' | 'rejected' | 'blocked' | 'failed' | 'cancelled' | 'complete';
  /** Human-readable outcome message. */
  message: string;
  /** State after command execution. */
  stateAfter?: string;
  /** Trace identifier for audit linkage. */
  traceId?: string;
  /** Machine-readable reason code for non-success outcomes. */
  reasonCode?: string;
}

// ============================================================================
// 4. VALIDATION TYPES
// (From 03.0 Section 9.2)
// ============================================================================

/**
 * Structured validation result for drafts, graphs, policies, or data.
 */
export interface ValidationResult {
  /** Validation status classification. */
  status: 'unchecked' | 'validating' | 'valid' | 'warning' | 'blocked' | 'faulted';
  /** Machine-readable reason code for non-valid outcomes. */
  reasonCode?: string;
  /** Human-readable explanation. */
  message?: string;
  /** Object identifiers affected by the validation result. */
  affectedObjects?: string[];
  /** Suggested next action to resolve issues. */
  requiredAction?: string;
  /** Authority required to resolve or override. */
  requiredAuthority?: AuthorityLevel;
}

// ============================================================================
// 5. TRACE TYPES
// (From 01 Section 11.2)
// ============================================================================

/**
 * Structured trace event shape for audit and operational logging.
 */
export interface TraceEvent {
  /** Unique trace event identifier. */
  event_id: string;
  /** ISO 8601 timestamp of the event. */
  timestamp: string;
  /** Actor who initiated the operation. */
  actor: string;
  /** Authority level held by the actor at the time. */
  authority: string;
  /** Operation name (e.g. workflow.execute). */
  operation: string;
  /** Target object identifier. */
  target: string;
  /** State before the operation. */
  state_before: string;
  /** State after the operation. */
  state_after: string;
  /** Outcome classification. */
  result: string;
  /** Machine-readable reason code, or null. */
  reason_code: string | null;
  /** Runtime target where the operation occurred. */
  runtime: string;
  /** Parent trace identifier for nested operations, or null. */
  parent_trace: string | null;
}

// ============================================================================
// 6. SEMANTIC VARIANT & THEME TYPES
// (From 03.0 Section 7.1 and product architecture)
// ============================================================================

/**
 * Semantic visual variants describing operational meaning, not decoration.
 */
export type SemanticVariant =
  | 'neutral'
  | 'inspect'
  | 'run'
  | 'warning'
  | 'instability'
  | 'danger'
  | 'stream'
  | 'model'
  | 'authority';

/**
 * Torafirma product themes.
 */
export type TorafirmaTheme =
  | 'command-dark'
  | 'field-green'
  | 'deep-blue'
  | 'forge'
  | 'redline';

// ============================================================================
// 7. COMPONENT-SPECIFIC PROPS
// (From 03.1 — Command & Action Components)
// ============================================================================

/**
 * Props for CommandButton — initiates one clearly defined command.
 * (From 03.1 Section 7.5)
 */
export interface CommandButtonProps extends TorafirmaComponentBaseProps {
  /** Structured command descriptor. */
  command: CommandDescriptor;
  /** Semantic visual variant. */
  variant?: SemanticVariant;
  /** Button size. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'field';
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Whether to display keyboard shortcut hint. */
  showShortcut?: boolean;
  /** Whether to display authority marker. */
  showAuthority?: boolean;
  /** Whether the button is in a loading/activity state. */
  loading?: boolean;
  /** Handler invoked when the command is activated. */
  onCommand: (command: CommandDescriptor) => void;
}

/**
 * Props for CommandButtonGroup — presents a small set of related commands.
 * (From 03.1 Section 8.5)
 */
export interface CommandButtonGroupProps {
  /** Optional group label. */
  label?: string;
  /** Array of command descriptors to render. */
  commands: CommandDescriptor[];
  /** Layout orientation. */
  orientation?: 'horizontal' | 'vertical';
  /** Layout density. */
  density?: ComponentDensity;
  /** Whether to visually separate destructive commands. */
  separateDestructive?: boolean;
  /** Handler invoked when a command is activated. */
  onCommand: (command: CommandDescriptor) => void;
}

/**
 * Props for ActionBar — exposes primary actions for a surface, object, or workflow stage.
 * (From 03.1 Section 9.6)
 */
export interface ActionBarProps {
  /** Context label describing the current surface or mode. */
  contextLabel?: string;
  /** Current state of the object or surface. */
  state?: TorafirmaComponentState;
  /** Primary (dominant next) command. */
  primaryCommand?: CommandDescriptor;
  /** Secondary commands. */
  secondaryCommands?: CommandDescriptor[];
  /** Commands available via overflow menu. */
  overflowCommands?: CommandDescriptor[];
  /** Destructive commands (must be visually separated). */
  destructiveCommands?: CommandDescriptor[];
  /** Current actor authority. */
  authority?: AuthorityLevel;
  /** Layout density. */
  density?: ComponentDensity;
  /** Handler invoked when any command is activated. */
  onCommand: (command: CommandDescriptor) => void;
}

/**
 * Context object passed to the CommandPalette for object-aware filtering.
 * (From 03.1 Section 10.5)
 */
export interface CommandPaletteContext {
  /** Currently selected object identifiers. */
  selection?: string[];
  /** Active workspace name. */
  workspace?: string;
  /** Active runtime target. */
  runtime?: string;
  /** Current product mode. */
  mode?: string;
}

/**
 * Props for CommandPalette — universal keyboard-first command surface.
 * (From 03.1 Section 10.5)
 */
export interface CommandPaletteProps {
  /** Whether the palette is open. */
  open: boolean;
  /** Current search query. */
  query: string;
  /** Available commands. */
  commands: CommandDescriptor[];
  /** Recently used commands. */
  recentCommands?: CommandDescriptor[];
  /** Operational context for filtering and object-aware commands. */
  context?: CommandPaletteContext;
  /** Handler when the search query changes. */
  onQueryChange: (query: string) => void;
  /** Handler when a command is selected. */
  onCommand: (command: CommandDescriptor) => void;
  /** Handler when the palette is dismissed. */
  onClose: () => void;
}

/**
 * Props for ContextMenu — exposes commands specific to an object or selection.
 * (From 03.1 Section 11.5)
 */
export interface ContextMenuProps {
  /** Whether the menu is open. */
  open: boolean;
  /** Anchor point coordinates for menu placement. */
  anchorPoint: { x: number; y: number };
  /** Target object identifier. */
  target?: string;
  /** Type of the target object. */
  targetType?: string;
  /** Commands available in this context. */
  commands: CommandDescriptor[];
  /** Handler when a command is selected. */
  onCommand: (command: CommandDescriptor) => void;
  /** Handler when the menu is dismissed. */
  onClose: () => void;
}

/**
 * Props for KebabActionMenu — compact overflow access to secondary actions.
 * (Inferred from 03.1 Section 12)
 */
export interface KebabActionMenuProps {
  /** Whether the menu is open. */
  open: boolean;
  /** Commands available in this overflow menu. */
  commands: CommandDescriptor[];
  /** Target object identifier for accessible labeling. */
  target?: string;
  /** Whether destructive commands exist inside (affects indicator). */
  hasDestructive?: boolean;
  /** Handler when a command is selected. */
  onCommand: (command: CommandDescriptor) => void;
  /** Handler when the menu is dismissed. */
  onClose: () => void;
}

/**
 * Props for ConfirmActionModal — confirms consequential but non-destructive commands.
 * (From 03.1 Section 13.5)
 */
export interface ConfirmActionModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Command being confirmed. */
  command: CommandDescriptor;
  /** Target object identifier. */
  target?: string;
  /** Objects affected by the operation. */
  affectedObjects?: string[];
  /** Consequence statement. */
  consequence: string;
  /** Required authority for the operation. */
  authority?: AuthorityLevel;
  /** Trace behavior description. */
  traceBehavior?: string;
  /** Optional diff or preview content. */
  preview?: React.ReactNode;
  /** Specific label for the confirm action button. */
  confirmLabel: string;
  /** Label for the cancel action button. */
  cancelLabel?: string;
  /** Handler when the action is confirmed. */
  onConfirm: () => void;
  /** Handler when the action is cancelled. */
  onCancel: () => void;
}

/**
 * Props for DestructiveActionModal — confirms destructive operations.
 * Extends ConfirmActionModalProps with destructive-specific fields.
 * (From 03.1 Section 14.6)
 */
export interface DestructiveActionModalProps extends ConfirmActionModalProps {
  /** Classification of destructive severity. */
  severity: 'delete' | 'purge' | 'reset' | 'revoke' | 'root';
  /** Whether the operation is irreversible. */
  irreversible?: boolean;
  /** List of dependent objects or systems impacted. */
  dependencyImpact?: string[];
  /** Phrase the user must type to confirm high-risk operations. */
  confirmationPhrase?: string;
  /** Whether an audit record is required. */
  auditRequired?: boolean;
}

/**
 * Props for AuthorityActionModal — confirms or requests elevated authority.
 * (From 03.1 Section 15.6)
 */
export interface AuthorityActionModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Command requiring authority elevation. */
  command: CommandDescriptor;
  /** Actor's current authority level. */
  currentAuthority: AuthorityLevel;
  /** Authority level required for the operation. */
  requiredAuthority: AuthorityLevel;
  /** Scope of the authority request. */
  scope: string;
  /** Objects affected by the elevated operation. */
  affectedObjects?: string[];
  /** Whether a reason must be supplied. */
  reasonRequired?: boolean;
  /** Available expiry options for temporary elevation. */
  expiryOptions?: string[];
  /** Destination for the audit record. */
  auditDestination?: string;
  /** Handler when authority is granted. */
  onAuthorize: (reason: string, expiry?: string) => void;
  /** Handler when authority is rejected. */
  onReject: () => void;
}

/**
 * Props for CircuitBreaker — safety control for interrupting dangerous execution.
 * (From 03.1 Section 16.7)
 */
export interface CircuitBreakerProps {
  /** Whether the breaker target is currently active. */
  active: boolean;
  /** Breaker action variant. */
  variant: 'stop' | 'abort' | 'trip' | 'hold' | 'isolate';
  /** Target process or runtime identifier. */
  target: string;
  /** Runtime target name. */
  runtime?: string;
  /** Whether confirmation is required before tripping. */
  requiresConfirmation?: boolean;
  /** Current breaker arm state. */
  state?: 'armed' | 'tripped' | 'disabled' | 'cooldown';
  /** Reason the breaker is disabled. */
  disabledReason?: string;
  /** Handler invoked when the breaker is tripped. */
  onTrip: () => void;
}

/**
 * Enriched command descriptor with queue lifecycle timestamps and result.
 * (From 03.1 Section 17.6)
 */
export interface QueuedCommandDescriptor extends CommandDescriptor {
  /** ISO timestamp when the command was queued. */
  queuedAt?: string;
  /** ISO timestamp when execution started. */
  startedAt?: string;
  /** ISO timestamp when execution completed. */
  completedAt?: string;
  /** Final result of command execution. */
  result?: CommandResult;
}

/**
 * Props for CommandQueue — displays pending, staged, running, and completed commands.
 * (From 03.1 Section 17.6)
 */
export interface CommandQueueProps {
  /** Commands in the queue with lifecycle metadata. */
  commands: QueuedCommandDescriptor[];
  /** Identifier of the currently active command. */
  activeCommandId?: string;
  /** Handler for queue actions (abort, hold, resume, remove, etc.). */
  onCommandAction: (commandId: string, action: string) => void;
}

/**
 * Props for StagedActionPanel — displays changes prepared for execution or commit.
 * (From 03.1 Section 18.6)
 */
export interface StagedActionPanelProps {
  /** Staged command descriptors. */
  stagedActions: CommandDescriptor[];
  /** Validation result for the staged changes. */
  validation?: ValidationResult;
  /** Objects affected by the staged changes. */
  affectedObjects?: string[];
  /** Authority required for the next action. */
  requiredAuthority?: AuthorityLevel;
  /** Optional diff or impact preview content. */
  diffPreview?: React.ReactNode;
  /** Handler when a staged command action is selected. */
  onCommand: (command: CommandDescriptor) => void;
}

/**
 * Props for ActionTooltip — explains command behavior, disabled reason, or authority.
 * (Inferred from 03.1 Section 19)
 */
export interface ActionTooltipProps {
  /** Target element or command descriptor the tooltip describes. */
  command?: CommandDescriptor;
  /** Explicit tooltip content (overrides derived content). */
  content?: React.ReactNode;
  /** Whether the described command is disabled. */
  disabled?: boolean;
  /** Reason the command is disabled. */
  disabledReason?: string;
  /** Current authority level of the actor. */
  currentAuthority?: AuthorityLevel;
  /** Children (the wrapped element). */
  children: React.ReactNode;
}

/**
 * Props for CommandResultToast — briefly reports command outcome.
 * (Inferred from 03.1 Section 20)
 */
export interface CommandResultToastProps {
  /** Toast visual variant. */
  variant: 'success' | 'info' | 'warning' | 'error' | 'critical';
  /** Outcome message. */
  message: string;
  /** Associated command result. */
  result?: CommandResult;
  /** Trace identifier for linking. */
  traceId?: string;
  /** Whether the toast is visible. */
  open: boolean;
  /** Handler when the toast is dismissed. */
  onDismiss?: () => void;
  /** Optional action to open the trace. */
  onOpenTrace?: (traceId: string) => void;
}

/**
 * Props for InlineCommandPrompt — captures natural-language or command-line intent.
 * (From 03.1 Section 21.5)
 */
export interface InlineCommandPromptProps {
  /** Operational context label. */
  context: string;
  /** Intent capture mode. */
  mode: 'explain' | 'propose' | 'draft' | 'patch' | 'validate' | 'command';
  /** Current input value. */
  value: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Current actor authority. */
  authority?: AuthorityLevel;
  /** Handler when the input value changes. */
  onChange: (value: string) => void;
  /** Handler when the prompt is submitted. */
  onSubmit: (value: string, mode: string) => void;
}

/**
 * Props for InspectorActionList — commands available for the selected inspector object.
 * (Inferred from 03.1 Section 22)
 */
export interface InspectorActionListProps {
  /** Summary of the current selection. */
  selectionSummary?: string;
  /** Primary actions for the selected object. */
  primaryActions?: CommandDescriptor[];
  /** Validation and staging actions. */
  validationActions?: CommandDescriptor[];
  /** Runtime execution actions. */
  runtimeActions?: CommandDescriptor[];
  /** Authority-gated actions. */
  authorityActions?: CommandDescriptor[];
  /** Destructive actions (must be visually separated). */
  destructiveActions?: CommandDescriptor[];
  /** Current actor authority. */
  currentAuthority?: AuthorityLevel;
  /** Handler when an action is selected. */
  onCommand: (command: CommandDescriptor) => void;
}

// ============================================================================
// 8. AUXILIARY / COMPOSITE TYPES
// ============================================================================

/**
 * Selection types supported across Torafirma products.
 * (From 02 Section 9.1)
 */
export type SelectionType =
  | 'none'
  | 'single'
  | 'multi'
  | 'range'
  | 'zone'
  | 'path'
  | 'trace';

/**
 * Canonical product shell region identifiers.
 * (From 01 Section 4)
 */
export type ShellRegion =
  | 'topCommandBar'
  | 'leftNavRail'
  | 'primaryWorkspace'
  | 'rightInspector'
  | 'bottomTraceConsole'
  | 'statusFooter';

/**
 * Canonical graph object types.
 * (From 01 Section 13.1)
 */
export type GraphObjectType =
  | 'node'
  | 'edge'
  | 'port'
  | 'layer'
  | 'zone'
  | 'contract'
  | 'runtimeBinding'
  | 'policyGate';

/**
 * Canonical data object types.
 * (From 01 Section 14.1)
 */
export type DataObjectType =
  | 'source'
  | 'dataset'
  | 'record'
  | 'transform'
  | 'validation'
  | 'correction'
  | 'nonConformance'
  | 'certificate';

/**
 * AI output classes describing the maturity of AI-generated content.
 * (From 01 Section 8.2)
 */
export type AIOutputClass =
  | 'suggestion'
  | 'draft'
  | 'patch'
  | 'stagedChange'
  | 'executedAction'
  | 'committedArtifact';

/**
 * Command availability context used by central command registry functions.
 * (From 03.1 Section 26.3)
 */
export interface CommandContext {
  /** Current selection identifiers. */
  selection?: string[];
  /** Active workspace. */
  workspace?: string;
  /** Active runtime target. */
  runtime?: string;
  /** Current product mode. */
  mode?: string;
  /** Current actor authority. */
  authority?: AuthorityLevel;
  /** Current validation state. */
  validation?: ValidationResult;
  /** Current component state. */
  state?: TorafirmaComponentState;
}

/**
 * Function signature for computing command availability.
 * (From 03.1 Section 26.3)
 */
export type GetCommandAvailability = (
  context: CommandContext,
  command: CommandDescriptor,
) => CommandState;

/**
 * Function signature for dispatching a command through governance.
 * (From 03.1 Section 26.4)
 */
export type DispatchCommand = (
  command: CommandDescriptor,
) => Promise<CommandResult>;

/**
 * Intent object shape from the interaction layer.
 * (From 01 Section 3.3)
 */
export interface IntentDescriptor {
  /** Actor who initiated the intent. */
  actor: string;
  /** ISO timestamp. */
  timestamp: string;
  /** Target object identifier. */
  targetObject: string;
  /** Operation name. */
  operation: string;
  /** Operation parameters. */
  parameters?: Record<string, unknown>;
  /** Current authority level of the actor. */
  currentAuthority: AuthorityLevel;
  /** Source interface component. */
  sourceInterface: string;
  /** Optional natural-language rationale. */
  rationale?: string;
}

/**
 * Structured failure message shape.
 * (From 01 Section 12.2, 03.0 Section 15.2)
 */
export interface FailureMessage {
  /** Operation that failed. */
  operation: string;
  /** Specific cause of failure. */
  reason: string;
  /** What did or did not happen. */
  impact: string;
  /** Recommended next action. */
  recovery: string;
  /** Trace identifier if available. */
  traceId?: string;
}

/**
 * Row state types for command queue entries.
 * (From 03.1 Section 17.4)
 */
export type QueueRowState =
  | 'queued'
  | 'staged'
  | 'running'
  | 'blocked'
  | 'failed'
  | 'complete'
  | 'cancelled'
  | 'aborted';

/**
 * Audit level classifications.
 */
export type AuditLevel = 'none' | 'trace' | 'audit';

// ============================================================================
// v2: 9. STATE MACHINE TYPES
// ============================================================================

/**
 * A transition guard function that determines if a state transition is allowed.
 */
export type StateGuard = (
  from: TorafirmaComponentState,
  to: TorafirmaComponentState,
  context: StateMachineContext,
) => boolean;

/**
 * A state transition action executed on entering a state.
 */
export type StateEntryAction = (
  from: TorafirmaComponentState,
  to: TorafirmaComponentState,
  context: StateMachineContext,
) => void;

/**
 * A state transition effect executed on leaving a state.
 */
export type StateExitAction = (
  from: TorafirmaComponentState,
  to: TorafirmaComponentState,
  context: StateMachineContext,
) => void;

/**
 * Context object passed to state machine guards and actions.
 */
export interface StateMachineContext {
  /** Current authority level of the actor. */
  authority?: AuthorityLevel;
  /** Current validation state. */
  validation?: ValidationResult;
  /** Whether there are pending changes. */
  hasPendingChanges?: boolean;
  /** Whether required fields are complete. */
  requiredFieldsComplete?: boolean;
  /** Custom context data. */
  data?: Record<string, unknown>;
}

/**
 * Defines a single allowed transition between two states.
 */
export interface StateTransition {
  /** Source state. */
  from: TorafirmaComponentState;
  /** Target state. */
  to: TorafirmaComponentState;
  /** Event that triggers this transition. */
  event: string;
  /** Optional guard condition. */
  guard?: StateGuard;
  /** Optional action executed on transition. */
  action?: StateEntryAction;
}

/**
 * Configuration for a state machine defining all states and transitions.
 */
export interface StateMachineConfig {
  /** Initial state of the machine. */
  initial: TorafirmaComponentState;
  /** All states and their entry/exit actions. */
  states: Record<
    TorafirmaComponentState,
    {
      /** Entry action for this state. */
      onEnter?: StateEntryAction;
      /** Exit action for this state. */
      onExit?: StateExitAction;
    }
  >;
  /** All allowed transitions. */
  transitions: StateTransition[];
}

/**
 * Current snapshot of a running state machine instance.
 */
export interface StateMachineSnapshot {
  /** Current state. */
  current: TorafirmaComponentState;
  /** Previous state (null on first entry). */
  previous: TorafirmaComponentState | null;
  /** Event that caused the current state. */
  lastEvent: string | null;
  /** Timestamp of the last transition. */
  lastTransitionAt: string | null;
  /** Whether the machine can accept events. */
  canAccept: boolean;
  /** Available transitions from the current state. */
  availableTransitions: StateTransition[];
}

/**
 * Types of events that can trigger state transitions.
 */
export type StateMachineEventType =
  | 'INIT'
  | 'VALIDATE'
  | 'VALIDATION_PASSED'
  | 'VALIDATION_FAILED'
  | 'STAGE'
  | 'UNSTAGE'
  | 'EXECUTE'
  | 'EXECUTION_COMPLETE'
  | 'EXECUTION_FAILED'
  | 'COMMIT'
  | 'ROLLBACK'
  | 'BLOCK'
  | 'UNBLOCK'
  | 'FAULT'
  | 'RECOVER'
  | 'LOCK'
  | 'UNLOCK'
  | 'RESET'
  | 'USER_INPUT'
  | 'TIMEOUT';

// ============================================================================
// v2: 10. LAYOUT TYPES
// ============================================================================

/**
 * Canonical layout template identifiers.
 */
export type LayoutTemplate =
  | 'command-center'
  | 'split-pane'
  | 'inspector-right'
  | 'inspector-left'
  | 'full-workspace'
  | 'dual-sidebar'
  | 'minimap'
  | 'panel-stack'
  | 'mobile-drawer'
  | 'responsive-grid';

/**
 * Panel configuration for layout systems.
 */
export interface LayoutPanelConfig {
  /** Panel identifier. */
  id: string;
  /** Panel display label. */
  label: string;
  /** Panel region in the layout. */
  region: ShellRegion;
  /** Default width (for horizontal panels). */
  defaultWidth?: number;
  /** Default height (for vertical panels). */
  defaultHeight?: number;
  /** Whether the panel can be resized. */
  resizable?: boolean;
  /** Whether the panel can be collapsed. */
  collapsible?: boolean;
  /** Whether the panel starts collapsed. */
  defaultCollapsed?: boolean;
  /** Minimum size in pixels. */
  minSize?: number;
  /** Maximum size in pixels. */
  maxSize?: number;
  /** Panel content z-index. */
  zIndex?: number;
}

/**
 * Responsive breakpoint configuration.
 */
export interface LayoutBreakpoint {
  /** Breakpoint name. */
  name: 'mobile' | 'tablet' | 'desktop' | 'wide';
  /** Minimum width in pixels. */
  minWidth: number;
  /** Maximum width in pixels (0 for unbounded). */
  maxWidth: number;
  /** Active layout template at this breakpoint. */
  template: LayoutTemplate;
  /** Visible panels at this breakpoint. */
  visiblePanels: string[];
}

/**
 * Current layout state snapshot.
 */
export interface LayoutState {
  /** Active layout template. */
  template: LayoutTemplate;
  /** Active breakpoint. */
  breakpoint: LayoutBreakpoint['name'];
  /** Panel states keyed by panel ID. */
  panels: Record<string, {
    /** Whether the panel is visible. */
    visible: boolean;
    /** Current width in pixels. */
    width?: number;
    /** Current height in pixels. */
    height?: number;
    /** Whether the panel is collapsed. */
    collapsed: boolean;
    /** Whether the panel is focused. */
    focused: boolean;
  }>;
}

/**
 * Drawer position variants.
 */
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Toast position variants.
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// ============================================================================
// v2: 11. RULES ENGINE TYPES
// ============================================================================

/**
 * Rule operator for condition evaluation.
 */
export type RuleOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'nin'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'matches'
  | 'exists'
  | 'notEmpty';

/**
 * A single condition in a rule.
 */
export interface RuleCondition {
  /** Field path to evaluate (dot notation). */
  field: string;
  /** Comparison operator. */
  operator: RuleOperator;
  /** Value to compare against. */
  value?: unknown;
}

/**
 * Logical group of conditions.
 */
export interface RuleConditionGroup {
  /** Logical operator for grouping. */
  operator: 'and' | 'or';
  /** Child conditions or nested groups. */
  conditions: (RuleCondition | RuleConditionGroup)[];
}

/**
 * A rule with conditions and an action.
 */
export interface Rule {
  /** Unique rule identifier. */
  id: string;
  /** Human-readable rule name. */
  name: string;
  /** Rule priority (higher = evaluated first). */
  priority: number;
  /** Whether the rule is active. */
  active: boolean;
  /** Conditions that must be met. */
  condition: RuleConditionGroup;
  /** Action to take when conditions are met. */
  action: RuleAction;
  /** Authority required to override this rule. */
  overrideAuthority?: AuthorityLevel;
}

/**
 * Action taken when a rule's conditions are met.
 */
export interface RuleAction {
  /** Action type. */
  type: 'block' | 'warn' | 'require_authority' | 'require_confirmation' | 'set_state' | 'notify';
  /** Action parameters. */
  params: Record<string, unknown>;
  /** Human-readable action message. */
  message: string;
}

/**
 * Result of evaluating a ruleset.
 */
export interface RulesetEvaluationResult {
  /** Whether all rules passed. */
  passed: boolean;
  /** Rules that fired. */
  firedRules: Rule[];
  /** Rules that were blocked. */
  blockedRules: Rule[];
  /** Highest severity action triggered. */
  severity: 'none' | 'warn' | 'block';
  /** Messages from fired rules. */
  messages: string[];
  /** Required authority if any rule demands elevation. */
  requiredAuthority?: AuthorityLevel;
}

// ============================================================================
// v2: 12. HOOK TYPES
// ============================================================================

/**
 * Return type for the useAuthority hook.
 */
export interface UseAuthorityReturn {
  /** Current authority level. */
  authority: AuthorityLevel;
  /** Whether the current authority meets the required level. */
  hasRequiredAuthority: (required: AuthorityLevel) => boolean;
  /** Request authority elevation. */
  requestElevation: (target: AuthorityLevel, reason: string) => Promise<boolean>;
  /** Whether an elevation request is pending. */
  isElevating: boolean;
  /** Available authority levels for the current user. */
  availableLevels: AuthorityLevel[];
}

/**
 * Return type for the useComponentState hook.
 */
export interface UseComponentStateReturn {
  /** Current component state. */
  state: TorafirmaComponentState;
  /** Transition to a new state. */
  transition: (event: StateMachineEventType, context?: Partial<StateMachineContext>) => boolean;
  /** Whether a transition to the given state is allowed. */
  canTransition: (target: TorafirmaComponentState) => boolean;
  /** Available next states. */
  availableStates: TorafirmaComponentState[];
  /** Current state machine snapshot. */
  snapshot: StateMachineSnapshot;
  /** Whether the component is in a loading state. */
  isLoading: boolean;
  /** Whether the component is in a terminal state. */
  isTerminal: boolean;
}

/**
 * Return type for the useTheme hook.
 */
export interface UseThemeReturn {
  /** Current active theme. */
  theme: TorafirmaTheme;
  /** Set the active theme. */
  setTheme: (theme: TorafirmaTheme) => void;
  /** Available themes. */
  availableThemes: TorafirmaTheme[];
  /** Whether the system prefers dark mode. */
  systemPrefersDark: boolean;
  /** Whether the theme is currently changing. */
  isTransitioning: boolean;
}

/**
 * Return type for the useTrace hook.
 */
export interface UseTraceReturn {
  /** Current trace ID. */
  traceId: string | null;
  /** Generate a new trace ID. */
  startTrace: (operation: string, target: string) => string;
  /** End the current trace. */
  endTrace: (result: string, reasonCode?: string) => void;
  /** Log a trace event. */
  logEvent: (event: Partial<TraceEvent>) => void;
  /** Whether tracing is active. */
  isTracing: boolean;
}

/**
 * Return type for the useCommand hook.
 */
export interface UseCommandReturn {
  /** Execute a command with full governance. */
  execute: (command: CommandDescriptor) => Promise<CommandResult>;
  /** Whether a command is currently executing. */
  isExecuting: boolean;
  /** Last command result. */
  lastResult: CommandResult | null;
  /** Whether the last command failed. */
  hasError: boolean;
  /** Clear the last result. */
  clear: () => void;
}

/**
 * Return type for the useValidation hook.
 */
export interface UseValidationReturn<T = unknown> {
  /** Current validation result. */
  validation: ValidationResult;
  /** Run validation on the given value. */
  validate: (value: T) => Promise<ValidationResult>;
  /** Whether validation is in progress. */
  isValidating: boolean;
  /** Whether the current value is valid. */
  isValid: boolean;
  /** Validation errors if any. */
  errors: string[];
  /** Reset validation state. */
  reset: () => void;
}

/**
 * Telemetry event for operational analytics.
 */
export interface TelemetryEvent {
  /** Event category. */
  category: 'interaction' | 'performance' | 'error' | 'state_change' | 'command';
  /** Event action. */
  action: string;
  /** Event label. */
  label?: string;
  /** Numeric value. */
  value?: number;
  /** Custom dimensions. */
  dimensions?: Record<string, string>;
  /** Timestamp. */
  timestamp: string;
}

/**
 * Return type for the useTelemetry hook.
 */
export interface UseTelemetryReturn {
  /** Track a telemetry event. */
  track: (event: Omit<TelemetryEvent, 'timestamp'>) => void;
  /** Track a page/view. */
  trackView: (viewName: string, dimensions?: Record<string, string>) => void;
  /** Track an error. */
  trackError: (error: Error, context?: Record<string, string>) => void;
  /** Whether telemetry is enabled. */
  enabled: boolean;
  /** Set telemetry enabled state. */
  setEnabled: (enabled: boolean) => void;
}

/**
 * Return type for the useModal hook.
 */
export interface UseModalReturn {
  /** Whether the modal is open. */
  open: boolean;
  /** Open the modal with optional content props. */
  show: (props?: Record<string, unknown>) => void;
  /** Close the modal. */
  hide: () => void;
  /** Toggle modal state. */
  toggle: () => void;
  /** Props to pass to the modal content. */
  props: Record<string, unknown>;
}

/**
 * Toast item in the toast queue.
 */
export interface ToastItem {
  /** Unique toast identifier. */
  id: string;
  /** Toast variant. */
  variant: 'success' | 'info' | 'warning' | 'error' | 'critical';
  /** Toast message. */
  message: string;
  /** Duration in milliseconds (0 = persistent). */
  duration: number;
  /** Whether the toast is dismissible. */
  dismissible: boolean;
  /** Timestamp when the toast was created. */
  createdAt: string;
}

/**
 * Return type for the useToast hook.
 */
export interface UseToastReturn {
  /** Active toasts. */
  toasts: ToastItem[];
  /** Add a toast. */
  add: (toast: Omit<ToastItem, 'id' | 'createdAt'>) => string;
  /** Remove a toast by ID. */
  remove: (id: string) => void;
  /** Remove all toasts. */
  clear: () => void;
  /** Toast position. */
  position: ToastPosition;
}

/**
 * Return type for the useDrawer hook.
 */
export interface UseDrawerReturn {
  /** Whether the drawer is open. */
  open: boolean;
  /** Drawer position. */
  position: DrawerPosition;
  /** Open the drawer. */
  show: (position?: DrawerPosition) => void;
  /** Close the drawer. */
  hide: () => void;
  /** Toggle drawer state. */
  toggle: () => void;
  /** Whether the drawer is animating. */
  isAnimating: boolean;
}

// ============================================================================
// v2: 13. UTILITY TYPES
// ============================================================================

/**
 * Options for the classNames utility.
 */
export interface ClassNamesOptions {
  /** Base class names (always included). */
  base?: string;
  /** Conditional class names. */
  variants?: Record<string, boolean | undefined>;
  /** Responsive class names. */
  responsive?: Record<string, string>;
}

/**
 * Debounce options.
 */
export interface DebounceOptions {
  /** Delay in milliseconds. */
  delay: number;
  /** Whether to trigger on the leading edge. */
  leading?: boolean;
  /** Whether to trigger on the trailing edge. */
  trailing?: boolean;
}

/**
 * Throttle options.
 */
export interface ThrottleOptions {
  /** Interval in milliseconds. */
  interval: number;
  /** Whether to trigger on the leading edge. */
  leading?: boolean;
  /** Whether to trigger on the trailing edge. */
  trailing?: boolean;
}

/**
 * Deep merge options.
 */
export interface DeepMergeOptions {
  /** Whether to merge arrays (true) or replace (false). */
  mergeArrays?: boolean;
  /** Maximum depth to merge. */
  maxDepth?: number;
}

// ============================================================================
// v2: 14. COMPONENT FAMILY ENUMERATION
// All 12 component families for type-safe family references.
// ============================================================================

/**
 * All 12 component families in the Torafirma Design System.
 */
export type ComponentFamily =
  | 'action'
  | 'feedback'
  | 'input'
  | 'navigation'
  | 'data-display'
  | 'overlay'
  | 'authority'
  | 'ai-model'
  | 'stream-live'
  | 'safety-circuit'
  | 'trace-audit'
  | 'workspace-layout';

/**
 * Metadata describing a component family.
 */
export interface ComponentFamilyMeta {
  /** Family identifier. */
  family: ComponentFamily;
  /** Human-readable name. */
  name: string;
  /** Primary color accent. */
  accentColor: string;
  /** Semantic variant associated with this family. */
  variant: SemanticVariant;
  /** Component count in this family. */
  componentCount: number;
}
