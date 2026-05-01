/**
 * @fileoverview validationPipelineMachine.ts — Validation Pipeline State Machine
 *
 * Models the structured validation process for proposals, drafts, graphs,
 * configurations, and deployments. Progresses through validation stages with
 * support for partial results, warnings, blocks, overrides, and staleness.
 *
 * **8 states**: pending → in_progress → partially_valid → valid → warning →
 * blocked → overridden → stale
 *
 * Spec: 03.0 Section 9 — Validation Semantics
 *
 * @module torafirma/state-machines/validationPipeline
 * @version 2.0.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 8 validation pipeline states. */
export type ValidationState =
  | 'pending'
  | 'in_progress'
  | 'partially_valid'
  | 'valid'
  | 'warning'
  | 'blocked'
  | 'overridden'
  | 'stale';

/** All events the validation pipeline machine accepts. */
export type ValidationEvent =
  | 'START'
  | 'CHECK_PARTIAL'
  | 'PASS'
  | 'WARN'
  | 'BLOCK'
  | 'ACKNOWLEDGE'
  | 'OVERRIDE'
  | 'STALE'
  | 'REVALIDATE'
  | 'RESET'
  | 'FORCE_PASS';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the validation pipeline machine. */
export interface ValidationContext {
  /** Number of validation checks total. */
  totalChecks: number;

  /** Number of checks passed. */
  passedChecks: number;

  /** Number of warnings found. */
  warningCount: number;

  /** Number of blocking issues found. */
  blockCount: number;

  /** Operator authority level. */
  authority: string;

  /** Whether warnings have been acknowledged. */
  warningAcknowledged: boolean;

  /** Override reason (when in overridden state). */
  overrideReason?: string;

  /** Block reason code. */
  blockReason?: string;

