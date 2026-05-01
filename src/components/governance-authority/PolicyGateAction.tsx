/**
 * @fileoverview PolicyGateAction — Action buttons for the policy gate.
 *
 * Provides Proceed, Request Override, and Cancel actions.
 * Override is shown only when the user holds sufficient authority.
 */

import React from "react";
import { AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface PolicyGateActionProps extends GovernanceComponentBaseProps {
  canProceed: boolean;
  canOverride: boolean;
  overrideRequires: AuthorityLevel;
  currentAuthority: AuthorityLevel;
  loading?: boolean;
  onProceed?: () => void;
  onOverride?: () => void;
  onCancel?: () => void;
}

/**
 * PolicyGateAction renders the action controls for a policy gate.
 */
const PolicyGateAction: React.FC<PolicyGateActionProps> = ({
  canProceed,
  canOverride,
  overrideRequires,
  currentAuthority,
  loading = false,
  onProceed,
  onOverride,
  onCancel,
  className = "",
  "data-testid": dataTestId = "policy-gate-action",
}) => (
  <div
    className={`tf-policy-gate-action ${className}`.trim()}
    data-testid={dataTestId}
  >
    <button
      className="tf-btn tf-btn--proceed"
      disabled={!canProceed || loading}
      onClick={onProceed}
      data-testid="policy-gate-proceed"
      type="button"
    >
      {loading ? "PROCESSING…" : "PROCEED"}
    </button>

    {canOverride && (
      <button
        className="tf-btn tf-btn--override"
        onClick={onOverride}
        data-testid="policy-gate-override"
        type="button"
      >
        REQUEST OVERRIDE · AUTH {overrideRequires}
      </button>
    )}

    {!canOverride && overrideRequires > currentAuthority && (
      <span className="tf-policy-gate-action__insufficient">
        OVERRIDE REQUIRES AUTH {overrideRequires} · {AUTHORITY_LEVELS[overrideRequires]}
      </span>
    )}

    <button
      className="tf-btn tf-btn--cancel"
      onClick={onCancel}
      data-testid="policy-gate-cancel"
      type="button"
    >
      CANCEL
    </button>
  </div>
);

PolicyGateAction.displayName = "PolicyGateAction";

export default PolicyGateAction;
