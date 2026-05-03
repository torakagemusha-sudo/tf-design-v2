/**
 * @fileoverview modalDialogMachine.ts — Modal Dialog Lifecycle State Machine
 *
 * Models the complete lifecycle of modal, drawer, and overlay components in
 * the Torafirma UI. Handles focus trapping, confirmation, submission, and
 * error states with proper entry/exit semantics.
 *
 * **8 states**: closed → opening → open → confirming → submitting →
 * closing → closed → error
 *
 * Spec: 03.0 Section 3.11 — Overlay Components
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/modalDialog
 * @version 0.2.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';
import { createMachine } from './createMachine';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 8 modal dialog lifecycle states. */
export type ModalDialogState =
  | 'closed'
  | 'opening'
  | 'open'
  | 'confirming'
  | 'submitting'
  | 'closing'
  | 'error'
  | 'dismissed';

/** All events the modal dialog machine accepts. */
export type ModalDialogEvent =
  | 'OPEN'
  | 'OPEN_COMPLETE'
  | 'CONFIRM'
  | 'CANCEL_CONFIRM'
  | 'SUBMIT'
  | 'SUBMIT_SUCCESS'
  | 'SUBMIT_FAIL'
  | 'CLOSE'
  | 'CLOSE_COMPLETE'
  | 'DISMISS'
  | 'ERROR'
  | 'RECOVER'
  | 'RESET';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the modal dialog machine. */
export interface ModalDialogContext {
  /** Dialog identifier. */
  dialogId: string;

  /** Dialog title. */
  title: string;

  /** Whether the dialog requires confirmation. */
  requiresConfirmation: boolean;

  /** Whether confirmation has been given. */
  confirmed: boolean;

  /** Whether the dialog is submitting. */
  isSubmitting: boolean;

  /** Whether the dialog is destructive. */
  isDestructive: boolean;

  /** Consequence description shown to user. */
  consequenceDescription: string;

  /** Error message. */
  errorMessage?: string;

  /** Submission result data. */
  resultData?: unknown;

  /** Whether focus is trapped within the dialog. */
  focusTrapped: boolean;

  /** Dialog variant: modal, drawer, popover, alert. */
  variant: 'modal' | 'drawer' | 'popover' | 'alert';

