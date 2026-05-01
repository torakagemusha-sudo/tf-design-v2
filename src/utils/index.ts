/**
 * ============================================================
 * Torafirma Design System v2 — Utilities
 * ============================================================
 *
 * Core utility functions for trace IDs, timestamps, authority
 * labels, state colors, class names, debounce, throttle,
 * deep merge, and validation helpers.
 *
 * These utilities support the hooks and components by providing
 * shared, tested functions for common operations.
 * ============================================================
 */

import type {
  AuthorityLevel,
  TorafirmaComponentState,
  ClassNamesOptions,
  DebounceOptions,
  ThrottleOptions,
  DeepMergeOptions,
} from '../types';

// ═══════════════════════════════════════════════════════════════
// Utility 1: generateTraceId
// Generates a unique trace identifier for audit logging.
// ═══════════════════════════════════════════════════════════════

/**
 * Generate a unique trace identifier.
 *
 * Format: `<timestamp-base36>-<random>-<counter>`
 *
 * @param prefix - Optional prefix for the trace ID
 * @returns A unique trace identifier string
 */
export function generateTraceId(prefix?: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  const counter = (generateTraceId._counter = (generateTraceId._counter ?? 0) + 1);
  const base = `${timestamp}-${random}-${counter.toString(36)}`;
  return prefix ? `${prefix}:${base}` : base;
}

// Internal counter for trace ID generation
generateTraceId._counter = 0;

// ═══════════════════════════════════════════════════════════════
// Utility 2: formatTimestamp
// Formats timestamps in ISO 8601 with optional human-readable form.
// ═══════════════════════════════════════════════════════════════

/**
 * Format a timestamp in ISO 8601 or human-readable form.
 *
 * @param date - Date to format (Date, number, or string)
 * @param options - Formatting options
 * @returns Formatted timestamp string
 */
