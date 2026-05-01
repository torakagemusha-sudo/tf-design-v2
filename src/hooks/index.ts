/**
 * ============================================================
 * Torafirma Design System v2 — Hooks
 * ============================================================
 *
 * React hooks for authority, component state, theme, trace,
 * command execution, validation, telemetry, modal, toast, and drawer.
 *
 * These hooks provide the behavioral layer on top of the design
 * system's visual foundation. They enforce governance patterns,
 * state machine semantics, and operational telemetry.
 * ============================================================
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  AuthorityLevel,
  CommandDescriptor,
  CommandResult,
  ComponentDensity,
  StateMachineConfig,
  StateMachineContext,
  StateMachineEventType,
  StateMachineSnapshot,
  TelemetryEvent,
  ToastItem,
  ToastPosition,
  TorafirmaComponentState,
  TorafirmaTheme,
  TraceEvent,
  ValidationResult,
  UseAuthorityReturn,
  UseComponentStateReturn,
  UseCommandReturn,
  UseDrawerReturn,
  UseModalReturn,
  UseTelemetryReturn,
  UseThemeReturn,
  UseToastReturn,
  UseTraceReturn,
  UseValidationReturn,
  DrawerPosition,
} from '../types';

// ═══════════════════════════════════════════════════════════════
// Hook 1: useAuthority
// Manages authority levels and elevation requests.
// ═══════════════════════════════════════════════════════════════

/**
 * React hook for managing authority levels and elevation requests.
 *
 * @param initialAuthority - Starting authority level
 * @param availableLevels - All authority levels available to the user
 * @returns Authority management utilities
 */
