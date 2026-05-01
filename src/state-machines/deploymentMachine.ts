/**
 * @fileoverview deploymentMachine.ts — Deployment Lifecycle State Machine
 *
 * Models the full deployment pipeline: from pending through build, test, stage,
 * deploy, verify, live, and rollback. Ensures every deployment step is traceable
 * and can be rolled back.
 *
 * **9 states**: pending → building → testing → staging → deploying →
 * verifying → live → rolling_back → failed
 *
 * Spec: 01 Section 10 — Persistence and Lineage
 *
 * @module torafirma/state-machines/deployment
 * @version 2.0.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 9 deployment lifecycle states. */
export type DeploymentState =
  | 'pending'
  | 'building'
  | 'testing'
  | 'staging'
  | 'deploying'
  | 'verifying'
  | 'live'
  | 'rolling_back'
  | 'failed';

/** All events the deployment machine accepts. */
export type DeploymentEvent =
  | 'START_BUILD'
  | 'BUILD_COMPLETE'
  | 'BUILD_FAIL'
  | 'START_TEST'
  | 'TEST_PASS'
  | 'TEST_FAIL'
  | 'START_STAGE'
  | 'STAGE_COMPLETE'
  | 'STAGE_FAIL'
  | 'START_DEPLOY'
  | 'DEPLOY_COMPLETE'
  | 'DEPLOY_FAIL'
  | 'START_VERIFY'
  | 'VERIFY_PASS'
  | 'VERIFY_FAIL'
  | 'GO_LIVE'
  | 'ROLLBACK'
  | 'ROLLBACK_COMPLETE'
  | 'CANCEL'
  | 'RETRY'
  | 'FAIL';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the deployment machine. */
export interface DeploymentContext {
  /** Deployment identifier. */
  deploymentId: string;

  /** Artifact or package being deployed. */
  artifactId: string;

  /** Target environment. */
  environment: string;

  /** Operator authority level. */
  authority: string;

  /** Build version or tag. */
  version: string;

  /** Whether tests are required. */
  testsRequired: boolean;

  /** Number of test failures. */
  testFailCount: number;

  /** Maximum test failures allowed. */
  maxTestFails: number;

  /** Whether deployment has been approved. */
  approved: boolean;

  /** Rollback target version. */
  rollbackVersion?: string;

  /** Failure reason code. */
  failReason?: string;

  /** Deployment start timestamp. */
  startedAt?: string;

