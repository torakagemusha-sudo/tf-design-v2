import React from 'react';
import { AuthorityLevel, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandAccessControl component.
 * Wraps any command with authority gating.
 */
export interface CommandAccessControlProps extends TorafirmaComponentBaseProps {
  /** Required authority level to access the wrapped command */
  requiredAuthority: AuthorityLevel;
  /** The current user's authority level */
  currentAuthority?: AuthorityLevel;
  /** Children to render when authorized */
  children: React.ReactNode;
  /** Optional fallback content when unauthorized */
  fallback?: React.ReactNode;
}

/**
 * CommandAccessControl — wraps any command with authority gating.
 *
 * Conditionally renders children based on the current authority
 * level relative to the required authority. Displays a fallback
 * when the operator lacks sufficient authority, preserving the
 * layout without exposing gated functionality.
 *
 * @example
 * ```tsx
 * <CommandAccessControl requiredAuthority="AUTH 4" currentAuthority="AUTH 3">
 *   <button>Commit changes</button>
 * </CommandAccessControl>
 * ```
 */
const CommandAccessControl: React.FC<CommandAccessControlProps> = ({
  requiredAuthority,
  currentAuthority,
  children,
  fallback,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const authorized =
    currentAuthority !== undefined &&
    parseInt(currentAuthority.replace(/\D/g, '')) >= parseInt(requiredAuthority.replace(/\D/g, ''));

  if (!authorized) {
    return (
      <div
        className={`tf-command-access-control tf-command-access-control--denied ${className}`}
        data-required={requiredAuthority}
        data-current={currentAuthority}
        data-testid={testId}
        {...rest}
      >
        {fallback || (
          <div className="tf-command-access-control__denied">
            <span className="tf-command-access-control__lock" aria-hidden="true">&#128274;</span>
            <span className="tf-command-access-control__message">
              Requires {requiredAuthority}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`tf-command-access-control tf-command-access-control--granted ${className}`}
      data-testid={testId}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CommandAccessControl;
