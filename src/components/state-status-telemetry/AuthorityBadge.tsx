/**
 * ============================================================
 * AuthorityBadge — Torafirma Design System
 * ============================================================
 *
 * Displays the current authority level with label and semantic color.
 * Shows the numeric AUTH level and human-readable name.
 *
 * From 03.2 State, Status & Telemetry — Section 8 Authority Semantics
 * ============================================================
 */

import React from 'react';
import type { AuthorityLevel, ComponentDensity } from '../../../torafirma-design-system/src/types';

/**
 * Props for the AuthorityBadge component.
 */
export interface AuthorityBadgeProps {
  /** Current authority level to display. */
  authority: AuthorityLevel;
  /** Whether this represents the required (not current) authority. */
  isRequired?: boolean;
  /** Optional override label. */
  label?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Whether to show the numeric level. */
  showLevel?: boolean;
  /** Whether to show a lock icon for elevated levels. */
  showIcon?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const authorityMeta: Record<AuthorityLevel, { short: string; full: string; level: number }> = {
  AUTH_0_OBSERVE: { short: 'OBSERVE', full: 'Observe Only', level: 0 },
  AUTH_1_DRAFT: { short: 'DRAFT', full: 'Draft', level: 1 },
  AUTH_2_STAGE: { short: 'STAGE', full: 'Stage', level: 2 },
  AUTH_3_EXECUTE: { short: 'EXECUTE', full: 'Execute', level: 3 },
  AUTH_4_COMMIT: { short: 'COMMIT', full: 'Commit', level: 4 },
  AUTH_5_OVERRIDE: { short: 'OVERRIDE', full: 'Override', level: 5 },
  AUTH_6_ROOT: { short: 'ROOT', full: 'Root / Sovereign', level: 6 },
};

/**
 * AuthorityBadge renders the current or required authority level.
 *
 * @example
 * ```tsx
 * <AuthorityBadge authority="AUTH_4_COMMIT" />
 * <AuthorityBadge authority="AUTH_5_OVERRIDE" isRequired showLevel />
 * ```
 */
export const AuthorityBadge: React.FC<AuthorityBadgeProps> = ({
  authority,
  isRequired = false,
  label,
  density = 'standard',
  showLevel = true,
  showIcon = true,
  className = '',
  testId,
}) => {
  const meta = authorityMeta[authority];
  const densityClass = `tf-density-${density}`;
  const modeClass = isRequired ? 'tf-authority-badge--required' : 'tf-authority-badge--current';

  return (
    <span
      className={`tf-authority-badge tf-authority-badge--level-${meta.level} ${modeClass} ${densityClass} ${className}`}
      data-testid={testId}
      data-authority={authority}
      data-authority-level={meta.level}
      role="status"
      aria-label={`${isRequired ? 'Requires' : 'Authority'}: ${meta.full}`}
      title={`${meta.full}${isRequired ? ' (required)' : ''}`}
    >
      {showIcon && meta.level >= 4 && (
        <span className="tf-authority-badge__icon" aria-hidden="true">&#x1F512;</span>
      )}
      {showLevel && (
        <span className="tf-authority-badge__level">AUTH {meta.level}</span>
      )}
      <span className="tf-authority-badge__name">{label || meta.short}</span>
    </span>
  );
};

AuthorityBadge.displayName = 'AuthorityBadge';

export default AuthorityBadge;
