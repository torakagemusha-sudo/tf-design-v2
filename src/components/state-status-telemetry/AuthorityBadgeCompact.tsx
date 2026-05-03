/**
 * ============================================================
 * AuthorityBadgeCompact — Torafirma Design System
 * ============================================================
 *
 * Minimal authority indicator showing only the AUTH level number
 * and color. Used in dense layouts where space is constrained.
 *
 * From 03.2 State, Status & Telemetry — Section 8 Authority Semantics
 * ============================================================
 */

import React from 'react';
import type { AuthorityLevel } from '../../types';

/**
 * Props for the AuthorityBadgeCompact component.
 */
export interface AuthorityBadgeCompactProps {
  /** Current authority level. */
  authority: AuthorityLevel;
  /** Whether this represents the required authority. */
  isRequired?: boolean;
  /** Size variant. */
  size?: 'xs' | 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const levelFromAuthority: Record<AuthorityLevel, number> = {
  AUTH_0_OBSERVE: 0,
  AUTH_1_DRAFT: 1,
  AUTH_2_STAGE: 2,
  AUTH_3_EXECUTE: 3,
  AUTH_4_COMMIT: 4,
  AUTH_5_OVERRIDE: 5,
  AUTH_6_ROOT: 6,
};

/**
 * AuthorityBadgeCompact renders a minimal authority level indicator.
 *
 * @example
 * ```tsx
 * <AuthorityBadgeCompact authority="AUTH_4_COMMIT" />
 * <AuthorityBadgeCompact authority="AUTH_3_EXECUTE" size="xs" />
 * ```
 */
export const AuthorityBadgeCompact: React.FC<AuthorityBadgeCompactProps> = ({
  authority,
  isRequired = false,
  size = 'sm',
  className = '',
  testId,
}) => {
  const level = levelFromAuthority[authority];

  return (
    <span
      className={`tf-authority-badge-compact tf-authority-badge-compact--level-${level} tf-authority-badge-compact--${size} ${isRequired ? 'tf-authority-badge-compact--required' : ''} ${className}`}
      data-testid={testId}
      data-authority={authority}
      data-authority-level={level}
      role="status"
      aria-label={`${isRequired ? 'Requires AUTH' : 'AUTH'} ${level}`}
      title={`${authority}${isRequired ? ' (required)' : ''}`}
    >
      <span className="tf-authority-badge-compact__level">{level}</span>
    </span>
  );
};

AuthorityBadgeCompact.displayName = 'AuthorityBadgeCompact';

export default AuthorityBadgeCompact;
