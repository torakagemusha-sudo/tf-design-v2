/**
 * @fileoverview graphEditMachine.ts — Graph Editing State Machine
 *
 * Models the editing interaction modes for the Torafirma graph canvas.
 * Manages transitions between viewing, selecting, panning, zooming,
 * connecting, dragging, resizing, deleting, undoing, and redoing.
 *
 * **10 states**: viewing → selecting → panning → zooming → connecting →
 * dragging → resizing → deleting → undoing → redoing
 *
 * Spec: 03.0 Section 3.5 — Graph Components
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/graphEdit
 * @version 0.2.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';
import { createMachine } from './createMachine';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 10 graph editing states. */
export type GraphEditState =
  | 'viewing'
  | 'selecting'
  | 'panning'
  | 'zooming'
  | 'connecting'
  | 'dragging'
  | 'resizing'
  | 'deleting'
  | 'undoing'
  | 'redoing';

/** All events the graph editing machine accepts. */
export type GraphEditEvent =
  | 'CLICK'
  | 'DRAG_START'
  | 'DRAG_END'
  | 'PAN_START'
  | 'PAN_END'
  | 'ZOOM_IN'
  | 'ZOOM_OUT'
  | 'ZOOM_END'
  | 'CONNECT_START'
  | 'CONNECT_END'
  | 'CONNECT_CANCEL'
  | 'RESIZE_START'
  | 'RESIZE_END'
  | 'DELETE'
  | 'DELETE_CONFIRM'
  | 'UNDO'
  | 'UNDO_COMPLETE'
  | 'REDO'
  | 'REDO_COMPLETE'
  | 'ESCAPE'
  | 'IDLE'
  | 'SELECT'
  | 'MULTI_SELECT';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the graph editing machine. */
export interface GraphEditContext {
  /** Graph canvas identifier. */
  canvasId: string;

  /** Currently selected node IDs. */
  selectedNodes: string[];

  /** Currently active tool mode. */
  activeTool: string;

  /** Whether the graph has unsaved changes. */
  hasChanges: boolean;

  /** Whether connection mode is active. */
  connectionMode: boolean;

  /** Source port for connection. */
  connectSource?: string;

  /** Target port for connection. */
  connectTarget?: string;

  /** Whether a multi-select operation is active. */
  multiSelect: boolean;

  /** History stack depth. */
  historyDepth: number;

  /** Current position in history stack. */
  historyPosition: number;

