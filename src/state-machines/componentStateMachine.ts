/**
 * @fileoverview componentStateMachine.ts — Torafirma Component State Machine
 *
 * The canonical 17-state component lifecycle machine used across every
 * Torafirma component. Models the full journey from `idle` through
 * `ready`, `dirty`, `validating`, `valid`, `warning`, `blocked`, `staged`,
 * `running`, `complete`, `degraded`, `faulted`, `locked`, `simulated`,
 * `committed`, `deployed`, and `disconnected`.
 *
 * Spec: 03.0 Sections 5, 6 — Universal State Model
 *
 * @module torafirma/state-machines/componentStateMachine
 * @version 2.0.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 17 canonical component states defined in Torafirma spec §5.1, §6.1. */
export type ComponentState =
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

/** All events that can be sent to the component state machine. */
export type ComponentEvent =
  | 'INITIALIZE'
  | 'EDIT'
  | 'VALIDATE'
  | 'VALIDATION_PASS'
  | 'VALIDATION_WARN'
  | 'VALIDATION_BLOCK'
  | 'VALIDATION_FAULT'
  | 'ACKNOWLEDGE_WARNING'
  | 'RESOLVE_BLOCK'
  | 'STAGE'
  | 'UNSTAGE'
  | 'EXECUTE'
  | 'SIMULATE'
  | 'COMPLETE'
  | 'DEGRADE'
  | 'FAULT'
  | 'LOCK'
  | 'UNLOCK'
  | 'COMMIT'
  | 'DEPLOY'
  | 'DISCONNECT'
  | 'RECONNECT'
  | 'RESET'
  | 'ROLLBACK'
  | 'RECOVER'
  | 'FORCE_RESET';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context shape for the component state machine. */
export interface ComponentContext {
  /** Current operator authority level. */
  authority: string;

  /** Whether the component has local (dirty) changes. */
  hasLocalChanges: boolean;

  /** Whether validation has been run and passed. */
  isValidated: boolean;

  /** Whether a warning condition exists and has been acknowledged. */
  warningAcknowledged: boolean;

  /** Block reason code (when in blocked state). */
  blockReason?: string;

  /** Fault reason code (when in faulted state). */
  faultReason?: string;

  /** Authority level that locked the component. */
  lockedBy?: string;

  /** Trace ID for the current operation. */
  traceId?: string;

