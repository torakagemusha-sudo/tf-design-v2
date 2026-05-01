/**
 * ============================================================
 * ValidationStatus — Torafirma Design System
 * ============================================================
 *
 * Overall validation state display. Shows the cumulative result
 * of all validations on an object with status, message, and
 * affected object count.
 *
 * From 03.2 State, Status & Telemetry — Section 9 Validation Semantics
 * ============================================================
 */

import React from 'react';
import type { ValidationResult, ComponentDensity } from '../../../torafirma-design-system/src/types';

/**
 * Props for the ValidationStatus component.
 */
export interface ValidationStatusProps {
  /** Validation result to display. */
  validation: ValidationResult;
  /** Number of validation findings. */
  findingCount?: number;
  /** Layout density. */
  density?: ComponentDensity;
  /** Whether to show the required action. */
  showRequiredAction?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const validationMeta: Record<string, { label: string; variant: string }> = {
  unchecked: { label: 'UNCHECKED', variant: 'neutral' },
  validating: { label: 'VALIDATING', variant: 'stream' },
  valid: { label: 'VALID', variant: 'run' },
  warning: { label: 'WARNING', variant: 'warning' },
  blocked: { label: 'BLOCKED', variant: 'danger' },
  faulted: { label: 'FAULTED', variant: 'danger' },
};

/**
 * ValidationStatus renders the overall validation state.
 *
 * @example
 * ```tsx
 * <ValidationStatus validation={{ status: 'blocked', message: '3 unresolved contracts' }} findingCount={3} />
 * ```
 */
export const ValidationStatus: React.FC<ValidationStatusProps> = ({
  validation,
  findingCount,
  density = 'standard',
  showRequiredAction = true,
  className = '',
  testId,
}) => {
  const meta = validationMeta[validation.status];
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-validation-status tf-validation-status--${meta.variant} tf-validation-status--${validation.status} ${densityClass} ${className}`}
      data-testid={testId}
      data-validation-status={validation.status}
      role="status"
      aria-label={`Validation: ${meta.label}`}
    >
      <span className={`tf-validation-status__icon tf-validation-status__icon--${meta.variant}`} aria-hidden="true" />
      <span className="tf-validation-status__label">{meta.label}</span>
      {validation.message && (
        <span className="tf-validation-status__message">{validation.message}</span>
      )}
      {findingCount !== undefined && findingCount > 0 && (
        <span className="tf-validation-status__count">{findingCount} finding{findingCount !== 1 ? 's' : ''}</span>
      )}
      {showRequiredAction && validation.requiredAction && (
        <span className="tf-validation-status__action">Action: {validation.requiredAction}</span>
      )}
    </div>
  );
};

ValidationStatus.displayName = 'ValidationStatus';

export default ValidationStatus;
