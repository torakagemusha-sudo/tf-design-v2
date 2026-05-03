/**
 * @fileoverview aiProposalMachine.ts — AI Proposal Lifecycle State Machine
 *
 * Models the lifecycle of AI-generated proposals, drafts, patches, and
 * suggestions within the Torafirma system. Ensures the critical boundary:
 * a suggestion is not a command; a draft is not staged; staged is not executed
 * without operator approval.
 *
 * **8 states**: drafting → proposing → reviewing → accepted → rejected →
 * revised → merged → rolled_back
 *
 * Spec: 01 Section 8 — AI Assistance Boundary
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/aiProposal
 * @version 0.2.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';
import { createMachine } from './createMachine';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 8 AI proposal lifecycle states. */
export type AIProposalState =
  | 'drafting'
  | 'proposing'
  | 'reviewing'
  | 'accepted'
  | 'rejected'
  | 'revised'
  | 'merged'
  | 'rolled_back';

/** All events the AI proposal machine accepts. */
export type AIProposalEvent =
  | 'GENERATE'
  | 'PROPOSE'
  | 'SUBMIT_FOR_REVIEW'
  | 'ACCEPT'
  | 'REJECT'
  | 'REQUEST_REVISION'
  | 'REVISE'
  | 'SUBMIT_REVISION'
  | 'MERGE'
  | 'ROLLBACK'
  | 'REDRAFT'
  | 'ABANDON';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the AI proposal lifecycle machine. */
export interface AIProposalContext {
  /** Proposal identifier. */
  proposalId: string;

  /** AI model or agent that generated the proposal. */
  sourceModel: string;

  /** Operator reviewing the proposal. */
  reviewerId: string;

  /** Current authority level of the reviewer. */
  reviewerAuthority: string;

  /** Validation status of the proposal. */
  validationStatus: 'unchecked' | 'valid' | 'warning' | 'blocked';

  /** Whether the proposal has been explicitly accepted by an operator. */
  operatorAccepted: boolean;

  /** Number of revision cycles. */
  revisionCount: number;

  /** Maximum allowed revisions. */
  maxRevisions: number;

  /** Whether the proposal affects external systems. */
  hasExternalEffects: boolean;

