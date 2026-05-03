/**
 * ============================================================
 * AuthorityEscalator — Torafirma Design System
 * ============================================================
 *
 * Shows the authority escalation path from current to required
 * level. Highlights each level with color to indicate which
 * levels have been attained and which are needed.
 *
 * From 03.2 State, Status & Telemetry — Section 8 Authority Semantics
 * ============================================================
 */

import React from 'react';
import type { AuthorityLevel } from '../../types';

/**
 * Props for the AuthorityEscalator component.
 */
export interface AuthorityEscalatorProps {
  /** Actor's current authority level. */
  currentAuthority: AuthorityLevel;
  /** Authority level required for the target action. */
  requiredAuthority: AuthorityLevel;
  /** Whether to show labels for each level. */
  showLabels?: boolean;
  /** Whether the escalation can be initiated from here. */
  canEscalate?: boolean;
  /** Handler invoked when escalation is requested. */
  onEscalate?: () => void;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const allLevels: AuthorityLevel[] = [
  'AUTH_0_OBSERVE',
  'AUTH_1_DRAFT',
  'AUTH_2_STAGE',
  'AUTH_3_EXECUTE',
  'AUTH_4_COMMIT',
  'AUTH_5_OVERRIDE',
  'AUTH_6_ROOT',
];

const levelNames: Record<AuthorityLevel, string> = {
  AUTH_0_OBSERVE: 'Observe',
  AUTH_1_DRAFT: 'Draft',
  AUTH_2_STAGE: 'Stage',
  AUTH_3_EXECUTE: 'Execute',
  AUTH_4_COMMIT: 'Commit',
  AUTH_5_OVERRIDE: 'Override',
  AUTH_6_ROOT: 'Root',
};

/**
 * AuthorityEscalator visualizes the path from current to required authority.
 *
 * @example
 * ```tsx
 * <AuthorityEscalator
 *   currentAuthority="AUTH_2_STAGE"
 *   requiredAuthority="AUTH_4_COMMIT"
 *   onEscalate={() => requestElevation()}
 * />
 * ```
 */
export const AuthorityEscalator: React.FC<AuthorityEscalatorProps> = ({
  currentAuthority,
  requiredAuthority,
  showLabels = true,
  canEscalate = false,
  onEscalate,
  className = '',
  testId,
}) => {
  const currentIndex = allLevels.indexOf(currentAuthority);
  const requiredIndex = allLevels.indexOf(requiredAuthority);
  const needsEscalation = currentIndex < requiredIndex;

  return (
    <div
      className={`tf-authority-escalator ${needsEscalation ? 'tf-authority-escalator--needs-escalation' : ''} ${className}`}
      data-testid={testId}
      role="region"
      aria-label={`Authority: ${levelNames[currentAuthority]} to ${levelNames[requiredAuthority]}`}
    >
      <div className="tf-authority-escalator__track">
        {allLevels.map((level, index) => {
          const isAttained = index <= currentIndex;
          const isRequired = index === requiredIndex;
          const isFuture = index > requiredIndex;

          return (
            <div
              key={level}
              className={`tf-authority-escalator__step
                ${isAttained ? 'tf-authority-escalator__step--attained' : ''}
                ${isRequired ? 'tf-authority-escalator__step--required' : ''}
                ${isFuture ? 'tf-authority-escalator__step--future' : ''}
              `}
              data-level={index}
            >
              <span className="tf-authority-escalator__dot" aria-hidden="true" />
              {showLabels && (
                <span className="tf-authority-escalator__label">{levelNames[level]}</span>
              )}
            </div>
          );
        })}
      </div>
      {needsEscalation && canEscalate && onEscalate && (
        <button
          className="tf-authority-escalator__action"
          onClick={onEscalate}
          type="button"
          aria-label={`Escalate authority to ${levelNames[requiredAuthority]}`}
        >
          Escalate to AUTH {requiredIndex} &middot; {levelNames[requiredAuthority]}
        </button>
      )}
    </div>
  );
};

AuthorityEscalator.displayName = 'AuthorityEscalator';

export default AuthorityEscalator;
