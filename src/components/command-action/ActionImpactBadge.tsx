import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Impact level for an action.
 */
export type ActionImpactLevel = 'none' | 'low' | 'medium' | 'high' | 'critical';

/**
 * Props for the ActionImpactBadge component.
 * Badge showing action impact level.
 */
export interface ActionImpactBadgeProps extends TorafirmaComponentBaseProps {
  /** Impact level to display */
  impact: ActionImpactLevel;
  /** Optional label override */
  label?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Human-readable labels for impact levels.
 */
const IMPACT_LABELS: Record<ActionImpactLevel, string> = {
  none: 'No Impact',
  low: 'Low Impact',
  medium: 'Medium Impact',
  high: 'High Impact',
  critical: 'Critical Impact',
};

/**
 * ActionImpactBadge — badge showing action impact level.
 *
 * Renders a colored badge indicating the severity of an action's
 * potential impact. Uses a five-level scale from none to critical,
 * with distinct color coding at each level.
 *
 * @example
 * ```tsx
 * <ActionImpactBadge impact="high" />
 * <ActionImpactBadge impact="critical" size="lg" />
 * ```
 */
const ActionImpactBadge: React.FC<ActionImpactBadgeProps> = ({
  impact,
  label,
  size = 'md',
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const sizeClass = `tf-action-impact-badge--${size}`;

  return (
    <span
      className={`tf-action-impact-badge ${sizeClass} tf-action-impact-badge--${impact} ${className}`}
      data-impact={impact}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-action-impact-badge__dot" aria-hidden="true" />
      <span className="tf-action-impact-badge__label">{label || IMPACT_LABELS[impact]}</span>
    </span>
  );
};

export default ActionImpactBadge;
