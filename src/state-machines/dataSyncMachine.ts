/**
 * @fileoverview dataSyncMachine.ts — Data Synchronization State Machine
 *
 * Models data synchronization between Torafirma clients and backends,
 * including conflict detection, merging, and offline support.
 *
 * **7 states**: idle → syncing → synced → conflict → merging → error → offline
 *
 * @module torafirma/state-machines/dataSync
 * @version 2.0.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 7 data synchronization states. */
export type DataSyncState =
  | 'idle'
  | 'syncing'
  | 'synced'
  | 'conflict'
  | 'merging'
  | 'error'
  | 'offline';

/** All events the data sync machine accepts. */
export type DataSyncEvent =
  | 'SYNC'
  | 'SYNC_PROGRESS'
  | 'SYNC_COMPLETE'
  | 'SYNC_FAIL'
  | 'CONFLICT_DETECTED'
  | 'BEGIN_MERGE'
  | 'MERGE_COMPLETE'
  | 'MERGE_FAIL'
  | 'RESOLVE_CONFLICT'
  | 'RETRY'
  | 'GO_OFFLINE'
  | 'COME_ONLINE'
  | 'RESET'
  | 'FORCE_SYNC';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the data sync machine. */
export interface DataSyncContext {
  /** Sync target identifier. */
  syncId: string;

  /** Data source identifier. */
  sourceId: string;

  /** Last sync timestamp (ISO 8601). */
  lastSyncAt?: string;

  /** Number of records to sync. */
  totalRecords: number;

  /** Number of records synced. */
  syncedRecords: number;

  /** Number of conflicts detected. */
  conflictCount: number;

  /** Maximum retry attempts. */
  maxRetries: number;

  /** Current retry count. */
  retryCount: number;

  /** Error message. */
  errorMessage?: string;

