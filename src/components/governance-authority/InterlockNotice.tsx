/**
 * @fileoverview InterlockNotice — Displayed when interlock prevents action.
 *
 * Shows the blocked operation, the target, and all blocking reasons.
 * Provides an override path if the operator holds adequate authority.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import { InterlockNoticeData, AuthorityLevel } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import InterlockNoticeDetails from "./InterlockNoticeDetails";
import InterlockNoticeOverride from "./InterlockNoticeOverride";

export interface InterlockNoticeProps extends GovernanceComponentBaseProps {
  notice: InterlockNoticeData;
  currentAuthority: AuthorityLevel;
  onOverride?: () => void;
  onDismiss?: () => void;
}

/**
 * InterlockNotice displays a full interlock block notification.
 *
 * Renders the blocked operation, detailed reasons, and an
 * override action if authority permits.
 */
const InterlockNotice: React.FC<InterlockNoticeProps> = ({
  notice,
  currentAuthority,
  onOverride,
  onDismiss,
  className = "",
  "data-testid": dataTestId = "interlock-notice",
}) => (
  <div
    className={`tf-interlock-notice ${className}`.trim()}
    data-testid={dataTestId}
    role="alert"
    aria-live="assertive"
  >
    <div className="tf-interlock-notice__banner">
      <span className="tf-interlock-notice__icon">⊘</span>
      <span className="tf-interlock-notice__title">ACTION BLOCKED BY INTERLOCK</span>
    </div>
    <div className="tf-interlock-notice__operation">
      <span className="tf-interlock-notice__label">OPERATION</span>
      <span className="tf-interlock-notice__value">{notice.operation}</span>
      <span className="tf-interlock-notice__label">TARGET</span>
      <span className="tf-interlock-notice__value">{notice.target}</span>
    </div>
    <InterlockNoticeDetails reasons={notice.reasons} />
    <InterlockNoticeOverride
      canOverride={notice.canOverride}
      overrideAuthorityRequired={notice.overrideAuthorityRequired}
      currentAuthority={currentAuthority}
      onOverride={onOverride}
      onDismiss={onDismiss}
    />
  </div>
);

InterlockNotice.displayName = "InterlockNotice";

export default InterlockNotice;
