/**
 * @fileoverview LockOverrideControl — Override lock controls.
 *
 * Provides unlock and override action buttons for a locked object,
 * gated by the operator's current authority level.
 */

import React from "react";
import { AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface LockOverrideControlProps extends GovernanceComponentBaseProps {
  overrideAvailable: boolean;
  overrideAuthorityRequired: AuthorityLevel;
  currentAuthority: AuthorityLevel;
  onUnlock?: () => void;
  onOverride?: () => void;
}

/**
 * LockOverrideControl renders unlock/override action buttons.
 */
const LockOverrideControl: React.FC<LockOverrideControlProps> = ({
  overrideAvailable,
  overrideAuthorityRequired,
  currentAuthority,
  onUnlock,
  onOverride,
  className = "",
  "data-testid": dataTestId = "lock-override-control",
}) => (
  <div
    className={`tf-lock-override-control ${className}`.trim()}
    data-testid={dataTestId}
  >
    <button
      type="button"
      className="tf-btn tf-btn--unlock"
      onClick={onUnlock}
      data-testid="lock-unlock-btn"
    >
      REQUEST UNLOCK
    </button>
    {overrideAvailable && currentAuthority >= overrideAuthorityRequired ? (
      <button
        type="button"
        className="tf-btn tf-btn--override"
        onClick={onOverride}
        data-testid="lock-override-btn"
      >
        OVERRIDE LOCK · AUTH {overrideAuthorityRequired}
      </button>
    ) : (
      <span className="tf-lock-override-control__denied">
        OVERRIDE REQUIRES AUTH {overrideAuthorityRequired} ·{" "}
        {AUTHORITY_LEVELS[overrideAuthorityRequired]}
      </span>
    )}
  </div>
);

LockOverrideControl.displayName = "LockOverrideControl";

export default LockOverrideControl;
