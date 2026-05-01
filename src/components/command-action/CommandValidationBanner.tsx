import React from 'react';
import { ValidationResult, TorafirmaComponentBaseProps } from '../../types';

/**
 * A single validation result entry.
 */
export interface ValidationEntry {
  id: string;
  field?: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Props for the CommandValidationBanner component.
 * Banner showing validation results.
 */
export interface CommandValidationBannerProps extends TorafirmaComponentBaseProps {
  /** Validation results to display */
  results: ValidationEntry[];
  /** Callback fired when the banner is dismissed */
  onDismiss: () => void;
}

/**
 * CommandValidationBanner — banner showing validation results.
 *
 * Displays a prominent banner listing validation errors,
 * warnings, and informational messages for a command
 * configuration. Supports dismissal and groups results
 * by severity level.
 *
 * @example
 * ```tsx
 * <CommandValidationBanner
 *   results={[
 *     { id: 'v1', field: 'target', message: 'Runtime target is required', severity: 'error' },
 *     { id: 'v2', message: 'Graph has untyped edges', severity: 'warning' },
 *   ]}
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
const CommandValidationBanner: React.FC<CommandValidationBannerProps> = ({
  results,
  onDismiss,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  if (results.length === 0) return null;

  const errors = results.filter((r) => r.severity === 'error');
  const warnings = results.filter((r) => r.severity === 'warning');
  const infos = results.filter((r) => r.severity === 'info');

  const overallSeverity = errors.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'info';

  return (
    <div
      className={`tf-command-validation-banner tf-command-validation-banner--${overallSeverity} ${className}`}
      role="alert"
      data-testid={testId}
      {...rest}
    >
      <div className="tf-command-validation-banner__header">
        <span className="tf-command-validation-banner__title">
          Validation {overallSeverity === 'error' ? 'Failed' : overallSeverity === 'warning' ? 'Warnings' : 'Info'}
        </span>
        <span className="tf-command-validation-banner__summary">
          {errors.length > 0 && `${errors.length} error${errors.length > 1 ? 's' : ''}`}
          {warnings.length > 0 && `${errors.length > 0 ? ', ' : ''}${warnings.length} warning${warnings.length > 1 ? 's' : ''}`}
        </span>
        <button
          type="button"
          className="tf-command-validation-banner__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss validation banner"
        >
          &#10005;
        </button>
      </div>
      <ul className="tf-command-validation-banner__list">
        {results.map((result) => (
          <li
            key={result.id}
            className={`tf-command-validation-banner__item tf-command-validation-banner__item--${result.severity}`}
          >
            <span className="tf-command-validation-banner__severity">{result.severity.toUpperCase()}</span>
            {result.field && (
              <span className="tf-command-validation-banner__field">{result.field}:</span>
            )}
            <span className="tf-command-validation-banner__message">{result.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommandValidationBanner;