export function formatTimestamp(
  date: Date | number | string = new Date(),
  options: {
    /** Use human-readable format instead of ISO */
    humanReadable?: boolean;
    /** Include milliseconds */
    includeMs?: boolean;
    /** Use UTC timezone */
    utc?: boolean;
  } = {},
): string {
  const d = date instanceof Date ? date : new Date(date);
  const { humanReadable = false, includeMs = false, utc = false } = options;

  if (humanReadable) {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = utc ? d.getUTCFullYear() : d.getFullYear();
    const month = pad(utc ? d.getUTCMonth() + 1 : d.getMonth() + 1);
    const day = pad(utc ? d.getUTCDate() : d.getDate());
    const hours = pad(utc ? d.getUTCHours() : d.getHours());
    const minutes = pad(utc ? d.getUTCMinutes() : d.getMinutes());
    const seconds = pad(utc ? d.getUTCSeconds() : d.getSeconds());
    const ms = includeMs ? `.${d.getMilliseconds().toString().padStart(3, '0')}` : '';
    const tz = utc ? 'Z' : '';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${ms}${tz}`;
  }

  if (includeMs) {
    return d.toISOString();
  }

  return d.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

// ═══════════════════════════════════════════════════════════════
// Utility 3: getAuthorityLabel
// Returns a human-readable label for an authority level.
// ═══════════════════════════════════════════════════════════════

const AUTHORITY_LABELS: Record<AuthorityLevel, string> = {
  'AUTH_0_OBSERVE': 'Observe',
  'AUTH_1_DRAFT': 'Draft',
  'AUTH_2_STAGE': 'Stage',
  'AUTH_3_EXECUTE': 'Execute',
  'AUTH_4_COMMIT': 'Commit',
  'AUTH_5_OVERRIDE': 'Override',
  'AUTH_6_ROOT': 'Root',
};

const AUTHORITY_DESCRIPTIONS: Record<AuthorityLevel, string> = {
  'AUTH_0_OBSERVE': 'Read-only access to all systems',
  'AUTH_1_DRAFT': 'Create and edit drafts',
  'AUTH_2_STAGE': 'Stage changes for review',
  'AUTH_3_EXECUTE': 'Execute operational commands',
  'AUTH_4_COMMIT': 'Commit permanent changes',
  'AUTH_5_OVERRIDE': 'Override safety controls',
  'AUTH_6_ROOT': 'Full system access',
};

/**
 * Get a human-readable label for an authority level.
 *
 * @param authority - Authority level
 * @returns Human-readable label
 */
export function getAuthorityLabel(authority: AuthorityLevel): string {
  return AUTHORITY_LABELS[authority] ?? authority;
}

/**
 * Get a detailed description for an authority level.
 *
 * @param authority - Authority level
 * @returns Description of the authority
 */
export function getAuthorityDescription(authority: AuthorityLevel): string {
  return AUTHORITY_DESCRIPTIONS[authority] ?? 'Unknown authority level';
}

/**
 * Get the numeric rank of an authority level.
 *
 * @param authority - Authority level
 * @returns Numeric rank (0-6)
 */
export function getAuthorityRank(authority: AuthorityLevel): number {
  const match = authority.match(/\d/);
  return match ? parseInt(match[0], 10) : 0;
}

// ═══════════════════════════════════════════════════════════════
// Utility 4: getStateColor
// Returns the semantic color for a component state.
// ═══════════════════════════════════════════════════════════════

const STATE_COLORS: Record<TorafirmaComponentState, string> = {
  idle: '#5F6E7A',
  ready: '#36D47B',
  dirty: '#F2B84B',
  validating: '#4BA3F2',
  valid: '#36D47B',
  warning: '#F2B84B',
  blocked: '#F24B4B',
  staged: '#F2B84B',
  running: '#35D0E3',
  complete: '#36D47B',
  degraded: '#F07A2A',
  faulted: '#F24B4B',
  locked: '#D6A84F',
  simulated: '#4BA3F2',
  committed: '#36D47B',
  deployed: '#36D47B',
  disconnected: '#5F6E7A',
};

const STATE_BG_COLORS: Record<TorafirmaComponentState, string> = {
  idle: '#0E1318',
  ready: '#0B1A12',
  dirty: '#1D1608',
  validating: '#07111F',
  valid: '#0B1A12',
  warning: '#1D1608',
  blocked: '#1C0B0B',
  staged: '#1D1608',
  running: '#041417',
  complete: '#0B1A12',
  degraded: '#1B0D05',
  faulted: '#1C0B0B',
  locked: '#1A1407',
  simulated: '#07111F',
  committed: '#0B1A12',
  deployed: '#0B1A12',
  disconnected: '#0E1318',
};

/**
 * Get the semantic color for a component state.
 *
 * @param state - Component state
 * @returns Hex color string
 */
export function getStateColor(state: TorafirmaComponentState): string {
  return STATE_COLORS[state] ?? '#5F6E7A';
}

/**
 * Get the background color for a component state.
 *
 * @param state - Component state
 * @returns Hex color string
 */
export function getStateBgColor(state: TorafirmaComponentState): string {
  return STATE_BG_COLORS[state] ?? '#0E1318';
}

/**
 * Get both foreground and background colors for a state.
 *
 * @param state - Component state
 * @returns Object with color and backgroundColor
 */
export function getStateColorPair(state: TorafirmaComponentState): {
  color: string;
  backgroundColor: string;
} {
  return {
    color: getStateColor(state),
    backgroundColor: getStateBgColor(state),
  };
}

// ═══════════════════════════════════════════════════════════════
// Utility 5: classNames
// Conditionally joins class names together.
// ═══════════════════════════════════════════════════════════════

/**
 * Conditionally join class names together.
 *
 * @param options - Class name options
 * @returns Joined class name string
 */
export function classNames(options: ClassNamesOptions): string;
/**
 * Conditionally join class names together.
 *
 * @param base - Base class name string or options object
 * @param variants - Conditional class names
 * @returns Joined class name string
 */
export function classNames(
  base: string | ClassNamesOptions,
  variants?: Record<string, boolean | undefined>,
): string;
export function classNames(
  base: string | ClassNamesOptions,
  variants?: Record<string, boolean | undefined>,
): string {
  if (typeof base === 'object') {
    const parts: string[] = [];
    if (base.base) {
      parts.push(base.base);
    }
    if (base.variants) {
      for (const [key, value] of Object.entries(base.variants)) {
        if (value) {
          parts.push(key);
        }
      }
    }
    if (base.responsive) {
      for (const [key, value] of Object.entries(base.responsive)) {
        if (value) {
          parts.push(value);
        }
      }
    }
    return parts.filter(Boolean).join(' ');
  }

  const parts: string[] = [base];
  if (variants) {
    for (const [key, value] of Object.entries(variants)) {
      if (value) {
        parts.push(key);
      }
    }
  }
  return parts.filter(Boolean).join(' ');
}

// ═══════════════════════════════════════════════════════════════
// Utility 6: debounce
// Creates a debounced version of a function.
// ═══════════════════════════════════════════════════════════════

/**
 * Create a debounced version of a function.
 *
 * @param fn - Function to debounce
 * @param options - Debounce options or delay in milliseconds
 * @returns Debounced function with cancel method
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options: DebounceOptions | number,
): T & { cancel: () => void; flush: () => void } {
  const opts: DebounceOptions =
    typeof options === 'number' ? { delay: options } : options;
  const { delay, leading = false, trailing = true } = opts;

  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let leadingCalled = false;

  const debounced = ((...args: Parameters<T>) => {
    lastArgs = args;

    if (timer) {
      clearTimeout(timer);
    }

    if (leading && !leadingCalled) {
      leadingCalled = true;
      fn(...args);
    }

    timer = setTimeout(() => {
      if (trailing && lastArgs && (!leading || leadingCalled)) {
        fn(...lastArgs);
      }
      leadingCalled = false;
      timer = null;
      lastArgs = null;
    }, delay);
  }) as T & { cancel: () => void; flush: () => void };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    lastArgs = null;
    leadingCalled = false;
  };

  debounced.flush = () => {
    if (timer && lastArgs) {
      clearTimeout(timer);
      fn(...lastArgs);
      timer = null;
      lastArgs = null;
      leadingCalled = false;
    }
  };

  return debounced;
}

// ═══════════════════════════════════════════════════════════════
// Utility 7: throttle
// Creates a throttled version of a function.
// ═══════════════════════════════════════════════════════════════

/**
 * Create a throttled version of a function.
 *
 * @param fn - Function to throttle
 * @param options - Throttle options or interval in milliseconds
 * @returns Throttled function with cancel method
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options: ThrottleOptions | number,
): T & { cancel: () => void; flush: () => void } {
  const opts: ThrottleOptions =
    typeof options === 'number' ? { interval: options } : options;
  const { interval, leading = true, trailing = true } = opts;

  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCallTime = 0;

  const throttled = ((...args: Parameters<T>) => {
    const now = Date.now();
    lastArgs = args;

    if (!lastCallTime) {
      lastCallTime = now;
    }

    const remaining = interval - (now - lastCallTime);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastCallTime = now;
      if (leading) {
        fn(...args);
      }
      return;
    }

    if (!timer && trailing) {
      timer = setTimeout(() => {
        lastCallTime = leading ? Date.now() : 0;
        timer = null;
        if (lastArgs) {
          fn(...lastArgs);
        }
        lastArgs = null;
      }, remaining);
    }
  }) as T & { cancel: () => void; flush: () => void };

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    lastArgs = null;
    lastCallTime = 0;
  };

  throttled.flush = () => {
    if (timer && lastArgs) {
      clearTimeout(timer);
      fn(...lastArgs);
    }
    timer = null;
    lastArgs = null;
    lastCallTime = 0;
  };

  return throttled;
}

// ═══════════════════════════════════════════════════════════════
// Utility 8: deepMerge
// Deeply merges two or more objects.
// ═══════════════════════════════════════════════════════════════

/**
 * Deeply merge two or more objects.
 *
 * @param target - Base object
 * @param sources - Objects to merge into target
 * @param options - Merge options
 * @returns Merged object
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Record<string, unknown>>
): T;
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Record<string, unknown>,
  options?: DeepMergeOptions,
): T;
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...args: unknown[]
): T {
  let options: DeepMergeOptions = { mergeArrays: false, maxDepth: 10 };

  // Extract options from last argument if present
  const lastArg = args[args.length - 1];
  const hasOptionsArg =
    lastArg && typeof lastArg === 'object' && !Array.isArray(lastArg) && 'mergeArrays' in (lastArg as Record<string, unknown>);

  if (hasOptionsArg && args.length > 1) {
    options = { ...options, ...(lastArg as DeepMergeOptions) };
    args.pop();
  }

  const sources = args as Array<Record<string, unknown>>;

  function mergeDeep(
    tgt: Record<string, unknown>,
    src: Record<string, unknown>,
    depth: number,
  ): Record<string, unknown> {
    if (depth >= (options.maxDepth ?? 10)) {
      return src;
    }

    const result = { ...tgt };

    for (const key of Object.keys(src)) {
      const srcValue = src[key];
      const tgtValue = result[key];

      if (
        srcValue &&
        typeof srcValue === 'object' &&
        !Array.isArray(srcValue)
      ) {
        if (tgtValue && typeof tgtValue === 'object' && !Array.isArray(tgtValue)) {
          result[key] = mergeDeep(
            tgtValue as Record<string, unknown>,
            srcValue as Record<string, unknown>,
            depth + 1,
          );
        } else {
          result[key] = mergeDeep({}, srcValue as Record<string, unknown>, depth + 1);
        }
      } else if (Array.isArray(srcValue)) {
        if (options.mergeArrays && Array.isArray(tgtValue)) {
          result[key] = [...tgtValue, ...srcValue];
        } else {
          result[key] = [...srcValue];
        }
      } else {
        result[key] = srcValue;
      }
    }

    return result;
  }

  let result: Record<string, unknown> = { ...target };
  for (const source of sources) {
    if (source && typeof source === 'object') {
      result = mergeDeep(result, source, 0);
    }
  }

  return result as T;
}

// ═══════════════════════════════════════════════════════════════
// Utility 9: isValidAuthority
// Validates an authority level string.
// ═══════════════════════════════════════════════════════════════

const VALID_AUTHORITIES: AuthorityLevel[] = [
  'AUTH_0_OBSERVE',
  'AUTH_1_DRAFT',
  'AUTH_2_STAGE',
  'AUTH_3_EXECUTE',
  'AUTH_4_COMMIT',
  'AUTH_5_OVERRIDE',
  'AUTH_6_ROOT',
];

/**
 * Check if a string is a valid authority level.
 *
 * @param value - Value to check
 * @returns True if the value is a valid authority level
 */
export function isValidAuthority(value: unknown): value is AuthorityLevel {
  return typeof value === 'string' && VALID_AUTHORITIES.includes(value as AuthorityLevel);
}

// ═══════════════════════════════════════════════════════════════
// Utility 10: isValidState
// Validates a component state string.
// ═══════════════════════════════════════════════════════════════

const VALID_STATES: TorafirmaComponentState[] = [
  'idle',
  'ready',
  'dirty',
  'validating',
  'valid',
  'warning',
  'blocked',
  'staged',
  'running',
  'complete',
  'degraded',
  'faulted',
  'locked',
  'simulated',
  'committed',
  'deployed',
  'disconnected',
];

/**
 * Check if a string is a valid component state.
 *
 * @param value - Value to check
 * @returns True if the value is a valid component state
 */
export function isValidState(value: unknown): value is TorafirmaComponentState {
  return typeof value === 'string' && VALID_STATES.includes(value as TorafirmaComponentState);
}

/**
 * Get a human-readable label for a component state.
 *
 * @param state - Component state
 * @returns Human-readable label
 */
export function getStateLabel(state: TorafirmaComponentState): string {
  const labels: Record<TorafirmaComponentState, string> = {
    idle: 'Idle',
    ready: 'Ready',
    dirty: 'Dirty',
    validating: 'Validating',
    valid: 'Valid',
    warning: 'Warning',
    blocked: 'Blocked',
    staged: 'Staged',
    running: 'Running',
    complete: 'Complete',
    degraded: 'Degraded',
    faulted: 'Faulted',
    locked: 'Locked',
    simulated: 'Simulated',
    committed: 'Committed',
    deployed: 'Deployed',
    disconnected: 'Disconnected',
  };
  return labels[state] ?? state;
}

/**
 * Check if a state is considered active (not terminal/error).
 *
 * @param state - Component state
 * @returns True if the state is active
 */
export function isActiveState(state: TorafirmaComponentState): boolean {
  const activeStates: TorafirmaComponentState[] = [
    'ready',
    'dirty',
    'validating',
    'valid',
    'warning',
    'staged',
    'running',
    'simulated',
  ];
  return activeStates.includes(state);
}

/**
 * Check if a state is considered terminal.
 *
 * @param state - Component state
 * @returns True if the state is terminal
 */
export function isTerminalState(state: TorafirmaComponentState): boolean {
  const terminalStates: TorafirmaComponentState[] = ['complete', 'committed', 'deployed', 'disconnected'];
  return terminalStates.includes(state);
}

/**
 * Check if a state represents an error condition.
 *
 * @param state - Component state
 * @returns True if the state is an error
 */
export function isErrorState(state: TorafirmaComponentState): boolean {
  const errorStates: TorafirmaComponentState[] = ['blocked', 'faulted', 'degraded'];
  return errorStates.includes(state);
}
