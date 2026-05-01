import React, { useState } from 'react';
import { AuthorityLevel, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the ActionPermissionRequest component.
 * UI for requesting elevated permissions.
 */
export interface ActionPermissionRequestProps extends TorafirmaComponentBaseProps {
  /** Required authority level */
  requiredAuthority: AuthorityLevel;
  /** Current authority level */
  currentAuthority?: AuthorityLevel;
  /** Reason for the request */
  reason?: string;
  /** Callback fired when permission is requested */
  onRequest: (reason: string) => void;
}

/**
 * ActionPermissionRequest — UI for requesting elevated permissions.
 *
 * Presents a form for requesting authority elevation. Requires
 * the operator to provide a justification reason before the
 * request is submitted. Shows the required and current
 * authority levels for comparison.
 *
 * @example
 * ```tsx
 * <ActionPermissionRequest
 *   requiredAuthority="AUTH 5 · OVERRIDE"
 *   currentAuthority="AUTH 3 · EXECUTE"
 *   onRequest={(reason) => console.log('Requested for reason:', reason)}
 * />
 * ```
 */
const ActionPermissionRequest: React.FC<ActionPermissionRequestProps> = ({
  requiredAuthority,
  currentAuthority,
  reason: initialReason = '',
  onRequest,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [reason, setReason] = useState(initialReason);

  return (
    <div
      className={`tf-action-permission-request ${className}`}
      data-testid={testId}
      {...rest}
    >
      <div className="tf-action-permission-request__header">
        <span className="tf-action-permission-request__title">Permission Required</span>
      </div>
      <div className="tf-action-permission-request__levels">
        <div className="tf-action-permission-request__level">
          <span className="tf-action-permission-request__level-label">Current</span>
          <span className="tf-action-permission-request__level-value">{currentAuthority || 'None'}</span>
        </div>
        <span className="tf-action-permission-request__arrow" aria-hidden="true">&#8594;</span>
        <div className="tf-action-permission-request__level tf-action-permission-request__level--required">
          <span className="tf-action-permission-request__level-label">Required</span>
          <span className="tf-action-permission-request__level-value">{requiredAuthority}</span>
        </div>
      </div>
      <div className="tf-action-permission-request__form">
        <label htmlFor="permission-reason" className="tf-action-permission-request__label">
          Justification (required)
        </label>
        <textarea
          id="permission-reason"
          className="tf-action-permission-request__reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Explain why elevated permission is needed..."
          rows={3}
        />
        <button
          type="button"
          className="tf-action-permission-request__submit"
          onClick={() => onRequest(reason)}
          disabled={!reason.trim()}
        >
          Request Permission
        </button>
      </div>
    </div>
  );
};

export default ActionPermissionRequest;
