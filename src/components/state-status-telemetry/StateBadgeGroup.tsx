/**
 * ============================================================
 * StateBadgeGroup — Torafirma Design System
 * ============================================================
 *
 * Displays a group of related state badges in a horizontal or
 * vertical arrangement. Useful for showing multiple concurrent
 * states on a single component or system.
 *
 * From 03.2 State, Status & Telemetry — Section 3.2 State Components
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../types';
import { StateBadge } from './StateBadge';
import type { StateBadgeProps } from './StateBadge';

/**
 * Props for the StateBadgeGroup component.
 */
export interface StateBadgeGroupProps {
  /** Array of state badge configurations to render. */
  badges: Omit<StateBadgeProps, 'density'>[];
  /** Group label displayed above or beside the badges. */
  groupLabel?: string;
  /** Layout orientation. */
  orientation?: 'horizontal' | 'vertical';
  /** Layout density passed to each badge. */
  density?: ComponentDensity;
  /** Maximum number of badges to show before overflow. */
  maxVisible?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * StateBadgeGroup renders multiple state badges as a cohesive unit.
 *
 * @example
 * ```tsx
 * <StateBadgeGroup
 *   badges={[{ state: 'ready' }, { state: 'locked' }, { state: 'dirty' }]}
 *   groupLabel="Component States"
 * />
 * ```
 */
export const StateBadgeGroup: React.FC<StateBadgeGroupProps> = ({
  badges,
  groupLabel,
  orientation = 'horizontal',
  density = 'standard',
  maxVisible,
  className = '',
  testId,
}) => {
  const visibleBadges = maxVisible ? badges.slice(0, maxVisible) : badges;
  const overflowCount = maxVisible ? badges.length - maxVisible : 0;
  const orientClass = `tf-state-badge-group--${orientation}`;

  return (
    <div
      className={`tf-state-badge-group ${orientClass} ${className}`}
      data-testid={testId}
      role="group"
      aria-label={groupLabel || 'State badges'}
    >
      {groupLabel && (
        <span className="tf-state-badge-group__label">{groupLabel}</span>
      )}
      <div className={`tf-state-badge-group__badges tf-state-badge-group__badges--${orientation}`}>
        {visibleBadges.map((badge, index) => (
          <StateBadge key={index} {...badge} density={density} />
        ))}
        {overflowCount > 0 && (
          <span className="tf-state-badge-group__overflow" aria-label={`${overflowCount} more states`}>
            +{overflowCount}
          </span>
        )}
      </div>
    </div>
  );
};

StateBadgeGroup.displayName = 'StateBadgeGroup';

export default StateBadgeGroup;