  /** Whether the dialog can be dismissed via escape/overlay click. */
  dismissible: boolean;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const requiresConfirmation: GuardFunction<ModalDialogContext> = (ctx) =>
  ctx.requiresConfirmation && !ctx.confirmed;

const isConfirmed: GuardFunction<ModalDialogContext> = (ctx) =>
  ctx.confirmed;

const isDismissible: GuardFunction<ModalDialogContext> = (ctx) =>
  ctx.dismissible;

const isDestructive: GuardFunction<ModalDialogContext> = (ctx) =>
  ctx.isDestructive;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const markConfirmed: ActionFunction<ModalDialogContext> = (ctx) => {
  ctx.confirmed = true;
};

const clearConfirmed: ActionFunction<ModalDialogContext> = (ctx) => {
  ctx.confirmed = false;
};

const markSubmitting: ActionFunction<ModalDialogContext> = (ctx) => {
  ctx.isSubmitting = true;
};

const clearSubmitting: ActionFunction<ModalDialogContext> = (ctx) => {
  ctx.isSubmitting = false;
};

const recordResult: ActionFunction<ModalDialogContext> = (ctx, payload) => {
  ctx.resultData = payload;
  ctx.isSubmitting = false;
};

const recordError: ActionFunction<ModalDialogContext> = (ctx, payload) => {
  ctx.errorMessage = typeof payload === 'string' ? payload : 'DIALOG_ERROR';
  ctx.isSubmitting = false;
};

const resetDialog: ActionFunction<ModalDialogContext> = (ctx) => {
  ctx.confirmed = false;
  ctx.isSubmitting = false;
  ctx.errorMessage = undefined;
  ctx.resultData = undefined;
};

const trapFocus: ActionFunction<ModalDialogContext> = (ctx) => {
  ctx.focusTrapped = true;
};

const releaseFocus: ActionFunction<ModalDialogContext> = (ctx) => {
  ctx.focusTrapped = false;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Modal dialog lifecycle state machine — 8 states, 25+ transitions.
 *
 * Flow:
 * ```
 * closed → opening → open → confirming → submitting → closing → closed
 *                                           ↓
 *                                        error → open (recover)
 *
 * open → closing → closed (cancel)
 * ```
 */
export const modalDialogMachineDefinition: StateMachineDefinition<
  ModalDialogState,
  ModalDialogEvent,
  ModalDialogContext
> = {
  id: 'torafirma.modal.dialog',
  name: 'Modal Dialog Lifecycle State Machine',
  description: 'Modal, drawer, and overlay lifecycle with focus trapping, confirmation, and error handling.',
  version: '0.2.0',

  initialState: 'closed',

  states: ['closed', 'opening', 'open', 'confirming', 'submitting', 'closing', 'error', 'dismissed'],

  events: [
    'OPEN', 'OPEN_COMPLETE', 'CONFIRM', 'CANCEL_CONFIRM', 'SUBMIT',
    'SUBMIT_SUCCESS', 'SUBMIT_FAIL', 'CLOSE', 'CLOSE_COMPLETE', 'DISMISS',
    'ERROR', 'RECOVER', 'RESET',
  ],

  createContext: (): ModalDialogContext => ({
    dialogId: '',
    title: '',
    requiresConfirmation: false,
    confirmed: false,
    isSubmitting: false,
    isDestructive: false,
    consequenceDescription: '',
    focusTrapped: false,
    variant: 'modal',
    dismissible: true,
  }),

  stateActions: {
    opening: {
      entry: [resetDialog, trapFocus],
    },
    open: {
      entry: trapFocus,
    },
    closing: {
      entry: releaseFocus,
      exit: resetDialog,
    },
    closed: {
      entry: [releaseFocus, resetDialog],
    },
    dismissed: {
      entry: [releaseFocus, resetDialog],
    },
  },

  transitions: [
    // ── CLOSED ──
    { from: 'closed', event: 'OPEN', to: 'opening', description: 'Begin opening' },

    // ── OPENING ──
    { from: 'opening', event: 'OPEN_COMPLETE', to: 'open', description: 'Open animation complete' },
    { from: 'opening', event: 'ERROR', to: 'error', action: recordError, description: 'Error during open' },
    { from: 'opening', event: 'CLOSE', to: 'closing', description: 'Close during opening' },

    // ── OPEN ──
    { from: 'open', event: 'CONFIRM', to: 'confirming', guard: requiresConfirmation, action: markConfirmed, description: 'Confirm action' },
    { from: 'open', event: 'SUBMIT', to: 'submitting', guard: (ctx) => !ctx.requiresConfirmation || ctx.confirmed, action: markSubmitting, description: 'Submit' },
    { from: 'open', event: 'CLOSE', to: 'closing', guard: isDismissible, description: 'Close dialog' },
    { from: 'open', event: 'DISMISS', to: 'dismissed', guard: isDismissible, description: 'Dismiss dialog' },
    { from: 'open', event: 'ERROR', to: 'error', action: recordError, description: 'Error in open' },

    // ── CONFIRMING ──
    { from: 'confirming', event: 'CONFIRM', to: 'submitting', guard: isConfirmed, action: markSubmitting, description: 'Confirmed, submit' },
    { from: 'confirming', event: 'CANCEL_CONFIRM', to: 'open', action: clearConfirmed, description: 'Cancel confirmation' },
    { from: 'confirming', event: 'CLOSE', to: 'closing', guard: isDismissible, description: 'Close during confirm' },

    // ── SUBMITTING ──
    { from: 'submitting', event: 'SUBMIT_SUCCESS', to: 'closing', action: recordResult, description: 'Submit succeeded' },
    { from: 'submitting', event: 'SUBMIT_FAIL', to: 'error', action: recordError, description: 'Submit failed' },
    { from: 'submitting', event: 'CLOSE', to: 'closing', guard: isDismissible, action: clearSubmitting, description: 'Close during submit' },

    // ── CLOSING ──
    { from: 'closing', event: 'CLOSE_COMPLETE', to: 'closed', description: 'Close animation complete' },
    { from: 'closing', event: 'ERROR', to: 'error', action: recordError, description: 'Error during close' },

    // ── ERROR ──
    { from: 'error', event: 'RECOVER', to: 'open', description: 'Recover from error' },
    { from: 'error', event: 'CLOSE', to: 'closing', description: 'Close from error' },
    { from: 'error', event: 'RESET', to: 'closed', action: resetDialog, description: 'Reset from error' },

    // ── DISMISSED ──
    { from: 'dismissed', event: 'OPEN', to: 'opening', description: 'Re-open dismissed' },
    { from: 'dismissed', event: 'RESET', to: 'closed', description: 'Reset from dismissed' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a modal dialog lifecycle machine instance.
 *
 * @param dialogId — Unique dialog identifier.
 * @param title — Dialog title.
 * @param variant — Dialog variant: modal, drawer, popover, alert.
 * @param overrides — Optional context overrides.
 */
export function createModalDialogMachine(
  dialogId: string,
  title: string,
  variant?: 'modal' | 'drawer' | 'popover' | 'alert',
  overrides?: Partial<ModalDialogContext>,
) {
  return createMachine(modalDialogMachineDefinition, {
    context: {
      dialogId,
      title,
      requiresConfirmation: false,
      confirmed: false,
      isSubmitting: false,
      isDestructive: false,
      consequenceDescription: '',
      focusTrapped: false,
      variant: variant ?? 'modal',
      dismissible: true,
      ...overrides,
    },
  });
}
