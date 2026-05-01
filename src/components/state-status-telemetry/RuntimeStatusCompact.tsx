/**
 * ============================================================
 * RuntimeStatusCompact — Torafirma Design System
 * ============================================================
 *
 * Minimal runtime connection indicator. Displays only a colored
 * dot and optional single-letter status code. For use in dense
 * toolbars, headers, and compact status bars.
 *
 * From 03.2 State, Status & Telemetry — Section 3.9 Runtime Components
 * ============================================================
 */

import React from 'react';
import type { RuntimeConnectionState } from './RuntimeStatus';

/**
 * Props for the RuntimeStatusCompact component.
 */
export interface RuntimeStatusCompactProps {
  /** Current runtime connection state. */
  state: RuntimeConnectionState;
  /** Runtime target name (shown in tooltip). */
  target?: string;
  /** Size variant. */
  size?: 'xs' | 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const compactVariantMap: Record<RuntimeConnectionState, string> = {
  connected: 'run',
  connecting: 'stream',
  disconnected: 'neutral',
  reconnecting: 'warning',
  degraded: 'instability',
  error: 'danger',
};

/**
 * RuntimeStatusCompact renders a minimal runtime state indicator.
 *
 * @example
 * ```tsx
 * <RuntimeStatusCompact state="connected" target="prod-01" />
 * <RuntimeStatusCompact state="error" size="xs" />
 * ```
 */
export const RuntimeStatusCompact: React.FC<RuntimeStatusCompactProps> = ({
  state,
  target,
  size = 'sm',
  className = '',
  testId,
}) => {
  const variant = compactVariantMap[state];

  return (
    <span
      className={`tf-runtime-status-compact tf-runtime-status-compact--${variant} tf-runtime-status-compact--${size} ${className}`}
      data-testid={testId}
      data-runtime-state={state}
      role="status"
      aria-label={`Runtime ${state}${target ? `: ${target}` : ''}`}
      title={target ? `${target} — ${state}` : state}
    >
      <span className={`tf-runtime-status-compact__dot tf-runtime-status-compact__dot--${variant}`} aria-hidden="true" />
    </span>
  );
};

RuntimeStatusCompact.displayName = 'RuntimeStatusCompact';

export default RuntimeStatusCompact;
