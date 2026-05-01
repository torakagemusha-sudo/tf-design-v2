/**
 * ============================================================
 * ValidationBadge — Torafirma Design System
 * ============================================================
 *
 * Validation result badge. Compact display of a single
 * validation outcome for use in tables and lists.
 *
 * From 03.2 State, Status & Telemetry — Section 9 Validation Semantics
 * ============================================================
 */

import React from 'react';
import type { ValidationResult } from '../../../torafirma-design-system/src/types';

/**
 * Props for the ValidationBadge component.
 */
export interface ValidationBadgeProps {
  /** Validation result to display. */
  validation: ValidationResult;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const badgeMeta: Record<string, { label: string; variant: string }> = {
  unchecked: { label: '—', variant: 'neutral' },
  validating: { label: '...', variant: 'stream' },
  valid: { label: 'OK', variant: 'run' },
  warning: { label: '!', variant: 'warning' },
  blocked: { label: 'X', variant: 'danger' },
  faulted: { label: 'ERR', variant: 'danger' },
};

/**
 * ValidationBadge renders a compact validation result badge.
 *
 * @example
 * ```tsx
 * <ValidationBadge validation={{ status: 'valid' }} />
 * <ValidationBadge validation={{ status: 'blocked' }} size="sm" />
 * ```
 */
export const ValidationBadge: React.FC<ValidationBadgeProps> = ({
  validation,
  size = 'sm',
  className = '',
  testId,
}) => {
  const meta = badgeMeta[validation.status];

  return (
    <span
      className={`tf-validation-badge tf-validation-badge--${meta.variant} tf-validation-badge--${validation.status} tf-validation-badge--${size} ${className}`}
      data-testid={testId}
      data-validation-status={validation.status}
      role="status"
      aria-label={`Validation: ${validation.status}`}
      title={validation.message || validation.status}
    >
      {meta.label}
    </span>
  );
};

ValidationBadge.displayName = 'ValidationBadge';

export default ValidationBadge;