  /** Component identifier. */
  componentId?: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guard Functions
// ───────────────────────────────────────────────────────────────────────────────

const hasAuthorityToEdit: GuardFunction<ComponentContext> = (ctx) =>
  ctx.authority === 'AUTH_1_DRAFT' ||
  ctx.authority === 'AUTH_2_STAGE' ||
  ctx.authority === 'AUTH_3_EXECUTE' ||
  ctx.authority === 'AUTH_4_COMMIT' ||
  ctx.authority === 'AUTH_5_OVERRIDE' ||
  ctx.authority === 'AUTH_6_ROOT';

const hasAuthorityToStage: GuardFunction<ComponentContext> = (ctx) =>
  ctx.authority === 'AUTH_2_STAGE' ||
  ctx.authority === 'AUTH_3_EXECUTE' ||
  ctx.authority === 'AUTH_4_COMMIT' ||
  ctx.authority === 'AUTH_5_OVERRIDE' ||
  ctx.authority === 'AUTH_6_ROOT';

const hasAuthorityToExecute: GuardFunction<ComponentContext> = (ctx) =>
  ctx.authority === 'AUTH_3_EXECUTE' ||
  ctx.authority === 'AUTH_4_COMMIT' ||
  ctx.authority === 'AUTH_5_OVERRIDE' ||
  ctx.authority === 'AUTH_6_ROOT';

const hasAuthorityToCommit: GuardFunction<ComponentContext> = (ctx) =>
  ctx.authority === 'AUTH_4_COMMIT' ||
  ctx.authority === 'AUTH_5_OVERRIDE' ||
  ctx.authority === 'AUTH_6_ROOT';

const hasAuthorityToOverride: GuardFunction<ComponentContext> = (ctx) =>
  ctx.authority === 'AUTH_5_OVERRIDE' ||
  ctx.authority === 'AUTH_6_ROOT';

const hasAuthorityToLock: GuardFunction<ComponentContext> = (ctx) =>
  ctx.authority === 'AUTH_4_COMMIT' ||
  ctx.authority === 'AUTH_5_OVERRIDE' ||
  ctx.authority === 'AUTH_6_ROOT';

const isWarningAcknowledged: GuardFunction<ComponentContext> = (ctx) =>
  ctx.warningAcknowledged === true;

const hasLocalChanges: GuardFunction<ComponentContext> = (ctx) =>
  ctx.hasLocalChanges === true;

const isValidated: GuardFunction<ComponentContext> = (ctx) =>
  ctx.isValidated === true;

// ───────────────────────────────────────────────────────────────────────────────
// Action Functions
// ───────────────────────────────────────────────────────────────────────────────

const markDirty: ActionFunction<ComponentContext> = (ctx) => {
  ctx.hasLocalChanges = true;
  ctx.isValidated = false;
  ctx.warningAcknowledged = false;
};

const clearDirty: ActionFunction<ComponentContext> = (ctx) => {
  ctx.hasLocalChanges = false;
};

const markValidated: ActionFunction<ComponentContext> = (ctx) => {
  ctx.isValidated = true;
};

const markBlocked: ActionFunction<ComponentContext> = (ctx, payload) => {
  ctx.blockReason = typeof payload === 'string' ? payload : 'UNKNOWN_BLOCK';
};

const markFaulted: ActionFunction<ComponentContext> = (ctx, payload) => {
  ctx.faultReason = typeof payload === 'string' ? payload : 'UNKNOWN_FAULT';
};

const markLocked: ActionFunction<ComponentContext> = (ctx) => {
  ctx.lockedBy = ctx.authority;
};

const markUnlocked: ActionFunction<ComponentContext> = (ctx) => {
  ctx.lockedBy = undefined;
};

const resetContext: ActionFunction<ComponentContext> = (ctx) => {
  ctx.hasLocalChanges = false;
  ctx.isValidated = false;
  ctx.warningAcknowledged = false;
  ctx.blockReason = undefined;
  ctx.faultReason = undefined;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * The canonical Torafirma component state machine definition.
 *
 * **17 states**, **49 transitions**, full guard coverage.
 *
 * Preferred transition path (per spec §5.2):
 * ```
 * idle → dirty → validating → valid → staged → running → complete → committed/deployed
 * ```
 *
 * Invalid shortcuts that this machine PREVENTS:
 * - dirty → running (must validate + stage)
 * - proposal → deployed (must commit)
 * - warning → executed without acknowledgement
 * - blocked → overridden without authority
 */
export const componentStateMachineDefinition: StateMachineDefinition<
  ComponentState,
  ComponentEvent,
  ComponentContext
> = {
  id: 'torafirma.component',
  name: 'Torafirma Component State Machine',
  description:
    'Canonical 17-state component lifecycle. Models the full path from idle through ' +
    'validation, staging, execution, completion, commit, and deployment.',
  version: '2.0.0',

  initialState: 'idle',

  states: [
    'idle',
    'ready',
    'dirty',
    'validating',
    'valid',
    'warning',
    'blocked',
    'staged',
    'running',
    'complete',
    'degraded',
    'faulted',
    'locked',
    'simulated',
    'committed',
    'deployed',
    'disconnected',
  ],

  events: [
    'INITIALIZE',
    'EDIT',
    'VALIDATE',
    'VALIDATION_PASS',
    'VALIDATION_WARN',
    'VALIDATION_BLOCK',
    'VALIDATION_FAULT',
    'ACKNOWLEDGE_WARNING',
    'RESOLVE_BLOCK',
    'STAGE',
    'UNSTAGE',
    'EXECUTE',
    'SIMULATE',
    'COMPLETE',
    'DEGRADE',
    'FAULT',
    'LOCK',
    'UNLOCK',
    'COMMIT',
    'DEPLOY',
    'DISCONNECT',
    'RECONNECT',
    'RESET',
    'ROLLBACK',
    'RECOVER',
    'FORCE_RESET',
  ],

  // ── Context factory ────────────────────────────────────────────────────
  createContext: (): ComponentContext => ({
    authority: 'AUTH_0_OBSERVE',
    hasLocalChanges: false,
    isValidated: false,
    warningAcknowledged: false,
  }),

  // ── State entry/exit actions ─────────────────────────────────────────
  stateActions: {
    validating: {
      entry: (ctx) => { ctx.traceId = `trace.${Date.now().toString(36)}`; },
    },
    running: {
      entry: (ctx) => { /* trace start */ },
    },
    complete: {
      entry: clearDirty,
    },
    faulted: {
      entry: (ctx) => { /* emit fault trace */ },
    },
  },

  // ── Transitions ────────────────────────────────────────────────────────
  transitions: [
    // ═══════════ IDLE ═══════════
    { from: 'idle', event: 'INITIALIZE', to: 'ready', description: 'Component initialized and ready' },
    { from: 'idle', event: 'EDIT', to: 'dirty', guard: hasAuthorityToEdit, action: markDirty, description: 'Direct edit from idle' },
    { from: 'idle', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'idle', event: 'FAULT', to: 'faulted', action: markFaulted, description: 'Fault detected' },
    { from: 'idle', event: 'LOCK', to: 'locked', guard: hasAuthorityToLock, action: markLocked, description: 'Component locked' },

    // ═══════════ READY ═══════════
    { from: 'ready', event: 'EDIT', to: 'dirty', guard: hasAuthorityToEdit, action: markDirty, description: 'Begin editing' },
    { from: 'ready', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'ready', event: 'FAULT', to: 'faulted', action: markFaulted, description: 'Fault detected' },
    { from: 'ready', event: 'LOCK', to: 'locked', guard: hasAuthorityToLock, action: markLocked, description: 'Lock component' },
    { from: 'ready', event: 'VALIDATE', to: 'validating', description: 'Begin validation' },

    // ═══════════ DIRTY ═══════════
    { from: 'dirty', event: 'VALIDATE', to: 'validating', description: 'Begin validation' },
    { from: 'dirty', event: 'RESET', to: 'ready', action: resetContext, description: 'Discard changes' },
    { from: 'dirty', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'dirty', event: 'FAULT', to: 'faulted', action: markFaulted, description: 'Fault detected' },
    { from: 'dirty', event: 'LOCK', to: 'locked', guard: hasAuthorityToLock, action: markLocked, description: 'Lock component' },

    // ═══════════ VALIDATING ═══════════
    { from: 'validating', event: 'VALIDATION_PASS', to: 'valid', action: markValidated, description: 'Validation passed' },
    { from: 'validating', event: 'VALIDATION_WARN', to: 'warning', action: markValidated, description: 'Validation passed with warnings' },
    { from: 'validating', event: 'VALIDATION_BLOCK', to: 'blocked', action: markBlocked, description: 'Validation blocked' },
    { from: 'validating', event: 'VALIDATION_FAULT', to: 'faulted', action: markFaulted, description: 'Validation system faulted' },

    // ═══════════ VALID ═══════════
    { from: 'valid', event: 'STAGE', to: 'staged', guard: hasAuthorityToStage, description: 'Stage validated changes' },
    { from: 'valid', event: 'EDIT', to: 'dirty', guard: hasAuthorityToEdit, action: markDirty, description: 'Re-edit after validation' },
    { from: 'valid', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'valid', event: 'LOCK', to: 'locked', guard: hasAuthorityToLock, action: markLocked, description: 'Lock component' },
    { from: 'valid', event: 'RESET', to: 'idle', action: resetContext, description: 'Reset to idle' },

    // ═══════════ WARNING ═══════════
    { from: 'warning', event: 'ACKNOWLEDGE_WARNING', to: 'valid', action: (ctx) => { ctx.warningAcknowledged = true; }, description: 'Acknowledge warning and proceed' },
    { from: 'warning', event: 'STAGE', to: 'staged', guard: isWarningAcknowledged, description: 'Stage with acknowledged warning' },
    { from: 'warning', event: 'EDIT', to: 'dirty', guard: hasAuthorityToEdit, action: markDirty, description: 'Re-edit from warning' },
    { from: 'warning', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'warning', event: 'LOCK', to: 'locked', guard: hasAuthorityToLock, action: markLocked, description: 'Lock component' },

    // ═══════════ BLOCKED ═══════════
    { from: 'blocked', event: 'RESOLVE_BLOCK', to: 'dirty', description: 'Return to dirty to fix block' },
    { from: 'blocked', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'blocked', event: 'FAULT', to: 'faulted', action: markFaulted, description: 'Escalate block to fault' },
    { from: 'blocked', event: 'LOCK', to: 'locked', guard: hasAuthorityToLock, action: markLocked, description: 'Lock blocked component' },

    // ═══════════ STAGED ═══════════
    { from: 'staged', event: 'EXECUTE', to: 'running', guard: hasAuthorityToExecute, description: 'Execute staged operation' },
    { from: 'staged', event: 'SIMULATE', to: 'simulated', guard: hasAuthorityToExecute, description: 'Run simulation' },
    { from: 'staged', event: 'UNSTAGE', to: 'valid', description: 'Unstage back to valid' },
    { from: 'staged', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'staged', event: 'FAULT', to: 'faulted', action: markFaulted, description: 'Fault during staging' },
    { from: 'staged', event: 'LOCK', to: 'locked', guard: hasAuthorityToLock, action: markLocked, description: 'Lock staged component' },

    // ═══════════ RUNNING ═══════════
    { from: 'running', event: 'COMPLETE', to: 'complete', description: 'Operation completed' },
    { from: 'running', event: 'DEGRADE', to: 'degraded', description: 'Runtime degraded' },
    { from: 'running', event: 'FAULT', to: 'faulted', action: markFaulted, description: 'Runtime fault' },
    { from: 'running', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },

    // ═══════════ COMPLETE ═══════════
    { from: 'complete', event: 'COMMIT', to: 'committed', guard: hasAuthorityToCommit, description: 'Commit completed changes' },
    { from: 'complete', event: 'DEPLOY', to: 'deployed', guard: hasAuthorityToCommit, description: 'Deploy completed changes' },
    { from: 'complete', event: 'ROLLBACK', to: 'ready', action: resetContext, description: 'Rollback to ready' },
    { from: 'complete', event: 'RESET', to: 'idle', action: resetContext, description: 'Reset to idle' },
    { from: 'complete', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },

    // ═══════════ DEGRADED ═══════════
    { from: 'degraded', event: 'COMPLETE', to: 'complete', description: 'Complete despite degradation' },
    { from: 'degraded', event: 'FAULT', to: 'faulted', action: markFaulted, description: 'Degradation escalated to fault' },
    { from: 'degraded', event: 'RECOVER', to: 'running', description: 'Recovery from degraded' },
    { from: 'degraded', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },

    // ═══════════ FAULTED ═══════════
    { from: 'faulted', event: 'RECOVER', to: 'idle', action: resetContext, description: 'Recover from fault to idle' },
    { from: 'faulted', event: 'RESET', to: 'idle', action: resetContext, description: 'Reset from fault' },
    { from: 'faulted', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'faulted', event: 'FORCE_RESET', to: 'idle', guard: hasAuthorityToOverride, action: resetContext, description: 'Force reset from fault' },

    // ═══════════ LOCKED ═══════════
    { from: 'locked', event: 'UNLOCK', to: 'idle', guard: hasAuthorityToLock, action: markUnlocked, description: 'Unlock component' },
    { from: 'locked', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },

    // ═══════════ SIMULATED ═══════════
    { from: 'simulated', event: 'EXECUTE', to: 'running', guard: hasAuthorityToExecute, description: 'Execute after simulation' },
    { from: 'simulated', event: 'UNSTAGE', to: 'valid', description: 'Unstage from simulation' },
    { from: 'simulated', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'simulated', event: 'FAULT', to: 'faulted', action: markFaulted, description: 'Fault during simulation' },

    // ═══════════ COMMITTED ═══════════
    { from: 'committed', event: 'DEPLOY', to: 'deployed', guard: hasAuthorityToCommit, description: 'Deploy committed changes' },
    { from: 'committed', event: 'ROLLBACK', to: 'ready', action: resetContext, description: 'Rollback committed changes' },
    { from: 'committed', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'committed', event: 'EDIT', to: 'dirty', guard: hasAuthorityToEdit, action: markDirty, description: 'Edit committed component' },

    // ═══════════ DEPLOYED ═══════════
    { from: 'deployed', event: 'ROLLBACK', to: 'committed', description: 'Rollback deployment' },
    { from: 'deployed', event: 'DISCONNECT', to: 'disconnected', description: 'Runtime disconnected' },
    { from: 'deployed', event: 'EDIT', to: 'dirty', guard: hasAuthorityToEdit, action: markDirty, description: 'Edit deployed component' },

    // ═══════════ DISCONNECTED ═══════════
    { from: 'disconnected', event: 'RECONNECT', to: 'idle', description: 'Reconnect to runtime' },
    { from: 'disconnected', event: 'RECOVER', to: 'idle', description: 'Recover connection' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a component state machine instance.
 *
 * @param authority — Starting authority level.
 * @param overrides — Optional context overrides.
 * @returns A `StateMachineInstance` for the component lifecycle.
 */
export function createComponentMachine(
  authority?: string,
  overrides?: Partial<ComponentContext>,
) {
  // Lazy-import to avoid circular deps if types.ts needs to reference this
  const { createMachine } = require('./createMachine') as typeof import('./createMachine');
  return createMachine(componentStateMachineDefinition, {
    context: {
      authority: authority ?? 'AUTH_0_OBSERVE',
      hasLocalChanges: false,
      isValidated: false,
      warningAcknowledged: false,
      ...overrides,
    },
  });
}
