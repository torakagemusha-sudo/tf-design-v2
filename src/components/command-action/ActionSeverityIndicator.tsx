import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Severity levels for action indication.
 */
export type ActionSeverity = 'info' | 'warning' | 'error' | 'critical';

/**
 * Props for the ActionSeverityIndicator component.
 * Colored indicator for action severity.
 */
export interface ActionSeverityIndicatorProps extends TorafirmaComponentBaseProps {
  /** Severity level to display */
  severity: ActionSeverity;
  /** Optional message to display alongside the indicator */
  message?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ActionSeverityIndicator — colored indicator for action severity.
 *
 * Renders a colored dot or bar indicating the severity level
 * of an action or its potential impact. Supports four levels
 * from informational to critical with distinct color coding.
 *
 * @example
 * ```tsx
 * <ActionSeverityIndicator severity="critical" message="Irreversible data loss possible" size="lg" />
 * <ActionSeverityIndicator severity="warning" />
 * ```
 */
const ActionSeverityIndicator: React.FC<ActionSeverityIndicatorProps> = ({
  severity,
  message,
  size = 'md',
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const sizeClass = `tf-action-severity-indicator--${size}`;

  return (
    <span
      className={`tf-action-severity-indicator ${sizeClass} tf-action-severity-indicator--${severity} ${className}`}
      data-severity={severity}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-action-severity-indicator__marker" aria-hidden="true" />
      <span className="tf-action-severity-indicator__label">{severity.toUpperCase()}</span>
      {message && <span className="tf-action-severity-indicator__message">{message}</span>}
    </span>
  );
};

export default ActionSeverityIndicator;
