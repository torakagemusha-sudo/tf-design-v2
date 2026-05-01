/**
 * @fileoverview LockReasonDisplay — Shows why something is locked.
 *
 * Lists each reason contributing to the lock, with actor, time,
 * and whether the reason is still blocking.
 */

import React from "react";
import { LockReason } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface LockReasonDisplayProps extends GovernanceComponentBaseProps {
  reasons: LockReason[];
}

/**
 * LockReasonDisplay renders the list of lock reasons.
 */
const LockReasonDisplay: React.FC<LockReasonDisplayProps> = ({
  reasons,
  className = "",
  "data-testid": dataTestId = "lock-reason-display",
}) => (
  <div
    className={`tf-lock-reason-display ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-lock-reason-display__label">LOCK REASONS</span>
    <ul className="tf-lock-reasons">
      {reasons.map((reason, i) => (
        <li key={`${reason.code}-${i}`} className="tf-lock-reason">
          <span className="tf-lock-reason__code">{reason.code}</span>
          <span className="tf-lock-reason__message">{reason.message}</span>
          {reason.lockedBy && (
            <span className="tf-lock-reason__actor">by {reason.lockedBy}</span>
          )}
          {reason.lockedAt && (
            <span className="tf-lock-reason__time">{reason.lockedAt}</span>
          )}
          {reason.expiresAt && (
            <span className="tf-lock-reason__expiry">
              expires {reason.expiresAt}
            </span>
          )}
          {!reason.canUnlock && (
            <span className="tf-lock-reason__no-unlock">CANNOT UNLOCK</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

LockReasonDisplay.displayName = "LockReasonDisplay";

export default LockReasonDisplay;