  /** Confidence score (0-1) from the AI system. */
  confidenceScore: number;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const isValidated: GuardFunction<AIProposalContext> = (ctx) =>
  ctx.validationStatus === 'valid' || ctx.validationStatus === 'warning';

const isBlocked: GuardFunction<AIProposalContext> = (ctx) =>
  ctx.validationStatus === 'blocked';

const hasOperatorAccepted: GuardFunction<AIProposalContext> = (ctx) =>
  ctx.operatorAccepted;

const hasMergeAuthority: GuardFunction<AIProposalContext> = (ctx) =>
  ctx.reviewerAuthority === 'AUTH_4_COMMIT' ||
  ctx.reviewerAuthority === 'AUTH_5_OVERRIDE' ||
  ctx.reviewerAuthority === 'AUTH_6_ROOT';

const withinRevisionLimit: GuardFunction<AIProposalContext> = (ctx) =>
  ctx.revisionCount < ctx.maxRevisions;

const hasConfidence: GuardFunction<AIProposalContext> = (ctx) =>
  ctx.confidenceScore >= 0.5;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const markAccepted: ActionFunction<AIProposalContext> = (ctx) => {
  ctx.operatorAccepted = true;
};

const incrementRevision: ActionFunction<AIProposalContext> = (ctx) => {
  ctx.revisionCount += 1;
};

const resetProposal: ActionFunction<AIProposalContext> = (ctx) => {
  ctx.operatorAccepted = false;
  ctx.validationStatus = 'unchecked';
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * AI proposal lifecycle state machine — 8 states, 25+ transitions.
 *
 * Critical boundary enforcement:
 * ```
 * drafting → proposing → reviewing → accepted → merged
 *                               → rejected
 *                               → revised → reviewing
 * merged → rolled_back
 * ```
 */
export const aiProposalMachineDefinition: StateMachineDefinition<
  AIProposalState,
  AIProposalEvent,
  AIProposalContext
> = {
  id: 'torafirma.ai.proposal',
  name: 'AI Proposal Lifecycle State Machine',
  description: 'Lifecycle for AI-generated proposals with mandatory operator review and approval.',
  version: '0.2.0',

  initialState: 'drafting',

  states: ['drafting', 'proposing', 'reviewing', 'accepted', 'rejected', 'revised', 'merged', 'rolled_back'],

  events: [
    'GENERATE', 'PROPOSE', 'SUBMIT_FOR_REVIEW', 'ACCEPT', 'REJECT',
    'REQUEST_REVISION', 'REVISE', 'SUBMIT_REVISION', 'MERGE', 'ROLLBACK',
    'REDRAFT', 'ABANDON',
  ],

  createContext: (): AIProposalContext => ({
    proposalId: '',
    sourceModel: '',
    reviewerId: '',
    reviewerAuthority: 'AUTH_0_OBSERVE',
    validationStatus: 'unchecked',
    operatorAccepted: false,
    revisionCount: 0,
    maxRevisions: 3,
    hasExternalEffects: false,
    confidenceScore: 0,
  }),

  stateActions: {
    drafting: {
      entry: (ctx) => { ctx.validationStatus = 'unchecked'; },
    },
    merged: {
      entry: (ctx) => { /* emit trace: ai.proposal.merged */ },
    },
    rolled_back: {
      entry: (ctx) => { /* emit trace: ai.proposal.rolled_back */ },
    },
  },

  transitions: [
    // ── DRAFTING ──
    { from: 'drafting', event: 'GENERATE', to: 'drafting', description: 'Continue generating' },
    { from: 'drafting', event: 'PROPOSE', to: 'proposing', description: 'AI proposes draft' },
    { from: 'drafting', event: 'ABANDON', to: 'rejected', description: 'Abandon draft' },

    // ── PROPOSING ──
    { from: 'proposing', event: 'SUBMIT_FOR_REVIEW', to: 'reviewing', description: 'Submit for operator review' },
    { from: 'proposing', event: 'ABANDON', to: 'rejected', description: 'Abandon proposal' },

    // ── REVIEWING ──
    { from: 'reviewing', event: 'ACCEPT', to: 'accepted', guard: isValidated, action: markAccepted, description: 'Operator accepts proposal' },
    { from: 'reviewing', event: 'REJECT', to: 'rejected', description: 'Operator rejects proposal' },
    { from: 'reviewing', event: 'REQUEST_REVISION', to: 'revised', guard: withinRevisionLimit, action: incrementRevision, description: 'Request revision' },

    // ── ACCEPTED ──
    { from: 'accepted', event: 'MERGE', to: 'merged', guard: hasMergeAuthority, description: 'Merge accepted proposal' },
    { from: 'accepted', event: 'ROLLBACK', to: 'rolled_back', description: 'Rollback accepted proposal' },
    { from: 'accepted', event: 'REQUEST_REVISION', to: 'revised', guard: withinRevisionLimit, action: incrementRevision, description: 'Revise after acceptance' },

    // ── REJECTED ──
    { from: 'rejected', event: 'REDRAFT', to: 'drafting', action: resetProposal, description: 'Redraft rejected proposal' },
    { from: 'rejected', event: 'ABANDON', to: 'rolled_back', description: 'Permanently abandon' },

    // ── REVISED ──
    { from: 'revised', event: 'REVISE', to: 'revised', description: 'Continue revision' },
    { from: 'revised', event: 'SUBMIT_REVISION', to: 'reviewing', description: 'Submit revised proposal' },
    { from: 'revised', event: 'ABANDON', to: 'rejected', description: 'Abandon revision' },

    // ── MERGED ──
    { from: 'merged', event: 'ROLLBACK', to: 'rolled_back', description: 'Rollback merged proposal' },

    // ── ROLLED_BACK ──
    { from: 'rolled_back', event: 'REDRAFT', to: 'drafting', action: resetProposal, description: 'Redraft after rollback' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create an AI proposal lifecycle machine instance.
 *
 * @param proposalId — Unique proposal identifier.
 * @param sourceModel — AI model that generated the proposal.
 * @param reviewerId — Operator reviewing the proposal.
 * @param overrides — Optional context overrides.
 */
export function createAIProposalMachine(
  proposalId: string,
  sourceModel: string,
  reviewerId: string,
  overrides?: Partial<AIProposalContext>,
) {
  return createMachine(aiProposalMachineDefinition, {
    context: {
      proposalId,
      sourceModel,
      reviewerId,
      reviewerAuthority: 'AUTH_0_OBSERVE',
      validationStatus: 'unchecked',
      operatorAccepted: false,
      revisionCount: 0,
      maxRevisions: 3,
      hasExternalEffects: false,
      confidenceScore: 0,
      ...overrides,
    },
  });
}