  /** Authority level of the operator. */
  authority: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const hasEditAuthority: GuardFunction<GraphEditContext> = (ctx) =>
  ctx.authority === 'AUTH_1_DRAFT' ||
  ctx.authority === 'AUTH_2_STAGE' ||
  ctx.authority === 'AUTH_3_EXECUTE' ||
  ctx.authority === 'AUTH_4_COMMIT' ||
  ctx.authority === 'AUTH_5_OVERRIDE' ||
  ctx.authority === 'AUTH_6_ROOT';

const hasSelectedNodes: GuardFunction<GraphEditContext> = (ctx) =>
  ctx.selectedNodes.length > 0;

const inConnectionMode: GuardFunction<GraphEditContext> = (ctx) =>
  ctx.connectionMode;

const canUndo: GuardFunction<GraphEditContext> = (ctx) =>
  ctx.historyPosition > 0;

const canRedo: GuardFunction<GraphEditContext> = (ctx) =>
  ctx.historyPosition < ctx.historyDepth;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const selectNode: ActionFunction<GraphEditContext> = (ctx, payload) => {
  if (typeof payload === 'string') {
    if (ctx.multiSelect) {
      ctx.selectedNodes = [...ctx.selectedNodes, payload];
    } else {
      ctx.selectedNodes = [payload];
    }
  }
};

const clearSelection: ActionFunction<GraphEditContext> = (ctx) => {
  ctx.selectedNodes = [];
};

const markChanged: ActionFunction<GraphEditContext> = (ctx) => {
  ctx.hasChanges = true;
};

const enterConnectionMode: ActionFunction<GraphEditContext> = (ctx, payload) => {
  ctx.connectionMode = true;
  ctx.connectSource = typeof payload === 'string' ? payload : undefined;
};

const exitConnectionMode: ActionFunction<GraphEditContext> = (ctx) => {
  ctx.connectionMode = false;
  ctx.connectSource = undefined;
  ctx.connectTarget = undefined;
};

const setConnectionTarget: ActionFunction<GraphEditContext> = (ctx, payload) => {
  ctx.connectTarget = typeof payload === 'string' ? payload : undefined;
};

const removeSelected: ActionFunction<GraphEditContext> = (ctx) => {
  ctx.selectedNodes = [];
  ctx.hasChanges = true;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Graph editing state machine — 10 states, 40+ transitions.
 *
 * Editing flow:
 * ```
 * viewing → selecting (click) → dragging (drag) → viewing (release)
 * viewing → panning → viewing
 * viewing → zooming → viewing
 * viewing → connecting (port click) → connecting → viewing (complete/cancel)
 * selecting → resizing → viewing
 * selecting → deleting → viewing
 * viewing → undoing → viewing
 * viewing → redoing → viewing
 * ```
 */
export const graphEditMachineDefinition: StateMachineDefinition<
  GraphEditState,
  GraphEditEvent,
  GraphEditContext
> = {
  id: 'torafirma.graph.edit',
  name: 'Graph Editing State Machine',
  description: 'Graph canvas interaction modes: view, select, pan, zoom, connect, drag, resize, delete, undo, redo.',
  version: '0.2.0',

  initialState: 'viewing',

  states: ['viewing', 'selecting', 'panning', 'zooming', 'connecting', 'dragging', 'resizing', 'deleting', 'undoing', 'redoing'],

  events: [
    'CLICK', 'DRAG_START', 'DRAG_END', 'PAN_START', 'PAN_END', 'ZOOM_IN', 'ZOOM_OUT',
    'ZOOM_END', 'CONNECT_START', 'CONNECT_END', 'CONNECT_CANCEL', 'RESIZE_START',
    'RESIZE_END', 'DELETE', 'DELETE_CONFIRM', 'UNDO', 'UNDO_COMPLETE', 'REDO',
    'REDO_COMPLETE', 'ESCAPE', 'IDLE', 'SELECT', 'MULTI_SELECT',
  ],

  createContext: (): GraphEditContext => ({
    canvasId: '',
    selectedNodes: [],
    activeTool: 'select',
    hasChanges: false,
    connectionMode: false,
    multiSelect: false,
    historyDepth: 0,
    historyPosition: 0,
    authority: 'AUTH_0_OBSERVE',
  }),

  transitions: [
    // ── VIEWING ── (base state)
    { from: 'viewing', event: 'CLICK', to: 'selecting', guard: hasEditAuthority, action: selectNode, description: 'Select node' },
    { from: 'viewing', event: 'SELECT', to: 'selecting', guard: hasEditAuthority, action: selectNode, description: 'Select' },
    { from: 'viewing', event: 'MULTI_SELECT', to: 'selecting', guard: hasEditAuthority, description: 'Multi-select' },
    { from: 'viewing', event: 'PAN_START', to: 'panning', description: 'Start pan' },
    { from: 'viewing', event: 'ZOOM_IN', to: 'zooming', description: 'Zoom in' },
    { from: 'viewing', event: 'ZOOM_OUT', to: 'zooming', description: 'Zoom out' },
    { from: 'viewing', event: 'CONNECT_START', to: 'connecting', guard: hasEditAuthority, action: enterConnectionMode, description: 'Start connection' },
    { from: 'viewing', event: 'DRAG_START', to: 'dragging', guard: hasEditAuthority, description: 'Start drag' },
    { from: 'viewing', event: 'UNDO', to: 'undoing', guard: canUndo, description: 'Undo' },
    { from: 'viewing', event: 'REDO', to: 'redoing', guard: canRedo, description: 'Redo' },

    // ── SELECTING ──
    { from: 'selecting', event: 'CLICK', to: 'selecting', guard: hasEditAuthority, action: selectNode, description: 'Select another node' },
    { from: 'selecting', event: 'DRAG_START', to: 'dragging', guard: hasSelectedNodes, description: 'Drag selected' },
    { from: 'selecting', event: 'RESIZE_START', to: 'resizing', guard: hasSelectedNodes, description: 'Resize selected' },
    { from: 'selecting', event: 'DELETE', to: 'deleting', guard: hasEditAuthority, description: 'Delete selected' },
    { from: 'selecting', event: 'CONNECT_START', to: 'connecting', guard: hasEditAuthority, action: enterConnectionMode, description: 'Connect from selected' },
    { from: 'selecting', event: 'PAN_START', to: 'panning', action: clearSelection, description: 'Pan (clear selection)' },
    { from: 'selecting', event: 'ESCAPE', to: 'viewing', action: clearSelection, description: 'Deselect' },
    { from: 'selecting', event: 'IDLE', to: 'viewing', description: 'Return to viewing' },

    // ── PANNING ──
    { from: 'panning', event: 'PAN_END', to: 'viewing', description: 'End pan' },
    { from: 'panning', event: 'ESCAPE', to: 'viewing', description: 'Cancel pan' },

    // ── ZOOMING ──
    { from: 'zooming', event: 'ZOOM_END', to: 'viewing', description: 'End zoom' },
    { from: 'zooming', event: 'ESCAPE', to: 'viewing', description: 'Cancel zoom' },
    { from: 'zooming', event: 'IDLE', to: 'viewing', description: 'Zoom settled' },

    // ── CONNECTING ──
    { from: 'connecting', event: 'CLICK', to: 'connecting', action: setConnectionTarget, description: 'Set connection target' },
    { from: 'connecting', event: 'CONNECT_END', to: 'viewing', guard: hasEditAuthority, action: [markChanged, exitConnectionMode], description: 'Connection complete' },
    { from: 'connecting', event: 'CONNECT_CANCEL', to: 'viewing', action: exitConnectionMode, description: 'Cancel connection' },
    { from: 'connecting', event: 'ESCAPE', to: 'viewing', action: exitConnectionMode, description: 'Escape connection' },

    // ── DRAGGING ──
    { from: 'dragging', event: 'DRAG_END', to: 'viewing', guard: hasEditAuthority, action: markChanged, description: 'Drag complete' },
    { from: 'dragging', event: 'ESCAPE', to: 'selecting', description: 'Cancel drag' },

    // ── RESIZING ──
    { from: 'resizing', event: 'RESIZE_END', to: 'viewing', guard: hasEditAuthority, action: markChanged, description: 'Resize complete' },
    { from: 'resizing', event: 'ESCAPE', to: 'selecting', description: 'Cancel resize' },

    // ── DELETING ──
    { from: 'deleting', event: 'DELETE_CONFIRM', to: 'viewing', guard: hasEditAuthority, action: [removeSelected, markChanged], description: 'Confirm delete' },
    { from: 'deleting', event: 'ESCAPE', to: 'selecting', description: 'Cancel delete' },

    // ── UNDOING ──
    { from: 'undoing', event: 'UNDO_COMPLETE', to: 'viewing', description: 'Undo complete' },
    { from: 'undoing', event: 'IDLE', to: 'viewing', description: 'Undo settled' },

    // ── REDOING ──
    { from: 'redoing', event: 'REDO_COMPLETE', to: 'viewing', description: 'Redo complete' },
    { from: 'redoing', event: 'IDLE', to: 'viewing', description: 'Redo settled' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a graph editing state machine instance.
 *
 * @param canvasId — Graph canvas identifier.
 * @param authority — Operator authority level.
 * @param overrides — Optional context overrides.
 */
export function createGraphEditMachine(
  canvasId: string,
  authority?: string,
  overrides?: Partial<GraphEditContext>,
) {
  return createMachine(graphEditMachineDefinition, {
    context: {
      canvasId,
      selectedNodes: [],
      activeTool: 'select',
      hasChanges: false,
      connectionMode: false,
      multiSelect: false,
      historyDepth: 0,
      historyPosition: 0,
      authority: authority ?? 'AUTH_0_OBSERVE',
      ...overrides,
    },
  });
}
