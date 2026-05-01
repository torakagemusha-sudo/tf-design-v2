/**
 * ============================================================
 * ValidationSummary — Torafirma Design System
 * ============================================================
 *
 * Summary of all validations on an object. Aggregates multiple
 * validation results and shows counts by severity with the
 * highest severity highlighted.
 *
 * From 03.2 State, Status & Telemetry — Section 9 Validation Semantics
 * ============================================================
 */

import React from 'react';
import type { ValidationResult, ComponentDensity } from '../../../torafirma-design-system/src/types';

/**
 * Props for the ValidationSummary component.
 */
export interface ValidationSummaryProps {
  /** Array of individual validation results. */
  validations: ValidationResult[];
  /** Object identifier being validated. */
  targetId?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

type SeverityWeight = Record<string, number>;

const severityWeights: SeverityWeight = {
  faulted: 5,
  blocked: 4,
  warning: 3,
  validating: 2,
  unchecked: 1,
  valid: 0,
};

const severityLabels: Record<string, string> = {
  faulted: 'Faulted',
  blocked: 'Blocked',
  warning: 'Warning',
  validating: 'Validating',
  unchecked: 'Unchecked',
  valid: 'Valid',
};

/**
 * ValidationSummary renders an aggregate of all validation results.
 *
 * @example
 * ```tsx
 * <ValidationSummary
 *   validations={[
 *     { status: 'valid' },
 *     { status: 'warning', message: 'Edge contract' },
 *     { status: 'blocked', message: 'Missing field' },
 *   ]}
 *   targetId="workflow-42"
 * />
 * ```
 */
export const ValidationSummary: React.FC<ValidationSummaryProps> = ({
  validations,
  targetId,
  density = 'standard',
  className = '',
  testId,
}) => {
  const counts = validations.reduce<Record<string, number>>((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {});

  const highestSeverity = validations.length > 0
    ? validations.reduce((highest, v) =>
        (severityWeights[v.status] || 0) > (severityWeights[highest.status] || 0) ? v : highest
      ).status
    : 'unchecked';

  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-validation-summary tf-validation-summary--${highestSeverity} ${densityClass} ${className}`}
      data-testid={testId}
      data-highest-severity={highestSeverity}
      role="region"
      aria-label={`Validation summary${targetId ? ` for ${targetId}` : ''}`}
    >
      {targetId && <span className="tf-validation-summary__target">{targetId}</span>}
      <div className="tf-validation-summary__counts">
        {Object.entries(severityLabels).map(([status, label]) => (
          <span
            key={status}
            className={`tf-validation-summary__count tf-validation-summary__count--${status}`}
          >
            {label}: {counts[status] || 0}
          </span>
        ))}
      </div>
      <span className={`tf-validation-summary__highest tf-validation-summary__highest--${highestSeverity}`}>
        {severityLabels[highestSeverity]}
      </span>
    </div>
  );
};

ValidationSummary.displayName = 'ValidationSummary';

export default ValidationSummary;
