/**
 * @fileoverview bulkOperationMachine.ts — Bulk Operation State Machine
 *
 * Models bulk operations on collections of objects: selection, validation,
 * staging, execution, partial completion, full completion, failure, and
 * revert support.
 *
 * **9 states**: idle → selecting → validating → staged → executing →
 * partial → complete → failed → reverting
 *
 * @module torafirma/state-machines/bulkOperation
 * @version 2.0.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 9 bulk operation states. */
export type BulkOperationState =
  | 'idle'
  | 'selecting'
  | 'validating'
  | 'staged'
  | 'executing'
  | 'partial'
  | 'complete'
  | 'failed'
  | 'reverting';

/** All events the bulk operation machine accepts. */
export type BulkOperationEvent =
  | 'BEGIN_SELECT'
  | 'SELECT'
  | 'SELECT_ALL'
  | 'DESELECT'
  | 'CLEAR_SELECTION'
  | 'VALIDATE'
  | 'VALIDATION_PASS'
  | 'VALIDATION_WARN'
  | 'VALIDATION_FAIL'
  | 'STAGE'
  | 'UNSTAGE'
  | 'EXECUTE'
  | 'PROGRESS'
  | 'COMPLETE'
  | 'PARTIAL'
  | 'FAIL'
  | 'RETRY'
  | 'REVERT'
  | 'REVERT_COMPLETE'
  | 'CANCEL'
  | 'RESET';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the bulk operation machine. */
export interface BulkOperationContext {
  /** Operation identifier. */
  operationId: string;

  /** Total number of items available. */
  totalItems: number;

  /** Number of items selected. */
  selectedCount: number;

  /** Number of items that passed validation. */
  validatedCount: number;

  /** Number of items successfully processed. */
  successCount: number;

  /** Number of items that failed. */
  failCount: number;

  /** Number of items reverted. */
  revertedCount: number;

  /** Current progress (0-100). */
  progressPercent: number;

  /** Operator authority level. */
  authority: string;

  /** Whether any warnings exist. */
  hasWarnings: boolean;

  /** Whether warnings were acknowledged. */
  warningsAcknowledged: boolean;

  /** Failure reason code. */
  failReason?: string;