export function useAuthority(
  initialAuthority: AuthorityLevel = 'AUTH_0_OBSERVE',
  availableLevels: AuthorityLevel[] = [
    'AUTH_0_OBSERVE',
    'AUTH_1_DRAFT',
    'AUTH_2_STAGE',
    'AUTH_3_EXECUTE',
    'AUTH_4_COMMIT',
    'AUTH_5_OVERRIDE',
    'AUTH_6_ROOT',
  ],
): UseAuthorityReturn {
  const [authority, setAuthority] = useState<AuthorityLevel>(initialAuthority);
  const [isElevating, setIsElevating] = useState(false);

  const authorityRank: Record<AuthorityLevel, number> = {
    'AUTH_0_OBSERVE': 0,
    'AUTH_1_DRAFT': 1,
    'AUTH_2_STAGE': 2,
    'AUTH_3_EXECUTE': 3,
    'AUTH_4_COMMIT': 4,
    'AUTH_5_OVERRIDE': 5,
    'AUTH_6_ROOT': 6,
  };

  const hasRequiredAuthority = useCallback(
    (required: AuthorityLevel): boolean => {
      return authorityRank[authority] >= authorityRank[required];
    },
    [authority],
  );

  const requestElevation = useCallback(
    async (target: AuthorityLevel, _reason: string): Promise<boolean> => {
      setIsElevating(true);
      try {
        if (!availableLevels.includes(target)) {
          return false;
        }
        if (authorityRank[target] <= authorityRank[authority]) {
          return true;
        }
        // Simulate elevation flow (integrate with auth system)
        await new Promise((resolve) => setTimeout(resolve, 300));
        setAuthority(target);
        return true;
      } finally {
        setIsElevating(false);
      }
    },
    [authority, availableLevels],
  );

  return {
    authority,
    hasRequiredAuthority,
    requestElevation,
    isElevating,
    availableLevels,
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 2: useComponentState
// Manages state machine transitions for components.
// ═══════════════════════════════════════════════════════════════

const DEFAULT_STATE_MACHINE: StateMachineConfig = {
  initial: 'idle',
  states: {
    idle: {},
    ready: {},
    dirty: {},
    validating: {},
    valid: {},
    warning: {},
    blocked: {},
    staged: {},
    running: {},
    complete: {},
    degraded: {},
    faulted: {},
    locked: {},
    simulated: {},
    committed: {},
    deployed: {},
    disconnected: {},
  },
  transitions: [
    { from: 'idle', to: 'ready', event: 'INIT' },
    { from: 'ready', to: 'dirty', event: 'USER_INPUT' },
    { from: 'dirty', to: 'validating', event: 'VALIDATE' },
    { from: 'validating', to: 'valid', event: 'VALIDATION_PASSED' },
    { from: 'validating', to: 'warning', event: 'VALIDATION_FAILED' },
    { from: 'valid', to: 'staged', event: 'STAGE' },
    { from: 'staged', to: 'running', event: 'EXECUTE' },
    { from: 'running', to: 'complete', event: 'EXECUTION_COMPLETE' },
    { from: 'running', to: 'faulted', event: 'EXECUTION_FAILED' },
    { from: 'complete', to: 'committed', event: 'COMMIT' },
    { from: 'staged', to: 'idle', event: 'ROLLBACK' },
    { from: 'ready', to: 'blocked', event: 'BLOCK' },
    { from: 'blocked', to: 'ready', event: 'UNBLOCK' },
    { from: 'faulted', to: 'idle', event: 'RECOVER' },
    { from: 'faulted', to: 'degraded', event: 'RECOVER' },
    { from: 'idle', to: 'locked', event: 'LOCK' },
    { from: 'locked', to: 'idle', event: 'UNLOCK' },
    { from: 'ready', to: 'simulated', event: 'INIT' },
    { from: 'dirty', to: 'idle', event: 'RESET' },
  ],
};

const TERMINAL_STATES: TorafirmaComponentState[] = ['complete', 'committed', 'faulted', 'disconnected'];

/**
 * React hook for managing component state machine transitions.
 *
 * @param config - State machine configuration
 * @param initialContext - Initial context data
 * @returns Component state management utilities
 */
export function useComponentState(
  config: StateMachineConfig = DEFAULT_STATE_MACHINE,
  initialContext: StateMachineContext = {},
): UseComponentStateReturn {
  const [current, setCurrent] = useState<TorafirmaComponentState>(config.initial);
  const [previous, setPrevious] = useState<TorafirmaComponentState | null>(null);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const contextRef = useRef<StateMachineContext>(initialContext);

  const transition = useCallback(
    (event: StateMachineEventType, context?: Partial<StateMachineContext>): boolean => {
      if (context) {
        contextRef.current = { ...contextRef.current, ...context };
      }

      const found = config.transitions.find(
        (t) => t.from === current && t.event === event,
      );

      if (!found) return false;

      if (found.guard && !found.guard(current, found.to, contextRef.current)) {
        return false;
      }

      // Execute exit action
      const fromState = config.states[current];
      if (fromState?.onExit) {
        fromState.onExit(current, found.to, contextRef.current);
      }

      // Execute transition action
      if (found.action) {
        found.action(current, found.to, contextRef.current);
      }

      setPrevious(current);
      setCurrent(found.to);
      setLastEvent(event);

      // Execute entry action
      const toState = config.states[found.to];
      if (toState?.onEnter) {
        toState.onEnter(current, found.to, contextRef.current);
      }

      return true;
    },
    [current, config],
  );

  const canTransition = useCallback(
    (target: TorafirmaComponentState): boolean => {
      return config.transitions.some(
        (t) => t.from === current && t.to === target,
      );
    },
    [current, config.transitions],
  );

  const availableTransitions = config.transitions.filter((t) => t.from === current);
  const availableStates = availableTransitions.map((t) => t.to);

  const snapshot: StateMachineSnapshot = {
    current,
    previous,
    lastEvent,
    lastTransitionAt: lastEvent ? new Date().toISOString() : null,
    canAccept: true,
    availableTransitions,
  };

  return {
    state: current,
    transition,
    canTransition,
    availableStates: [...new Set(availableStates)],
    snapshot,
    isLoading: current === 'validating' || current === 'running',
    isTerminal: TERMINAL_STATES.includes(current),
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 3: useTheme
// Manages active theme with system preference detection.
// ═══════════════════════════════════════════════════════════════

const THEMES: TorafirmaTheme[] = ['command-dark', 'field-green', 'deep-blue', 'forge', 'redline'];

/**
 * React hook for managing the active Torafirma theme.
 *
 * @param initialTheme - Starting theme
 * @returns Theme management utilities
 */
export function useTheme(initialTheme: TorafirmaTheme = 'command-dark'): UseThemeReturn {
  const [theme, setTheme] = useState<TorafirmaTheme>(initialTheme);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const handleSetTheme = useCallback((newTheme: TorafirmaTheme) => {
    setIsTransitioning(true);
    setTheme(newTheme);
    // Allow CSS transition to complete
    requestAnimationFrame(() => {
      setTimeout(() => setIsTransitioning(false), 300);
    });
  }, []);

  return {
    theme,
    setTheme: handleSetTheme,
    availableThemes: THEMES,
    systemPrefersDark,
    isTransitioning,
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 4: useTrace
// Manages trace IDs and audit logging.
// ═══════════════════════════════════════════════════════════════

/**
 * React hook for managing trace IDs and audit logging.
 *
 * @returns Trace management utilities
 */
export function useTrace(): UseTraceReturn {
  const [traceId, setTraceId] = useState<string | null>(null);
  const [isTracing, setIsTracing] = useState(false);
  const eventsRef = useRef<TraceEvent[]>([]);

  const startTrace = useCallback((operation: string, target: string): string => {
    const newTraceId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const event: TraceEvent = {
      event_id: `${newTraceId}-0`,
      timestamp: new Date().toISOString(),
      actor: 'current-user',
      authority: 'AUTH_0_OBSERVE',
      operation,
      target,
      state_before: 'idle',
      state_after: 'ready',
      result: 'started',
      reason_code: null,
      runtime: 'browser',
      parent_trace: null,
    };
    eventsRef.current = [event];
    setTraceId(newTraceId);
    setIsTracing(true);
    return newTraceId;
  }, []);

  const endTrace = useCallback(
    (result: string, reasonCode?: string) => {
      if (!traceId) return;
      const event: TraceEvent = {
        event_id: `${traceId}-${eventsRef.current.length}`,
        timestamp: new Date().toISOString(),
        actor: 'current-user',
        authority: 'AUTH_0_OBSERVE',
        operation: 'trace.end',
        target: traceId,
        state_before: isTracing ? 'running' : 'idle',
        state_after: result === 'success' ? 'complete' : 'faulted',
        result,
        reason_code: reasonCode ?? null,
        runtime: 'browser',
        parent_trace: null,
      };
      eventsRef.current.push(event);
      setIsTracing(false);
    },
    [traceId, isTracing],
  );

  const logEvent = useCallback(
    (event: Partial<TraceEvent>) => {
      if (!traceId) return;
      const fullEvent: TraceEvent = {
        event_id: `${traceId}-${eventsRef.current.length}`,
        timestamp: new Date().toISOString(),
        actor: 'current-user',
        authority: 'AUTH_0_OBSERVE',
        operation: event.operation ?? 'unknown',
        target: event.target ?? traceId,
        state_before: event.state_before ?? 'idle',
        state_after: event.state_after ?? 'idle',
        result: event.result ?? 'unknown',
        reason_code: event.reason_code ?? null,
        runtime: event.runtime ?? 'browser',
        parent_trace: event.parent_trace ?? null,
      };
      eventsRef.current.push(fullEvent);
    },
    [traceId],
  );

  return {
    traceId,
    startTrace,
    endTrace,
    logEvent,
    isTracing,
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 5: useCommand
// Executes commands with governance and loading state.
// ═══════════════════════════════════════════════════════════════

/**
 * React hook for executing commands with governance.
 *
 * @param dispatchFn - Optional custom dispatch function
 * @returns Command execution utilities
 */
export function useCommand(
  dispatchFn?: (command: CommandDescriptor) => Promise<CommandResult>,
): UseCommandReturn {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResult, setLastResult] = useState<CommandResult | null>(null);

  const execute = useCallback(
    async (command: CommandDescriptor): Promise<CommandResult> => {
      setIsExecuting(true);
      try {
        let result: CommandResult;
        if (dispatchFn) {
          result = await dispatchFn(command);
        } else {
          // Default mock execution
          await new Promise((resolve) => setTimeout(resolve, 200));
          result = {
            commandId: command.id,
            result: 'accepted',
            message: `Command "${command.label}" executed successfully`,
            stateAfter: 'complete',
            traceId: `trace-${Date.now()}`,
          };
        }
        setLastResult(result);
        return result;
      } catch (error) {
        const failure: CommandResult = {
          commandId: command.id,
          result: 'failed',
          message: error instanceof Error ? error.message : 'Unknown error',
          reasonCode: 'EXECUTION_ERROR',
        };
        setLastResult(failure);
        return failure;
      } finally {
        setIsExecuting(false);
      }
    },
    [dispatchFn],
  );

  const clear = useCallback(() => {
    setLastResult(null);
  }, []);

  return {
    execute,
    isExecuting,
    lastResult,
    hasError: lastResult?.result === 'failed' || lastResult?.result === 'blocked',
    clear,
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 6: useValidation
// Manages validation state and async validation.
// ═══════════════════════════════════════════════════════════════

/**
 * React hook for managing validation state.
 *
 * @param validateFn - Optional custom validation function
 * @returns Validation management utilities
 */
export function useValidation<T = unknown>(
  validateFn?: (value: T) => Promise<ValidationResult> | ValidationResult,
): UseValidationReturn<T> {
  const [validation, setValidation] = useState<ValidationResult>({
    status: 'unchecked',
  });
  const [isValidating, setIsValidating] = useState(false);

  const validate = useCallback(
    async (value: T): Promise<ValidationResult> => {
      setIsValidating(true);
      try {
        let result: ValidationResult;
        if (validateFn) {
          result = await Promise.resolve(validateFn(value));
        } else {
          // Default pass-through
          result = {
            status: 'valid',
            message: 'Validation passed',
          };
        }
        setValidation(result);
        return result;
      } catch (error) {
        const failure: ValidationResult = {
          status: 'faulted',
          reasonCode: 'VALIDATION_ERROR',
          message: error instanceof Error ? error.message : 'Validation failed',
        };
        setValidation(failure);
        return failure;
      } finally {
        setIsValidating(false);
      }
    },
    [validateFn],
  );

  const reset = useCallback(() => {
    setValidation({ status: 'unchecked' });
  }, []);

  const errors: string[] = [];
  if (validation.message && validation.status !== 'valid') {
    errors.push(validation.message);
  }

  return {
    validation,
    validate,
    isValidating,
    isValid: validation.status === 'valid',
    errors,
    reset,
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 7: useTelemetry
// Tracks operational events and errors.
// ═══════════════════════════════════════════════════════════════

/**
 * React hook for operational telemetry tracking.
 *
 * @param enabled - Whether telemetry is initially enabled
 * @returns Telemetry tracking utilities
 */
export function useTelemetry(enabled: boolean = true): UseTelemetryReturn {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const queueRef = useRef<TelemetryEvent[]>([]);

  const track = useCallback(
    (event: Omit<TelemetryEvent, 'timestamp'>) => {
      if (!isEnabled) return;
      const fullEvent: TelemetryEvent = {
        ...event,
        timestamp: new Date().toISOString(),
      };
      queueRef.current.push(fullEvent);
      // In production, send to telemetry endpoint
      if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).__tf_telemetry__) {
        // eslint-disable-next-line no-console
        console.debug('[Telemetry]', fullEvent);
      }
    },
    [isEnabled],
  );

  const trackView = useCallback(
    (viewName: string, dimensions?: Record<string, string>) => {
      track({
        category: 'interaction',
        action: 'view',
        label: viewName,
        dimensions,
      });
    },
    [track],
  );

  const trackError = useCallback(
    (error: Error, context?: Record<string, string>) => {
      track({
        category: 'error',
        action: 'exception',
        label: error.message,
        value: 1,
        dimensions: {
          stack: error.stack ?? 'unknown',
          ...context,
        },
      });
    },
    [track],
  );

  return {
    track,
    trackView,
    trackError,
    enabled: isEnabled,
    setEnabled: setIsEnabled,
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 8: useModal
// Manages modal open/close state with content props.
// ═══════════════════════════════════════════════════════════════

/**
 * React hook for managing modal state.
 *
 * @returns Modal management utilities
 */
export function useModal(): UseModalReturn {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState<Record<string, unknown>>({});

  const show = useCallback((newProps?: Record<string, unknown>) => {
    if (newProps) {
      setProps(newProps);
    }
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    setProps({});
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return {
    open,
    show,
    hide,
    toggle,
    props,
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 9: useToast
// Manages a queue of toast notifications.
// ═══════════════════════════════════════════════════════════════

/**
 * React hook for managing toast notifications.
 *
 * @param position - Default toast position
 * @returns Toast management utilities
 */
export function useToast(position: ToastPosition = 'bottom-right'): UseToastReturn {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const add = useCallback(
    (toast: Omit<ToastItem, 'id' | 'createdAt'>): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const item: ToastItem = {
        ...toast,
        id,
        createdAt: new Date().toISOString(),
      };
      setToasts((prev) => [...prev, item]);

      if (toast.duration > 0) {
        const timer = setTimeout(() => remove(id), toast.duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [remove],
  );

  const clear = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return {
    toasts,
    add,
    remove,
    clear,
    position,
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 10: useDrawer
// Manages drawer open/close state with position support.
// ═══════════════════════════════════════════════════════════════

/**
 * React hook for managing drawer state.
 *
 * @param defaultPosition - Default drawer position
 * @returns Drawer management utilities
 */
export function useDrawer(defaultPosition: DrawerPosition = 'right'): UseDrawerReturn {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>(defaultPosition);
  const [isAnimating, setIsAnimating] = useState(false);

  const show = useCallback(
    (pos?: DrawerPosition) => {
      if (pos) {
        setPosition(pos);
      }
      setIsAnimating(true);
      setOpen(true);
      requestAnimationFrame(() => {
        setTimeout(() => setIsAnimating(false), 220);
      });
    },
    [],
  );

  const hide = useCallback(() => {
    setIsAnimating(true);
    setOpen(false);
    requestAnimationFrame(() => {
      setTimeout(() => setIsAnimating(false), 220);
    });
  }, []);

  const toggle = useCallback(() => {
    if (open) {
      hide();
    } else {
      show();
    }
  }, [open, hide, show]);

  return {
    open,
    position,
    show,
    hide,
    toggle,
    isAnimating,
  };
}

// ═══════════════════════════════════════════════════════════════
// Hook 11: useDebounce
// Debounces function calls for action buttons and search inputs.
// ═══════════════════════════════════════════════════════════════
export { useDebounce } from './useDebounce';

// ═══════════════════════════════════════════════════════════════
// Hook 12: useErrorBoundary
// Programmatic error boundary triggering for functional components.
// ═══════════════════════════════════════════════════════════════
export { useErrorBoundary } from './useErrorBoundary';

export { useMobile } from './useMobile';