  /** Whether offline mode is enabled. */
  offlineEnabled: boolean;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const belowRetryLimit: GuardFunction<DataSyncContext> = (ctx) =>
  ctx.retryCount < ctx.maxRetries;

const hasConflicts: GuardFunction<DataSyncContext> = (ctx) =>
  ctx.conflictCount > 0;

const allRecordsSynced: GuardFunction<DataSyncContext> = (ctx) =>
  ctx.syncedRecords >= ctx.totalRecords && ctx.totalRecords > 0;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const recordSyncStart: ActionFunction<DataSyncContext> = (ctx) => {
  ctx.syncedRecords = 0;
  ctx.conflictCount = 0;
};

const recordSyncProgress: ActionFunction<DataSyncContext> = (ctx, payload) => {
  if (typeof payload === 'number') {
    ctx.syncedRecords += payload;
  } else {
    ctx.syncedRecords += 1;
  }
};

const recordSyncComplete: ActionFunction<DataSyncContext> = (ctx) => {
  ctx.lastSyncAt = new Date().toISOString();
  ctx.retryCount = 0;
  ctx.errorMessage = undefined;
};

const recordConflict: ActionFunction<DataSyncContext> = (ctx, payload) => {
  ctx.conflictCount += 1;
};

const recordError: ActionFunction<DataSyncContext> = (ctx, payload) => {
  ctx.errorMessage = typeof payload === 'string' ? payload : 'SYNC_ERROR';
  ctx.retryCount += 1;
};

const recordMerge: ActionFunction<DataSyncContext> = (ctx) => {
  ctx.conflictCount = Math.max(0, ctx.conflictCount - 1);
};

const enableOffline: ActionFunction<DataSyncContext> = (ctx) => {
  ctx.offlineEnabled = true;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Data synchronization state machine — 7 states, 25+ transitions.
 *
 * Flow:
 * ```
 * idle → syncing → synced
 *           ↓
 *       conflict → merging → synced
 *           ↓
 *        error → idle (retry)
 *           ↓
 *       offline → idle (reconnect)
 * ```
 */
export const dataSyncMachineDefinition: StateMachineDefinition<
  DataSyncState,
  DataSyncEvent,
  DataSyncContext
> = {
  id: 'torafirma.data.sync',
  name: 'Data Synchronization State Machine',
  description: 'Data sync lifecycle with conflict detection, merging, and offline support.',
  version: '2.0.0',

  initialState: 'idle',

  states: ['idle', 'syncing', 'synced', 'conflict', 'merging', 'error', 'offline'],

  events: [
    'SYNC', 'SYNC_PROGRESS', 'SYNC_COMPLETE', 'SYNC_FAIL', 'CONFLICT_DETECTED',
    'BEGIN_MERGE', 'MERGE_COMPLETE', 'MERGE_FAIL', 'RESOLVE_CONFLICT', 'RETRY',
    'GO_OFFLINE', 'COME_ONLINE', 'RESET', 'FORCE_SYNC',
  ],

  createContext: (): DataSyncContext => ({
    syncId: '',
    sourceId: '',
    totalRecords: 0,
    syncedRecords: 0,
    conflictCount: 0,
    maxRetries: 3,
    retryCount: 0,
    offlineEnabled: false,
  }),

  transitions: [
    // ── IDLE ──
    { from: 'idle', event: 'SYNC', to: 'syncing', action: recordSyncStart, description: 'Begin sync' },
    { from: 'idle', event: 'FORCE_SYNC', to: 'syncing', action: recordSyncStart, description: 'Force sync' },
    { from: 'idle', event: 'GO_OFFLINE', to: 'offline', action: enableOffline, description: 'Go offline' },

    // ── SYNCING ──
    { from: 'syncing', event: 'SYNC_PROGRESS', to: 'syncing', action: recordSyncProgress, description: 'Sync in progress' },
    { from: 'syncing', event: 'SYNC_COMPLETE', to: 'synced', guard: allRecordsSynced, action: recordSyncComplete, description: 'Sync complete' },
    { from: 'syncing', event: 'CONFLICT_DETECTED', to: 'conflict', action: recordConflict, description: 'Conflict detected' },
    { from: 'syncing', event: 'SYNC_FAIL', to: 'error', guard: belowRetryLimit, action: recordError, description: 'Sync failed (retryable)' },
    { from: 'syncing', event: 'SYNC_FAIL', to: 'offline', guard: (ctx) => ctx.retryCount >= ctx.maxRetries, action: recordError, description: 'Max retries, go offline' },
    { from: 'syncing', event: 'GO_OFFLINE', to: 'offline', action: enableOffline, description: 'Go offline during sync' },

    // ── SYNCED ──
    { from: 'synced', event: 'SYNC', to: 'syncing', action: recordSyncStart, description: 'Re-sync' },
    { from: 'synced', event: 'CONFLICT_DETECTED', to: 'conflict', action: recordConflict, description: 'New conflict detected' },
    { from: 'synced', event: 'GO_OFFLINE', to: 'offline', action: enableOffline, description: 'Go offline' },
    { from: 'synced', event: 'RESET', to: 'idle', description: 'Reset to idle' },

    // ── CONFLICT ──
    { from: 'conflict', event: 'BEGIN_MERGE', to: 'merging', description: 'Begin merge' },
    { from: 'conflict', event: 'RESOLVE_CONFLICT', to: 'synced', guard: (ctx) => ctx.conflictCount === 0, action: recordMerge, description: 'Conflict resolved' },
    { from: 'conflict', event: 'SYNC', to: 'syncing', description: 'Re-sync from conflict' },
    { from: 'conflict', event: 'GO_OFFLINE', to: 'offline', action: enableOffline, description: 'Go offline' },

    // ── MERGING ──
    { from: 'merging', event: 'MERGE_COMPLETE', to: 'synced', guard: (ctx) => ctx.conflictCount === 0, action: recordSyncComplete, description: 'Merge complete' },
    { from: 'merging', event: 'MERGE_COMPLETE', to: 'conflict', guard: hasConflicts, action: recordMerge, description: 'Partial merge, more conflicts' },
    { from: 'merging', event: 'MERGE_FAIL', to: 'conflict', description: 'Merge failed' },

    // ── ERROR ──
    { from: 'error', event: 'RETRY', to: 'syncing', action: recordSyncStart, description: 'Retry sync' },
    { from: 'error', event: 'RESET', to: 'idle', description: 'Reset from error' },
    { from: 'error', event: 'GO_OFFLINE', to: 'offline', action: enableOffline, description: 'Go offline from error' },

    // ── OFFLINE ──
    { from: 'offline', event: 'COME_ONLINE', to: 'idle', description: 'Come back online' },
    { from: 'offline', event: 'FORCE_SYNC', to: 'syncing', action: recordSyncStart, description: 'Force sync from offline' },
    { from: 'offline', event: 'RESET', to: 'idle', description: 'Reset from offline' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a data sync machine instance.
 *
 * @param syncId — Unique sync identifier.
 * @param sourceId — Data source identifier.
 * @param overrides — Optional context overrides.
 */
export function createDataSyncMachine(
  syncId: string,
  sourceId: string,
  overrides?: Partial<DataSyncContext>,
) {
  const { createMachine } = require('./createMachine') as typeof import('./createMachine');
  return createMachine(dataSyncMachineDefinition, {
    context: {
      syncId,
      sourceId,
      totalRecords: 0,
      syncedRecords: 0,
      conflictCount: 0,
      maxRetries: 3,
      retryCount: 0,
      offlineEnabled: false,
      ...overrides,
    },
  });
}