  /** Selected item IDs. */
  selectedIds: string[];
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const hasSelection: GuardFunction<BulkOperationContext> = (ctx) =>
  ctx.selectedCount > 0;

const hasExecuteAuthority: GuardFunction<BulkOperationContext> = (ctx) =>
  ctx.authority === 'AUTH_3_EXECUTE' ||
  ctx.authority === 'AUTH_4_COMMIT' ||
  ctx.authority === 'AUTH_5_OVERRIDE' ||
  ctx.authority === 'AUTH_6_ROOT';

const warningsAcknowledged: GuardFunction<BulkOperationContext> = (ctx) =>
  !ctx.hasWarnings || ctx.warningsAcknowledged;

const allSucceeded: GuardFunction<BulkOperationContext> = (ctx) =>
  ctx.successCount === ctx.selectedCount && ctx.selectedCount > 0;

const someSucceeded: GuardFunction<BulkOperationContext> = (ctx) =>
  ctx.successCount > 0 && ctx.successCount < ctx.selectedCount;

const allFailed: GuardFunction<BulkOperationContext> = (ctx) =>
  ctx.failCount === ctx.selectedCount && ctx.selectedCount > 0;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const addSelection: ActionFunction<BulkOperationContext> = (ctx, payload) => {
  if (typeof payload === 'string' && !ctx.selectedIds.includes(payload)) {
    ctx.selectedIds.push(payload);
    ctx.selectedCount = ctx.selectedIds.length;
  }
};

const removeSelection: ActionFunction<BulkOperationContext> = (ctx, payload) => {
  if (typeof payload === 'string') {
    ctx.selectedIds = ctx.selectedIds.filter((id) => id !== payload);
    ctx.selectedCount = ctx.selectedIds.length;
  }
};

const selectAll: ActionFunction<BulkOperationContext> = (ctx) => {
  ctx.selectedCount = ctx.totalItems;
};

const clearSelection: ActionFunction<BulkOperationContext> = (ctx) => {
  ctx.selectedIds = [];
  ctx.selectedCount = 0;
  ctx.validatedCount = 0;
};

const recordValidationPass: ActionFunction<BulkOperationContext> = (ctx, payload) => {
  if (typeof payload === 'number') {
    ctx.validatedCount += payload;
  } else {
    ctx.validatedCount = ctx.selectedCount;
  }
};

const recordProgress: ActionFunction<BulkOperationContext> = (ctx, payload) => {
  if (typeof payload === 'number') {
    ctx.progressPercent = Math.min(100, Math.max(0, payload));
    ctx.successCount = Math.floor((ctx.selectedCount * ctx.progressPercent) / 100);
  }
};

const recordFail: ActionFunction<BulkOperationContext> = (ctx, payload) => {
  ctx.failReason = typeof payload === 'string' ? payload : 'BULK_OPERATION_FAILED';
  ctx.failCount = ctx.selectedCount - ctx.successCount;
};

const resetOperation: ActionFunction<BulkOperationContext> = (ctx) => {
  ctx.selectedCount = 0;
  ctx.validatedCount = 0;
  ctx.successCount = 0;
  ctx.failCount = 0;
  ctx.revertedCount = 0;
  ctx.progressPercent = 0;
  ctx.hasWarnings = false;
  ctx.warningsAcknowledged = false;
  ctx.failReason = undefined;
  ctx.selectedIds = [];
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Bulk operation state machine — 9 states, 35+ transitions.
 *
 * Flow:
 * ```
 * idle → selecting → validating → staged → executing → complete
 *                                           ↓
 *                                       partial → reverting
 *                                           ↓
 *                                        failed → reverting
 * ```
 */
export const bulkOperationMachineDefinition: StateMachineDefinition<
  BulkOperationState,
  BulkOperationEvent,
  BulkOperationContext
> = {
  id: 'torafirma.bulk.operation',
  name: 'Bulk Operation State Machine',
  description: 'Bulk operation lifecycle with selection, validation, staging, execution, partial completion, and revert.',
  version: '2.0.0',

  initialState: 'idle',

  states: ['idle', 'selecting', 'validating', 'staged', 'executing', 'partial', 'complete', 'failed', 'reverting'],

  events: [
    'BEGIN_SELECT', 'SELECT', 'SELECT_ALL', 'DESELECT', 'CLEAR_SELECTION',
    'VALIDATE', 'VALIDATION_PASS', 'VALIDATION_WARN', 'VALIDATION_FAIL',
    'STAGE', 'UNSTAGE', 'EXECUTE', 'PROGRESS', 'COMPLETE', 'PARTIAL',
    'FAIL', 'RETRY', 'REVERT', 'REVERT_COMPLETE', 'CANCEL', 'RESET',
  ],

  createContext: (): BulkOperationContext => ({
    operationId: '',
    totalItems: 0,
    selectedCount: 0,
    validatedCount: 0,
    successCount: 0,
    failCount: 0,
    revertedCount: 0,
    progressPercent: 0,
    authority: 'AUTH_0_OBSERVE',
    hasWarnings: false,
    warningsAcknowledged: false,
    selectedIds: [],
  }),

  transitions: [
    // ── IDLE ──
    { from: 'idle', event: 'BEGIN_SELECT', to: 'selecting', description: 'Begin selection' },

    // ── SELECTING ──
    { from: 'selecting', event: 'SELECT', to: 'selecting', action: addSelection, description: 'Select item' },
    { from: 'selecting', event: 'SELECT_ALL', to: 'selecting', action: selectAll, description: 'Select all' },
    { from: 'selecting', event: 'DESELECT', to: 'selecting', action: removeSelection, description: 'Deselect item' },
    { from: 'selecting', event: 'CLEAR_SELECTION', to: 'idle', action: clearSelection, description: 'Clear selection' },
    { from: 'selecting', event: 'VALIDATE', to: 'validating', guard: hasSelection, description: 'Validate selection' },
    { from: 'selecting', event: 'CANCEL', to: 'idle', action: clearSelection, description: 'Cancel selection' },

    // ── VALIDATING ──
    { from: 'validating', event: 'VALIDATION_PASS', to: 'staged', guard: warningsAcknowledged, action: recordValidationPass, description: 'Validation passed' },
    { from: 'validating', event: 'VALIDATION_WARN', to: 'validating', action: (ctx) => { ctx.hasWarnings = true; }, description: 'Validation warning' },
    { from: 'validating', event: 'VALIDATION_FAIL', to: 'selecting', action: recordFail, description: 'Validation failed' },
    { from: 'validating', event: 'CANCEL', to: 'selecting', description: 'Cancel validation' },

    // ── STAGED ──
    { from: 'staged', event: 'EXECUTE', to: 'executing', guard: hasExecuteAuthority, description: 'Execute staged' },
    { from: 'staged', event: 'UNSTAGE', to: 'selecting', description: 'Unstage' },
    { from: 'staged', event: 'CANCEL', to: 'idle', action: clearSelection, description: 'Cancel staged' },

    // ── EXECUTING ──
    { from: 'executing', event: 'PROGRESS', to: 'executing', action: recordProgress, description: 'Execution progress' },
    { from: 'executing', event: 'COMPLETE', to: 'complete', guard: allSucceeded, description: 'All items complete' },
    { from: 'executing', event: 'PARTIAL', to: 'partial', guard: someSucceeded, description: 'Partial completion' },
    { from: 'executing', event: 'FAIL', to: 'failed', guard: allFailed, action: recordFail, description: 'All items failed' },
    { from: 'executing', event: 'CANCEL', to: 'staged', description: 'Cancel execution' },

    // ── PARTIAL ──
    { from: 'partial', event: 'RETRY', to: 'executing', description: 'Retry failed items' },
    { from: 'partial', event: 'REVERT', to: 'reverting', description: 'Revert partial results' },
    { from: 'partial', event: 'COMPLETE', to: 'complete', guard: allSucceeded, description: 'All now complete' },

    // ── COMPLETE ──
    { from: 'complete', event: 'REVERT', to: 'reverting', description: 'Revert all' },
    { from: 'complete', event: 'RESET', to: 'idle', action: resetOperation, description: 'Reset operation' },

    // ── FAILED ──
    { from: 'failed', event: 'RETRY', to: 'executing', description: 'Retry failed' },
    { from: 'failed', event: 'RESET', to: 'idle', action: resetOperation, description: 'Reset from failed' },
    { from: 'failed', event: 'REVERT', to: 'reverting', description: 'Revert failed' },

    // ── REVERTING ──
    { from: 'reverting', event: 'REVERT_COMPLETE', to: 'idle', action: resetOperation, description: 'Revert complete' },
    { from: 'reverting', event: 'FAIL', to: 'failed', description: 'Revert failed' },
    { from: 'reverting', event: 'CANCEL', to: 'partial', description: 'Cancel revert' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a bulk operation machine instance.
 *
 * @param operationId — Unique operation identifier.
 * @param totalItems — Total number of items available.
 * @param overrides — Optional context overrides.
 */
export function createBulkOperationMachine(
  operationId: string,
  totalItems?: number,
  overrides?: Partial<BulkOperationContext>,
) {
  const { createMachine } = require('./createMachine') as typeof import('./createMachine');
  return createMachine(bulkOperationMachineDefinition, {
    context: {
      operationId,
      totalItems: totalItems ?? 0,
      selectedCount: 0,
      validatedCount: 0,
      successCount: 0,
      failCount: 0,
      revertedCount: 0,
      progressPercent: 0,
      authority: 'AUTH_0_OBSERVE',
      hasWarnings: false,
      warningsAcknowledged: false,
      selectedIds: [],
      ...overrides,
    },
  });
}
