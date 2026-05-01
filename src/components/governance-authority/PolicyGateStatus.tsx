/**
 * @fileoverview PolicyGateStatus — Overall gate status indicator.
 *
 * Displays the aggregate policy status and the authority level
 * required to pass the gate or to override.
 */

import React from "react";
import { PolicyGateStatus as GateStatus, AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface PolicyGateStatusProps extends GovernanceComponentBaseProps {
  status: GateStatus;
  requiredAuthority: AuthorityLevel;
}

const statusLabelMap: Record<GateStatus, string> = {
  pass: "ALL RULES SATISFIED",
  fail: "CRITICAL RULES FAILED",
  warning: "RULES PASSED WITH WARNINGS",
  pending: "EVALUATION IN PROGRESS",
  blocked: "GATE IS BLOCKED",
};

const statusClassMap: Record<GateStatus, string> = {
  pass: "tf-policy-gate-status--pass",
  fail: "tf-policy-gate-status--fail",
  warning: "tf-policy-gate-status--warn",
  pending: "tf-policy-gate-status--pending",
  blocked: "tf-policy-gate-status--blocked",
};

/**
 * PolicyGateStatus shows the aggregate gate status and authority requirement.
 */
const PolicyGateStatus: React.FC<PolicyGateStatusProps> = ({
  status,
  requiredAuthority,
  className = "",
  "data-testid": dataTestId = "policy-gate-status",
}) => (
  <div
    className={`tf-policy-gate-status ${statusClassMap[status]} ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-policy-gate-status__badge">
      {statusLabelMap[status]}
    </span>
    <span className="tf-policy-gate-status__authority">
      AUTH {requiredAuthority} · {AUTHORITY_LEVELS[requiredAuthority]}
    </span>
  </div>
);

PolicyGateStatus.displayName = "PolicyGateStatus";

export default PolicyGateStatus;
