/**
 * @fileoverview approvalWorkflowMachine.ts — Approval Workflow State Machine
 *
 * Models multi-stage approval workflows for consequential actions in Torafirma.
 * Supports delegation, escalation, expiry, and execution tracking.
 *
 * **9 states**: draft → submitted → under_review → approved → rejected →
 * delegated → escalated → executed → expired
 *
 * Spec: 01 Section 6 — Authority Model, 03.0 Section 8 — Authority Semantics
 *
 * @module torafirma/state-machines/approvalWorkflow
 * @version 2.0.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 9 approval workflow states. */
export type ApprovalWorkflowState =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'delegated'
  | 'escalated'
  | 'executed'
  | 'expired';

/** All events the approval workflow machine accepts. */
export type ApprovalWorkflowEvent =
  | 'SUBMIT'
  | 'ASSIGN_REVIEWER'
  | 'APPROVE'
  | 'REJECT'
  | 'REQUEST_CHANGES'
  | 'DELEGATE'
  | 'ACCEPT_DELEGATION'
  | 'ESCALATE'
  | 'EXECUTE'
  | 'EXPIRE'
  | 'RENEW'
  | 'REDRAFT'
  | 'RETRACT';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the approval workflow machine. */
export interface ApprovalWorkflowContext {
  /** Workflow identifier. */
  workflowId: string;

  /** Requester identifier. */
  requesterId: string;

  /** Current reviewer identifier. */
  reviewerId: string;

  /** Requester authority level. */
  requesterAuthority: string;

  /** Reviewer authority level. */
  reviewerAuthority: string;

  /** Whether the request requires high authority. */
  highAuthorityRequired: boolean;

  /** Delegation chain depth. */
  delegationDepth: number;

  /** Maximum allowed delegation depth. */
  maxDelegationDepth: number;

  /** Expiry timestamp (ISO 8601). */
  expiryTimestamp?: string;

  /** Whether changes were requested. */
  changesRequested: boolean;

  /** Approval reason or notes. */
  approvalNotes?: string;

  /** Rejection reason. */
  rejectionReason?: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const hasApproveAuthority: GuardFunction<ApprovalWorkflowContext> = (ctx) =>
  ctx.reviewerAuthority === 'AUTH_3_EXECUTE' ||
  ctx.reviewerAuthority === 'AUTH_4_COMMIT' ||
  ctx.reviewerAuthority === 'AUTH_5_OVERRIDE' ||
  ctx.reviewerAuthority === 'AUTH_6_ROOT';

const canDelegate: GuardFunction<ApprovalWorkflowContext> = (ctx) =>
  ctx.delegationDepth < ctx.maxDelegationDepth;

const hasEscalationAuthority: GuardFunction<ApprovalWorkflowContext> = (ctx) =>
  ctx.requesterAuthority === 'AUTH_5_OVERRIDE' ||
  ctx.requesterAuthority === 'AUTH_6_ROOT';

const hasExecuteAuthority: GuardFunction<ApprovalWorkflowContext> = (ctx) =>
  ctx.requesterAuthority === 'AUTH_3_EXECUTE' ||
  ctx.requesterAuthority === 'AUTH_4_COMMIT' ||
  ctx.requesterAuthority === 'AUTH_5_OVERRIDE' ||
  ctx.requesterAuthority === 'AUTH_6_ROOT';

const notExpired: GuardFunction<ApprovalWorkflowContext> = (ctx) => {
  if (!ctx.expiryTimestamp) return true;
  return new Date() < new Date(ctx.expiryTimestamp);
};

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const incrementDelegation: ActionFunction<ApprovalWorkflowContext> = (ctx) => {
  ctx.delegationDepth += 1;
};

const markChangesRequested: ActionFunction<ApprovalWorkflowContext> = (ctx) => {
  ctx.changesRequested = true;
};

const recordRejection: ActionFunction<ApprovalWorkflowContext> = (ctx, payload) => {
  ctx.rejectionReason = typeof payload === 'string' ? payload : 'REJECTED';
};

const recordApproval: ActionFunction<ApprovalWorkflowContext> = (ctx, payload) => {
  ctx.approvalNotes = typeof payload === 'string' ? payload : 'APPROVED';
};

const setExpiry: ActionFunction<ApprovalWorkflowContext> = (ctx) => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  ctx.expiryTimestamp = expiry.toISOString();
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Approval workflow state machine — 9 states, 30+ transitions.
 *
 * Flow:
 * ```
 * draft → submitted → under_review → approved → executed
 *                           ↓            ↓
 *                       rejected    rolled back
 *                       delegated
 *                       escalated
 *                       expired
 * ```
 */
export const approvalWorkflowMachineDefinition: StateMachineDefinition<
  ApprovalWorkflowState,
  ApprovalWorkflowEvent,
  ApprovalWorkflowContext
> = {
  id: 'torafirma.approval.workflow',
  name: 'Approval Workflow State Machine',
  description: 'Multi-stage approval workflow with delegation, escalation, and expiry.',
  version: '2.0.0',

  initialState: 'draft',

  states: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'delegated', 'escalated', 'executed', 'expired'],

