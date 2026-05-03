/**
 * @fileoverview themeTransitionMachine.ts — Theme Transition State Machine
 *
 * Manages theme (light/dark/high-contrast) transitions in the Torafirma UI.
 * Ensures smooth, non-jarring theme changes with proper settlement detection.
 *
 * **4 states**: idle → transitioning → settled → failed
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/themeTransition
 * @version 0.2.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';
import { createMachine } from './createMachine';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 4 theme transition states. */
export type ThemeTransitionState =
  | 'idle'
  | 'transitioning'
  | 'settled'
  | 'failed';

/** All events the theme transition machine accepts. */
export type ThemeTransitionEvent =
  | 'REQUEST_TRANSITION'
  | 'BEGIN_TRANSITION'
  | 'COMPLETE'
  | 'FAIL'
  | 'RESET'
  | 'FORCE_SETTLE';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the theme transition machine. */
export interface ThemeTransitionContext {
  /** Current active theme identifier. */
  currentTheme: string;

  /** Target theme identifier. */
  targetTheme: string;

  /** Previous theme identifier (for rollback). */
  previousTheme: string;

  /** Whether reduced motion is preferred. */
  reducedMotion: boolean;

  /** Transition duration in milliseconds. */
  transitionDurationMs: number;

  /** Whether the transition is running. */
  isTransitioning: boolean;

  /** Error message if transition failed. */
  errorMessage?: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const themesDiffer: GuardFunction<ThemeTransitionContext> = (ctx) =>
  ctx.currentTheme !== ctx.targetTheme;

const reducedMotion: GuardFunction<ThemeTransitionContext> = (ctx) =>
  ctx.reducedMotion;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const beginTransition: ActionFunction<ThemeTransitionContext> = (ctx) => {
  ctx.previousTheme = ctx.currentTheme;
  ctx.isTransitioning = true;
};

const completeTransition: ActionFunction<ThemeTransitionContext> = (ctx) => {
  ctx.currentTheme = ctx.targetTheme;
  ctx.isTransitioning = false;
};

const recordFail: ActionFunction<ThemeTransitionContext> = (ctx, payload) => {
  ctx.isTransitioning = false;
  ctx.errorMessage = typeof payload === 'string' ? payload : 'Theme transition failed';
};

const resetTheme: ActionFunction<ThemeTransitionContext> = (ctx) => {
  ctx.isTransitioning = false;
  ctx.errorMessage = undefined;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Theme transition state machine — 4 states, 12+ transitions.
 *
 * Flow:
 * ```
 * idle → transitioning → settled
 *              ↓
 *           failed → idle (reset)
 * ```
 */
export const themeTransitionMachineDefinition: StateMachineDefinition<
  ThemeTransitionState,
  ThemeTransitionEvent,
  ThemeTransitionContext
> = {
  id: 'torafirma.theme.transition',
  name: 'Theme Transition State Machine',
  description: 'Manages smooth theme transitions with settlement and failure states.',
  version: '0.2.0',

  initialState: 'idle',

  states: ['idle', 'transitioning', 'settled', 'failed'],

  events: [
    'REQUEST_TRANSITION', 'BEGIN_TRANSITION', 'COMPLETE', 'FAIL', 'RESET', 'FORCE_SETTLE',
  ],

  createContext: (): ThemeTransitionContext => ({
    currentTheme: 'system',
    targetTheme: 'system',
    previousTheme: 'system',
    reducedMotion: false,
    transitionDurationMs: 300,
    isTransitioning: false,
  }),

  transitions: [
    // ── IDLE ──
    { from: 'idle', event: 'REQUEST_TRANSITION', to: 'transitioning', guard: themesDiffer, action: beginTransition, description: 'Start theme transition' },
    { from: 'idle', event: 'REQUEST_TRANSITION', to: 'settled', guard: reducedMotion, action: completeTransition, description: 'Instant settle (reduced motion)' },

    // ── TRANSITIONING ──
    { from: 'transitioning', event: 'COMPLETE', to: 'settled', action: completeTransition, description: 'Transition completed' },
    { from: 'transitioning', event: 'FAIL', to: 'failed', action: recordFail, description: 'Transition failed' },
    { from: 'transitioning', event: 'BEGIN_TRANSITION', to: 'transitioning', description: 'Transition in progress' },

    // ── SETTLED ──
    { from: 'settled', event: 'REQUEST_TRANSITION', to: 'transitioning', guard: themesDiffer, action: beginTransition, description: 'New transition request' },
    { from: 'settled', event: 'RESET', to: 'idle', action: resetTheme, description: 'Reset to idle' },

    // ── FAILED ──
    { from: 'failed', event: 'RESET', to: 'idle', action: resetTheme, description: 'Reset from failure' },
    { from: 'failed', event: 'REQUEST_TRANSITION', to: 'transitioning', action: beginTransition, description: 'Retry transition' },
    { from: 'failed', event: 'FORCE_SETTLE', to: 'settled', action: completeTransition, description: 'Force settle' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a theme transition machine instance.
 *
 * @param currentTheme — Starting theme identifier.
 * @param overrides — Optional context overrides.
 */
export function createThemeTransitionMachine(
  currentTheme?: string,
  overrides?: Partial<ThemeTransitionContext>,
) {
  return createMachine(themeTransitionMachineDefinition, {
    context: {
      currentTheme: currentTheme ?? 'system',
      targetTheme: currentTheme ?? 'system',
      previousTheme: 'system',
      reducedMotion: false,
      transitionDurationMs: 300,
      isTransitioning: false,
      ...overrides,
    },
  });
}