  /** Validation target identifier. */
  targetId: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const hasOverrideAuthority: GuardFunction<ValidationContext> = (ctx) =>
  ctx.authority === 'AUTH_5_OVERRIDE' || ctx.authority === 'AUTH_6_ROOT';

const allChecksPass: GuardFunction<ValidationContext> = (ctx) =>
  ctx.passedChecks === ctx.totalChecks && ctx.totalChecks > 0;

const hasWarnings: GuardFunction<ValidationContext> = (ctx) =>
  ctx.warningCount > 0;

const hasBlocks: GuardFunction<ValidationContext> = (ctx) =>
  ctx.blockCount > 0;

const isPartiallyValid: GuardFunction<ValidationContext> = (ctx) =>
  ctx.passedChecks > 0 && ctx.passedChecks < ctx.totalChecks;

const warningsAcknowledged: GuardFunction<ValidationContext> = (ctx) =>
  ctx.warningAcknowledged;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const recordOverride: ActionFunction<ValidationContext> = (ctx, payload) => {
  ctx.overrideReason = typeof payload === 'string' ? payload : 'OPERATOR_OVERRIDE';
};

const recordBlock: ActionFunction<ValidationContext> = (ctx, payload) => {
  ctx.blockReason = typeof payload === 'string' ? payload : 'VALIDATION_BLOCKED';
};

const acknowledgeWarning: ActionFunction<ValidationContext> = (ctx) => {
  ctx.warningAcknowledged = true;
};

const resetValidation: ActionFunction<ValidationContext> = (ctx) => {
  ctx.passedChecks = 0;
  ctx.warningCount = 0;
  ctx.blockCount = 0;
  ctx.warningAcknowledged = false;
  ctx.overrideReason = undefined;
  ctx.blockReason = undefined;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Validation pipeline state machine — 8 states, 25+ transitions.
 *
 * Flow:
 * ```
 * pending → in_progress → valid (all pass)
 *                       → warning (pass with warnings)
 *                       → blocked (blocking issues)
 *                       → partially_valid (some pass)
 * blocked → overridden (with AUTH_5+)
 * valid   → stale (when source changes)
 * ```
 */
export const validationPipelineMachineDefinition: StateMachineDefinition<
  ValidationState,
  ValidationEvent,
  ValidationContext
> = {
  id: 'torafirma.validation.pipeline',
  name: 'Validation Pipeline State Machine',
  description: 'Structured validation process with support for partial results, overrides, and staleness.',
  version: '2.0.0',

  initialState: 'pending',

  states: ['pending', 'in_progress', 'partially_valid', 'valid', 'warning', 'blocked', 'overridden', 'stale'],

  events: [
    'START', 'CHECK_PARTIAL', 'PASS', 'WARN', 'BLOCK',
    'ACKNOWLEDGE', 'OVERRIDE', 'STALE', 'REVALIDATE', 'RESET', 'FORCE_PASS',
  ],

  createContext: (): ValidationContext => ({
    totalChecks: 0,
    passedChecks: 0,
    warningCount: 0,
    blockCount: 0,
    authority: 'AUTH_0_OBSERVE',
    warningAcknowledged: false,
    targetId: '',
  }),

  transitions: [
    // ── PENDING ──
    { from: 'pending', event: 'START', to: 'in_progress', description: 'Begin validation' },
    { from: 'pending', event: 'STALE', to: 'stale', description: 'Marked stale before start' },

    // ── IN_PROGRESS ──
    { from: 'in_progress', event: 'PASS', to: 'valid', guard: allChecksPass, description: 'All checks passed' },
    { from: 'in_progress', event: 'WARN', to: 'warning', guard: hasWarnings, description: 'Validation produced warnings' },
    { from: 'in_progress', event: 'BLOCK', to: 'blocked', guard: hasBlocks, action: recordBlock, description: 'Validation blocked' },
    { from: 'in_progress', event: 'CHECK_PARTIAL', to: 'partially_valid', guard: isPartiallyValid, description: 'Partial validation results' },
    { from: 'in_progress', event: 'FORCE_PASS', to: 'valid', guard: hasOverrideAuthority, action: recordOverride, description: 'Force pass with override' },

    // ── PARTIALLY_VALID ──
    { from: 'partially_valid', event: 'PASS', to: 'valid', guard: allChecksPass, description: 'All checks now pass' },
    { from: 'partially_valid', event: 'WARN', to: 'warning', guard: hasWarnings, description: 'Warnings from partial' },
    { from: 'partially_valid', event: 'BLOCK', to: 'blocked', guard: hasBlocks, action: recordBlock, description: 'Blocking issues found' },
    { from: 'partially_valid', event: 'REVALIDATE', to: 'in_progress', description: 'Re-run validation' },
    { from: 'partially_valid', event: 'STALE', to: 'stale', description: 'Source changed' },

    // ── VALID ──
    { from: 'valid', event: 'STALE', to: 'stale', description: 'Source changed, validation stale' },
    { from: 'valid', event: 'REVALIDATE', to: 'in_progress', description: 'Re-validate' },
    { from: 'valid', event: 'RESET', to: 'pending', action: resetValidation, description: 'Reset validation' },

    // ── WARNING ──
    { from: 'warning', event: 'ACKNOWLEDGE', to: 'valid', action: acknowledgeWarning, description: 'Acknowledge warnings' },
    { from: 'warning', event: 'REVALIDATE', to: 'in_progress', description: 'Re-validate warnings' },
    { from: 'warning', event: 'OVERRIDE', to: 'overridden', guard: hasOverrideAuthority, action: recordOverride, description: 'Override warnings' },
    { from: 'warning', event: 'STALE', to: 'stale', description: 'Source changed' },
    { from: 'warning', event: 'BLOCK', to: 'blocked', guard: hasBlocks, action: recordBlock, description: 'Escalate to blocked' },

    // ── BLOCKED ──
    { from: 'blocked', event: 'OVERRIDE', to: 'overridden', guard: hasOverrideAuthority, action: recordOverride, description: 'Override block' },
    { from: 'blocked', event: 'REVALIDATE', to: 'in_progress', description: 'Re-validate after fix' },
    { from: 'blocked', event: 'RESET', to: 'pending', action: resetValidation, description: 'Reset from blocked' },

    // ── OVERRIDDEN ──
    { from: 'overridden', event: 'REVALIDATE', to: 'in_progress', description: 'Re-validate after override' },
    { from: 'overridden', event: 'RESET', to: 'pending', action: resetValidation, description: 'Reset from overridden' },
    { from: 'overridden', event: 'STALE', to: 'stale', description: 'Override context is stale' },

    // ── STALE ──
    { from: 'stale', event: 'REVALIDATE', to: 'in_progress', description: 'Re-validate stale' },
    { from: 'stale', event: 'RESET', to: 'pending', action: resetValidation, description: 'Reset from stale' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a validation pipeline machine instance.
 *
 * @param targetId — Identifier of the object being validated.
 * @param totalChecks — Total number of validation checks to run.
 * @param authority — Operator authority level.
 * @param overrides — Optional context overrides.
 */
export function createValidationPipelineMachine(
  targetId: string,
  totalChecks?: number,
  authority?: string,
  overrides?: Partial<ValidationContext>,
) {
  const { createMachine } = require('./createMachine') as typeof import('./createMachine');
  return createMachine(validationPipelineMachineDefinition, {
    context: {
      targetId,
      totalChecks: totalChecks ?? 0,
      passedChecks: 0,
      warningCount: 0,
      blockCount: 0,
      authority: authority ?? 'AUTH_0_OBSERVE',
      warningAcknowledged: false,
      ...overrides,
    },
  });
}
