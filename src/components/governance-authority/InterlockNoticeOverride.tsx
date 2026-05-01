/**
 * @fileoverview InterlockNoticeOverride — Override request action.
 *
 * Displays the override button if the current authority level meets
 * the override requirement, or shows an insufficient-authority message.
 */

import React from "react";
import { AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface InterlockNoticeOverrideProps extends GovernanceComponentBaseProps {
  canOverride: boolean;
  overrideAuthorityRequired: AuthorityLevel;
  currentAuthority: AuthorityLevel;
  onOverride?: () => void;
  onDismiss?: () => void;
}

/**
 * InterlockNoticeOverride renders the override control for an interlock.
 */
const InterlockNoticeOverride: React.FC<InterlockNoticeOverrideProps> = ({
  canOverride,
  overrideAuthorityRequired,
  currentAuthority,
  onOverride,
  onDismiss,
  className = "",
  "data-testid": dataTestId = "interlock-notice-override",
}) => (
  <div
    className={`tf-interlock-notice-override ${className}`.trim()}
    data-testid={dataTestId}
  >
    {canOverride && currentAuthority >= overrideAuthorityRequired ? (
      <button
        className="tf-btn tf-btn--override"
        onClick={onOverride}
        data-testid="interlock-override-btn"
        type="button"
      >
        REQUEST OVERRIDE · AUTH {overrideAuthorityRequired} ·{" "}
        {AUTHORITY_LEVELS[overrideAuthorityRequired]}
      </button>
    ) : (
      <span className="tf-interlock-notice-override__denied">
        OVERRIDE REQUIRES AUTH {overrideAuthorityRequired} ·{" "}
        {AUTHORITY_LEVELS[overrideAuthorityRequired]}
        {" "}· CURRENT: AUTH {currentAuthority} · {AUTHORITY_LEVELS[currentAuthority]}
      </span>
    )}
    <button
      className="tf-btn tf-btn--dismiss"
      onClick={onDismiss}
      data-testid="interlock-dismiss-btn"
      type="button"
    >
      DISMISS
    </button>
  </div>
);

InterlockNoticeOverride.displayName = "InterlockNoticeOverride";

export default InterlockNoticeOverride;