  /** Deployment completion timestamp. */
  completedAt?: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const hasDeployAuthority: GuardFunction<DeploymentContext> = (ctx) =>
  ctx.authority === 'AUTH_3_EXECUTE' ||
  ctx.authority === 'AUTH_4_COMMIT' ||
  ctx.authority === 'AUTH_5_OVERRIDE' ||
  ctx.authority === 'AUTH_6_ROOT';

const isApproved: GuardFunction<DeploymentContext> = (ctx) =>
  ctx.approved;

const belowTestFailLimit: GuardFunction<DeploymentContext> = (ctx) =>
  ctx.testFailCount < ctx.maxTestFails;

const testsPass: GuardFunction<DeploymentContext> = (ctx) =>
  !ctx.testsRequired || ctx.testFailCount === 0;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const recordStart: ActionFunction<DeploymentContext> = (ctx) => {
  ctx.startedAt = new Date().toISOString();
};

const recordFail: ActionFunction<DeploymentContext> = (ctx, payload) => {
  ctx.failReason = typeof payload === 'string' ? payload : 'DEPLOYMENT_FAILED';
};

const recordTestFail: ActionFunction<DeploymentContext> = (ctx) => {
  ctx.testFailCount += 1;
};

const recordComplete: ActionFunction<DeploymentContext> = (ctx) => {
  ctx.completedAt = new Date().toISOString();
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Deployment lifecycle state machine — 9 states, 30+ transitions.
 *
 * Pipeline flow:
 * ```
 * pending → building → testing → staging → deploying → verifying → live
 *    ↓          ↓          ↓          ↓           ↓           ↓
 * failed ← failed ← failed ← failed ← failed ← failed ← rolling_back
 * ```
 */
export const deploymentMachineDefinition: StateMachineDefinition<
  DeploymentState,
  DeploymentEvent,
  DeploymentContext
> = {
  id: 'torafirma.deployment',
  name: 'Deployment Lifecycle State Machine',
  description: 'Full deployment pipeline with build, test, stage, deploy, verify, and rollback.',
  version: '2.0.0',

  initialState: 'pending',

  states: ['pending', 'building', 'testing', 'staging', 'deploying', 'verifying', 'live', 'rolling_back', 'failed'],

  events: [
    'START_BUILD', 'BUILD_COMPLETE', 'BUILD_FAIL', 'START_TEST', 'TEST_PASS', 'TEST_FAIL',
    'START_STAGE', 'STAGE_COMPLETE', 'STAGE_FAIL', 'START_DEPLOY', 'DEPLOY_COMPLETE',
    'DEPLOY_FAIL', 'START_VERIFY', 'VERIFY_PASS', 'VERIFY_FAIL', 'GO_LIVE', 'ROLLBACK',
    'ROLLBACK_COMPLETE', 'CANCEL', 'RETRY', 'FAIL',
  ],

  createContext: (): DeploymentContext => ({
    deploymentId: '',
    artifactId: '',
    environment: 'development',
    authority: 'AUTH_0_OBSERVE',
    version: '',
    testsRequired: true,
    testFailCount: 0,
    maxTestFails: 3,
    approved: false,
  }),

  stateActions: {
    live: {
      entry: recordComplete,
    },
    failed: {
      entry: (ctx) => { /* emit trace: deployment.failed */ },
    },
  },

  transitions: [
    // ── PENDING ──
    { from: 'pending', event: 'START_BUILD', to: 'building', guard: hasDeployAuthority, action: recordStart, description: 'Start build' },
    { from: 'pending', event: 'CANCEL', to: 'failed', description: 'Cancel deployment' },

    // ── BUILDING ──
    { from: 'building', event: 'BUILD_COMPLETE', to: 'testing', description: 'Build complete, start tests' },
    { from: 'building', event: 'BUILD_FAIL', to: 'failed', action: recordFail, description: 'Build failed' },
    { from: 'building', event: 'START_TEST', to: 'testing', description: 'Skip to testing' },
    { from: 'building', event: 'CANCEL', to: 'failed', description: 'Cancel during build' },

    // ── TESTING ──
    { from: 'testing', event: 'TEST_PASS', to: 'staging', guard: testsPass, description: 'Tests passed' },
    { from: 'testing', event: 'TEST_FAIL', to: 'testing', guard: belowTestFailLimit, action: recordTestFail, description: 'Test failed, retry' },
    { from: 'testing', event: 'TEST_FAIL', to: 'failed', guard: (ctx) => ctx.testFailCount >= ctx.maxTestFails, action: recordFail, description: 'Max test failures' },
    { from: 'testing', event: 'START_STAGE', to: 'staging', guard: hasDeployAuthority, description: 'Skip to staging' },
    { from: 'testing', event: 'CANCEL', to: 'failed', description: 'Cancel during testing' },

    // ── STAGING ──
    { from: 'staging', event: 'STAGE_COMPLETE', to: 'deploying', guard: isApproved, description: 'Staging complete' },
    { from: 'staging', event: 'STAGE_COMPLETE', to: 'staging', guard: (ctx) => !ctx.approved, description: 'Awaiting approval' },
    { from: 'staging', event: 'STAGE_FAIL', to: 'failed', action: recordFail, description: 'Staging failed' },
    { from: 'staging', event: 'START_DEPLOY', to: 'deploying', guard: hasDeployAuthority, description: 'Start deploy' },
    { from: 'staging', event: 'CANCEL', to: 'failed', description: 'Cancel during staging' },

    // ── DEPLOYING ──
    { from: 'deploying', event: 'DEPLOY_COMPLETE', to: 'verifying', description: 'Deploy complete, verify' },
    { from: 'deploying', event: 'DEPLOY_FAIL', to: 'failed', action: recordFail, description: 'Deploy failed' },
    { from: 'deploying', event: 'CANCEL', to: 'rolling_back', description: 'Cancel, initiate rollback' },

    // ── VERIFYING ──
    { from: 'verifying', event: 'VERIFY_PASS', to: 'live', action: recordComplete, description: 'Verification passed' },
    { from: 'verifying', event: 'VERIFY_FAIL', to: 'rolling_back', description: 'Verification failed, rollback' },
    { from: 'verifying', event: 'GO_LIVE', to: 'live', guard: hasDeployAuthority, description: 'Force go live' },

    // ── LIVE ──
    { from: 'live', event: 'ROLLBACK', to: 'rolling_back', guard: hasDeployAuthority, description: 'Initiate rollback' },
    { from: 'live', event: 'FAIL', to: 'rolling_back', description: 'Live failure, rollback' },

    // ── ROLLING_BACK ──
    { from: 'rolling_back', event: 'ROLLBACK_COMPLETE', to: 'pending', description: 'Rollback complete' },
    { from: 'rolling_back', event: 'FAIL', to: 'failed', description: 'Rollback failed' },

    // ── FAILED ──
    { from: 'failed', event: 'RETRY', to: 'pending', description: 'Retry deployment' },
    { from: 'failed', event: 'ROLLBACK', to: 'rolling_back', description: 'Rollback from failed' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a deployment lifecycle machine instance.
 *
 * @param deploymentId — Unique deployment identifier.
 * @param artifactId — Artifact being deployed.
 * @param environment — Target environment.
 * @param version — Build version/tag.
 * @param overrides — Optional context overrides.
 */
export function createDeploymentMachine(
  deploymentId: string,
  artifactId: string,
  environment: string,
  version: string,
  overrides?: Partial<DeploymentContext>,
) {
  const { createMachine } = require('./createMachine') as typeof import('./createMachine');
  return createMachine(deploymentMachineDefinition, {
    context: {
      deploymentId,
      artifactId,
      environment,
      version,
      authority: 'AUTH_0_OBSERVE',
      testsRequired: true,
      testFailCount: 0,
      maxTestFails: 3,
      approved: false,
      ...overrides,
    },
  });
}
