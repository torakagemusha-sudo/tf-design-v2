/**
 * @fileoverview LockIndicator — Shows lock state.
 *
 * Compact indicator showing whether an object is locked, why, and
 * whether the user can unlock or override the lock.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import { LockData, AuthorityLevel } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import LockStatusPanel from "./LockStatusPanel";
import LockReasonDisplay from "./LockReasonDisplay";
import LockOverrideControl from "./LockOverrideControl";

export interface LockIndicatorProps extends GovernanceComponentBaseProps {
  lock: LockData;
  currentAuthority: AuthorityLevel;
  onUnlock?: () => void;
  onOverride?: () => void;
}

const stateLabelMap: Record<string, string> = {
  unlocked: "UNLOCKED",
  locked: "LOCKED",
  override: "OVERRIDDEN",
  expired: "EXPIRED",
  pending: "PENDING LOCK",
};

const stateClassMap: Record<string, string> = {
  unlocked: "tf-lock-indicator--unlocked",
  locked: "tf-lock-indicator--locked",
  override: "tf-lock-indicator--override",
  expired: "tf-lock-indicator--expired",
  pending: "tf-lock-indicator--pending",
};

/**
 * LockIndicator renders the current lock state with details and controls.
 */
const LockIndicator: React.FC<LockIndicatorProps> = ({
  lock,
  currentAuthority,
  onUnlock,
  onOverride,
  className = "",
  "data-testid": dataTestId = "lock-indicator",
}) => (
  <div
    className={`tf-lock-indicator ${stateClassMap[lock.state]} ${className}`.trim()}
    data-testid={dataTestId}
  >
    <LockStatusPanel state={lock.state} target={lock.target} />
    <span className="tf-lock-indicator__label">
      {stateLabelMap[lock.state]}
    </span>
    {lock.state === "locked" && (
      <>
        <LockReasonDisplay reasons={lock.reasons} />
        <LockOverrideControl
          overrideAvailable={lock.overrideAvailable}
          overrideAuthorityRequired={lock.overrideAuthorityRequired}
          currentAuthority={currentAuthority}
          onUnlock={onUnlock}
          onOverride={onOverride}
        />
      </>
    )}
  </div>
);

LockIndicator.displayName = "LockIndicator";

export default LockIndicator;