  events: [
    'SUBMIT', 'ASSIGN_REVIEWER', 'APPROVE', 'REJECT', 'REQUEST_CHANGES',
    'DELEGATE', 'ACCEPT_DELEGATION', 'ESCALATE', 'EXECUTE', 'EXPIRE',
    'RENEW', 'REDRAFT', 'RETRACT',
  ],

  createContext: (): ApprovalWorkflowContext => ({
    workflowId: '',
    requesterId: '',
    reviewerId: '',
    requesterAuthority: 'AUTH_0_OBSERVE',
    reviewerAuthority: 'AUTH_0_OBSERVE',
    highAuthorityRequired: false,
    delegationDepth: 0,
    maxDelegationDepth: 3,
    changesRequested: false,
  }),

  stateActions: {
    submitted: {
      entry: setExpiry,
    },
    executed: {
      entry: (ctx) => { /* emit audit: workflow.executed */ },
    },
  },

  transitions: [
    // ── DRAFT ──
    { from: 'draft', event: 'SUBMIT', to: 'submitted', description: 'Submit for approval' },

    // ── SUBMITTED ──
    { from: 'submitted', event: 'ASSIGN_REVIEWER', to: 'under_review', description: 'Assigned to reviewer' },
    { from: 'submitted', event: 'EXPIRE', to: 'expired', description: 'Submission expired' },
    { from: 'submitted', event: 'RETRACT', to: 'draft', description: 'Retract submission' },

    // ── UNDER_REVIEW ──
    { from: 'under_review', event: 'APPROVE', to: 'approved', guard: hasApproveAuthority, action: recordApproval, description: 'Reviewer approves' },
    { from: 'under_review', event: 'REJECT', to: 'rejected', guard: hasApproveAuthority, action: recordRejection, description: 'Reviewer rejects' },
    { from: 'under_review', event: 'REQUEST_CHANGES', to: 'draft', action: markChangesRequested, description: 'Request changes' },
    { from: 'under_review', event: 'DELEGATE', to: 'delegated', guard: canDelegate, action: incrementDelegation, description: 'Delegate review' },
    { from: 'under_review', event: 'ESCALATE', to: 'escalated', description: 'Escalate review' },
    { from: 'under_review', event: 'EXPIRE', to: 'expired', description: 'Review expired' },

    // ── APPROVED ──
    { from: 'approved', event: 'EXECUTE', to: 'executed', guard: hasExecuteAuthority, description: 'Execute approved request' },
    { from: 'approved', event: 'EXPIRE', to: 'expired', description: 'Approval expired' },
    { from: 'approved', event: 'REJECT', to: 'rejected', action: recordRejection, description: 'Revoke approval' },

    // ── REJECTED ──
    { from: 'rejected', event: 'REDRAFT', to: 'draft', description: 'Redraft rejected request' },
    { from: 'rejected', event: 'ESCALATE', to: 'escalated', description: 'Escalate rejection' },
    { from: 'rejected', event: 'RETRACT', to: 'draft', description: 'Retract and redraft' },

    // ── DELEGATED ──
    { from: 'delegated', event: 'ACCEPT_DELEGATION', to: 'under_review', description: 'Delegation accepted' },
    { from: 'delegated', event: 'APPROVE', to: 'approved', guard: hasApproveAuthority, action: recordApproval, description: 'Delegated approver approves' },
    { from: 'delegated', event: 'REJECT', to: 'rejected', action: recordRejection, description: 'Delegated approver rejects' },
    { from: 'delegated', event: 'EXPIRE', to: 'expired', description: 'Delegation expired' },

    // ── ESCALATED ──
    { from: 'escalated', event: 'APPROVE', to: 'approved', guard: hasEscalationAuthority, action: recordApproval, description: 'Escalated authority approves' },
    { from: 'escalated', event: 'REJECT', to: 'rejected', action: recordRejection, description: 'Escalated authority rejects' },
    { from: 'escalated', event: 'ASSIGN_REVIEWER', to: 'under_review', description: 'Assign to higher reviewer' },

    // ── EXECUTED ──
    { from: 'executed', event: 'RENEW', to: 'draft', description: 'New approval cycle' },

    // ── EXPIRED ──
    { from: 'expired', event: 'RENEW', to: 'draft', description: 'Renew expired workflow' },
    { from: 'expired', event: 'REDRAFT', to: 'draft', description: 'Redraft expired request' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create an approval workflow machine instance.
 *
 * @param workflowId — Unique workflow identifier.
 * @param requesterId — Requesting operator identifier.
 * @param overrides — Optional context overrides.
 */
export function createApprovalWorkflowMachine(
  workflowId: string,
  requesterId: string,
  overrides?: Partial<ApprovalWorkflowContext>,
) {
  const { createMachine } = require('./createMachine') as typeof import('./createMachine');
  return createMachine(approvalWorkflowMachineDefinition, {
    context: {
      workflowId,
      requesterId,
      reviewerId: '',
      requesterAuthority: 'AUTH_0_OBSERVE',
      reviewerAuthority: 'AUTH_0_OBSERVE',
      highAuthorityRequired: false,
      delegationDepth: 0,
      maxDelegationDepth: 3,
      changesRequested: false,
      ...overrides,
    },
  });
}
